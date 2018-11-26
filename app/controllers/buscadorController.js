const parametrosEntrada = require("../models/buscador/parametrosEntrada"),    
    stockRepository = require("../repository/stockRepository"),
    config = require("../../config"),
    baseController = require("../controllers/baseController");

async function ejecutar(parametros) {
    
    let name = `${config.ambiente}_${config.name}_${parametros.codigoPais}_FiltrosDelBuscador`;
    let dataRedis = await baseController.obtenerDatosRedis(name, parametros.codigoPais);
    let dataElastic = await baseController.ejecutarElasticsearch(parametros, preciosRedis);
    let productos = [],
        SAPs = [],
        filtros = [],
        total = dataElastic.hits.total;

    productos = baseController.devuelveJSONProductos(dataElastic, parametros, SAPs);
    productos = baseController.validarStock(SAPs, parametros.codigoPais, parametros.diaFacturacion, productos);
    filtros = baseController.devuelveJSONFiltros(dataElastic, dataRedis);

    return {
        total: total,
        productos: productos,
        filtros: filtros
    }
}

function validarFiltro(val) {
    let array = [];
    if (val == null) return array;
    if (val.length > 0) {
        if (val.indexOf(null) >= 0) return array;
    }
    return val;
}

exports.busqueda = async function (req, res, next) {

    let parametros = new parametrosEntrada(
        req.params.codigoPais,
        req.params.codigocampania,
        req.body.codigoConsultora,
        req.body.codigoZona,
        req.body.textoBusqueda,
        req.body.paginacion.cantidad,
        req.body.configuracion.sociaEmpresaria,
        req.body.configuracion.suscripcionActiva,
        req.body.configuracion.mdo,
        req.body.configuracion.rd,
        req.body.configuracion.rdi,
        req.body.configuracion.rdr,
        req.body.configuracion.diaFacturacion,
        req.body.personalizaciones,
        req.body.paginacion.numeroPagina,
        req.body.orden.campo,
        req.body.orden.tipo,
        validarFiltro(req.body.filtro.categoria),
        validarFiltro(req.body.filtro.marca),
        validarFiltro(req.body.filtro.precio)
    );

    try {
        let d = await ejecutar(parametros);
        res.json(d);
        next();
    } catch (error) {
        console.log('Error en el POST: ', error);
        next(error);
    }
};