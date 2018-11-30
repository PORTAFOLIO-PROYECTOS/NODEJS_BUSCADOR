const config = require("../../config");
const utils = require("../common/utils");

class filtroOfertaDelDia {
    constructor(parametros) {
        this.parametros = parametros;
    }

    /**
     * En caso que la condición cumpla retornará un array sin el dato ODD
     * @param {array} personalizacion - Personalizaciones que tiene la consultora
     * @param {json} filtro - return de array con las condiciones de ODD
     */
    filtrar(personalizaciones, filtro) {
        if (!config.flags.logicaODD) return personalizaciones;
        let consultoraX = config.constantes.consultoraX,
            consultoraY = config.constantes.consultoraY,
            consultora0 = config.constantes.consultora0,
            isDummy = utils.isDummy(this.parametros.personalizaciones, "ODD"),
            must = [
                { term: { "tipoPersonalizacion": "ODD" } },
                { term: { "diaInicio": this.parametros.diaFacturacion } }
            ];

        if (isDummy) {
            must.push({ terms: { "codigoConsultora": [consultoraX, consultoraY] } });
        } else {
            must.push({ terms: { "codigoConsultora": [this.parametros.codigoConsultora, consultoraY, consultora0] } });
        }

        filtro.push(
            {
                bool: {
                    must
                }
            }
        );

        return personalizaciones.filter(per => per !== "ODD");
    }
}

// var filtroOfertaDelDia = (function () {

//     /**
//      * En caso que la condición cumpla retornará un array sin el dato ODD
//      * @param {array} parametros - Parametros que recibe la aplicación
//      * @param {array} personalizacion - Personalizaciones que tiene la consultora
//      * @param {json} filtro - return de array con las condiciones de ODD
//      */
//     function filtrar(parametros, personalizacion, filtro) {

//         if (!config.flags.logicaODD) return personalizacion;

//         let consultoraX = config.constantes.consultoraX,
//             consultoraY = config.constantes.consultoraY,
//             consultora0 = config.constantes.consultora0,
//             isDummy = utils.isDummy(parametros.personalizaciones, "ODD"),
//             must = [
//                 { term: { "tipoPersonalizacion": "ODD" } },
//                 { term: { "diaInicio": parametros.diaFacturacion } }
//             ];

//         if (isDummy) {
//             must.push({ terms: { "codigoConsultora": [consultoraX, consultoraY] } });
//         } else {
//             must.push({ terms: { "codigoConsultora": [parametros.codigoConsultora, consultoraY, consultora0] } });
//         }

//         filtro.push(
//             {
//                 bool: {
//                     must
//                 }
//             }
//         );

//         return personalizacion.filter(per => per !== "ODD");
//     }

//     return {
//         filtrar: filtrar
//     };

// })();

module.exports = filtroOfertaDelDia;