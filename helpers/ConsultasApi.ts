import axios from "axios"

async function consultarProbabilidades(nombre){
    const endpoint = `https://api.nationalize.io/?name=${nombre}`
    const respuestaServidor = await axios.get(endpoint)
    const resultado = respuestaServidor.data.country
    for(let objeto of resultado){
        objeto.pais = await consultarNombrePais(objeto.country_id)
    }
    return resultado
}
async function consultarNombrePais(codigo){
    const endpoint = `https://restcountries.com/v3.1/alpha/${codigo}`
    const respuestaServidor = await axios.get(endpoint)
    return respuestaServidor.data[0].translations.spa.common
}
export {consultarProbabilidades}