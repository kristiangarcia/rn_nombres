import axios from "axios"
import { Probabilidad } from "../model/Tipos"
import { consultarProbabilidadesOffline, existeNombre, guardarProbabilidad } from "./ConsultaAlmacenamientoInterno"

async function consultarProbabilidades(nombre:string,online:boolean,usarCache:boolean){
    let resultado = []
    if(online){
        if(usarCache){
            const existe = await existeNombre(nombre)
            if(existe){
                resultado = await consultarProbabilidadesOffline(nombre)
            }else{
                resultado = await consultarProbabilidadesApi(nombre)
            }
        }else{
            resultado = await consultarProbabilidadesApi(nombre)
        }
    }else{
        resultado = await consultarProbabilidadesOffline(nombre)
    }
    return resultado
}

async function consultarProbabilidadesApi(nombre:string):Promise<Array<Probabilidad>>{
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
    await guardarProbabilidad(nombre,resultado)
    return resultado
}
async function consultarNombrePais(codigo:string):Promise<string>{
    const endpoint = `https://restcountries.com/v3.1/alpha/${codigo}`
    const respuestaServidor = await axios.get(endpoint)
    return respuestaServidor.data[0].translations.spa.common
}
async function rellenarCampoPais(objeto:Probabilidad):Promise<Probabilidad>{
    objeto.pais = await consultarNombrePais(objeto.country_id)
    return objeto
}
export {consultarProbabilidades}