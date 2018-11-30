const config = require("../../config");

class filtroGuiaNegocioDigital {

    constructor(parametros) {
        this.parametros = parametros;
    }

    /**
     * En caso que la condición cumpla retornará un array sin el dato GND
     * @param {array} personalizacion - Personalizaciones que tiene la la consultoa
     */
    filtrar(personalizaciones) {
        if (!config.flags.logicaGN) return personalizaciones;
        if (this.parametros.sociaEmpresaria === "1" || this.parametros.sociaEmpresaria.toLowerCase() === "true") {
            return personalizaciones.filter(per => per !== "GND");
        }

        if ((this.parametros.sociaEmpresaria === "0" || this.parametros.sociaEmpresaria.toLowerCase() === "false") &&
            (this.parametros.suscripcionActiva === "1" || this.parametros.suscripcionActiva.toLowerCase() === "true")) {

            return personalizaciones.filter(per => per !== "GND");
        }

        return personalizaciones;
    }
}

// var filtroGuiaNegocioDigital = (function () {

//     /**
//      * En caso que la condición cumpla retornará un array sin el dato GND
//      * @param {array} parametros - Paramaetros que recibe la aplicación
//      * @param {array} personalizacion - Personalizaciones que tiene la la consultoa
//      */
//     function filtrar(parametros, personalizacion) {

//         if (!config.flags.logicaGN) return personalizacion;

//         if (parametros.sociaEmpresaria === "1" || parametros.sociaEmpresaria.toLowerCase() === "true") {
//             return personalizacion.filter(per => per !== "GND");
//         }

//         if ((parametros.sociaEmpresaria === "0" || parametros.sociaEmpresaria.toLowerCase() === "false") &&
//             (parametros.suscripcionActiva === "1" || parametros.suscripcionActiva.toLowerCase() === "true")) {

//             return personalizacion.filter(per => per !== "GND");
//         }

//         return personalizacion;
//     }

//     return {
//         filtrar: filtrar
//     };

// })();

module.exports = filtroGuiaNegocioDigital;