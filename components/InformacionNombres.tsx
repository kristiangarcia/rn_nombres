import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type InformacionNombresProps = {
    totalNombresOffline: number
}

export default function InformacionNombres({totalNombresOffline}:InformacionNombresProps) {
    return (
        <View>
        <Text>Nombres almacenados: {totalNombresOffline}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})