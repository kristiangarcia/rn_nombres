import axios from "axios"
import { Probabilidad } from "../model/Tipos"

async function consultarProbabilidades(nombre:string):Promise<Array<Probabilidad>>{
    const endpoint = `https://api.nationalize.io/?name=${nombre}`
    const respuestaServidor = await axios.get(endpoint)
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