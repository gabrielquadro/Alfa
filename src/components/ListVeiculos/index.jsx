import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Fontisto, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db, app, firebase } from "../../config";
import { useNavigation, useFocusEffect } from "@react-navigation/native";



function ListVeiculos({ data }) {
  const navigation = useNavigation();
  const [marcas, setMarcas] = React.useState([]);
  const [modelos, setModelos] = React.useState([]);
  const [modeloNome, setModeloNome] = React.useState(''); // Estado para armazenar o nome do modelo
  const [marcaNome, setMarcaNome] = React.useState(''); // Estado para armazenar o nome do modelo

  useFocusEffect(
    useCallback(() => {
        console.log(data.modelo)
        async function fetchModelo() {
            try {
              const modeloDoc = await db.collection('modelos').doc(data.modelo).get();
              if (modeloDoc.exists) {
                const modeloData = modeloDoc.data();
                // Faça algo com os dados do modelo
                setModeloNome(modeloData.nome);
              } else {
                // O documento não existe
                console.log('O modelo não foi encontrado');
              }
            } catch (error) {
              console.error('Erro ao buscar o modelo:', error);
            }
          }
          fetchModelo();

          async function fetchMarca() {
            try {
              const modeloDoc = await db.collection('marcas').doc(data.marca).get();
              if (modeloDoc.exists) {
                const modeloData = modeloDoc.data();
                // Faça algo com os dados do modelo
                setMarcaNome(modeloData.nome);
              } else {
                // O documento não existe
                console.log('O modelo não foi encontrado');
              }
            } catch (error) {
              console.error('Erro ao buscar o modelo:', error);
            }
          }
          fetchMarca();
    }, [])
  );

 
  
  

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('AddVeiculo', { item: data, medico: false })}>
      <Text>{data.placa}</Text>
      <Text>{marcaNome}</Text>
      <Text>{modeloNome}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 3,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});

export default ListVeiculos;