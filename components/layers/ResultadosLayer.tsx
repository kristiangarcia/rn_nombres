import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemPaisProbabilidad from '../ItemPaisProbabilidad'
import { Probabilidad } from '../../model/Tipos'

type ListaProbabilidadesProps = {
    listaProbabilidades: Array<Probabilidad>
}
export default function ResultadosLayer({listaProbabilidades}:ListaProbabilidadesProps) {
    return (
        <FlatList
        data={listaProbabilidades}
        renderItem={ItemPaisProbabilidad}
        keyExtractor={item => item.country_id}
        ListEmptyComponent={
            () => <Text style={{margin:"auto"}}>No se han encontrado resultados</Text>
            }
        />
    )
}

const styles = StyleSheet.create({})