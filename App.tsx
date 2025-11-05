import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { consultarProbabilidades } from './helpers/ConsultasApi'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItemPaisProbabilidad from './components/ItemPaisProbabilidad'
import { Probabilidad } from './model/Tipos'
import BienvenidaLayer from './components/layers/BienvenidaLayer'
import CargaLayer from './components/layers/CargaLayer'
import ResultadosLayer from './components/layers/ResultadosLayer'

export default function App() {
  const [nombre, setNombre] = useState("")
  const [listaProbabilidades, setListaProbabilidades] = useState<Array<Probabilidad>>([])
  const [capaActiva, setCapaActiva] = useState(1)
  function validarNombre():boolean{
    return nombre.trim() !== ""
  }
  function botonPulsado(){
    if(validarNombre()){
      setCapaActiva(2)
      consultarProbabilidades(nombre)
        .then( respuesta => {
          setListaProbabilidades(respuesta)
          setCapaActiva(3)
        })
        .catch( error => {
          Alert.alert("Error",error.toString())
          setCapaActiva(1)
        })
    }else{
      Alert.alert("Error","El nombre no puede dejarse vacío")
    }
  }
  function getCapaActiva():ReactNode{
    return capaActiva === 1 ? <BienvenidaLayer/> :
          capaActiva === 2 ? <CargaLayer/> :
          capaActiva === 3 ? <ResultadosLayer listaProbabilidades={listaProbabilidades}/> :
                            <View/>
  }
  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      <View style={styles.fila}>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          editable={capaActiva!==2}
          placeholder={"Introduce tu nombre"}
          style={styles.cuadroTexto}
          placeholderTextColor={"#9CA3AF"} />
        <Pressable
          onPress={botonPulsado}
          disabled={capaActiva===2}
          style={({ pressed }) => pressed ? styles.botonPresionado : styles.boton}>
          <Text style={styles.textoBoton}>Consultar</Text>
        </Pressable>
      </View>
      <View style={styles.contenedorCapas}>
        {
          getCapaActiva()
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: "#f3f4f6"
  },
  contenedorCapas: {
    flex: 1
  },
  fila: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    columnGap: 20,
    maxHeight: 200
  },
  cuadroTexto: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: "#d1D5DB",
    borderWidth: 1,
    fontSize: 16,
    color: "#111827"
  },
  boton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center"
  },
  botonPresionado: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#1E40AF",
    opacity: 0.85
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
})