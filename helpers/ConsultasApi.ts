import axios from "axios"
import { Probabilidad } from "../model/Tipos"

async function consultarProbabilidades(nombre:string):Promise<Array<Probabilidad>>{
    const endpoint = `https://api.nationalize.io/`
    const configuracion = {
                            params : {
                                name: nombre
                            },
                            headers: {
                                "User-Agent": "Nombres/1.0 (correo@dominio.com)",
                                "Accept": "application/json"
                            }
                        }
    const respuestaServidor = await axios.get(endpoint,configuracion)
    const resultado = respuestaServidor.data.country
    for(let objeto of resultado){
        objeto.pais = await consultarNombrePais(objeto.country_id)
    }
    return resultado
}
async function consultarNombrePais(codigo:string):Promise<string>{
    const endpoint = `https://restcountries.com/v3.1/alpha/${codigo}`
    const respuestaServidor = await axios.get(endpoint)
    return respuestaServidor.data[0].translations.spa.common
}
export {consultarProbabilidades}