import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { db } from '../../config'
import PostsList from '../../components/PostsList'
import { TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';


export default function AddCidades({ route }) {
    const { cidade } = route.params;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(cidade != null ? cidade.nome : "");
    const [selectedState, setSelectedState] = useState(cidade != null ? cidade.estado : "");
    const navigation = useNavigation();



    const handleStateChange = (value) => {
        setSelectedState(value);
    }

    const stateList = [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Tocantins', value: 'TO' }
    ];

    async function handleSave() {
        if (cidade != null) {
            setLoading(true)
            await db.collection('cidades').doc(cidade.id).set({
                created: new Date(),
                nome: name,
                estado: selectedState
            })
                .then(() => {
                    console.log('Adicionado cidade')
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false)
                    navigation.goBack();
                })
        } else {
            setLoading(true)
            await db.collection('cidades').add({
                created: new Date(),
                nome: name,
                estado: selectedState
            })
                .then(() => {
                    console.log('Adicionado cidade')
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false)
                    navigation.goBack();
                })
        }
    }


    return (
        <View style={styles.container}>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator SIZE={50} color="black"></ActivityIndicator>
                </View>
            ) : (
                <View>
                    <TextInput
                        //theme={theme}
                        label="Nome"
                        mode="flat"
                        //textColor="#000"
                        style={styles.imput}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <View style={styles.picker}>
                        <Picker
                            // style={{ color: 'white' }}
                            // dropdownIconColor={'white'}
                            selectedValue={selectedState}
                            onValueChange={handleStateChange}>
                            <Picker.Item label="Selecione um estado" value="" />
                            {stateList.map((state) => (
                                <Picker.Item
                                    key={state.value}
                                    label={state.label}
                                    value={state.value}
                                />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={handleSave}>
                        <Text style={styles.btnSairTxt}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 15
    },
    btn: {
        marginTop: 16,
        backgroundColor: '#428cfd',
        //width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40
    },
    btnSairTxt: {
        fontSize: 16,
        color: '#FFF'
    },
    imput: {
        marginTop: 12,
        borderColor: "#fff",
        borderWidth: 1,
    },
    picker: {
        borderWidth: 1,
        // borderColor: 'white',
        borderRadius: 2,
        marginTop: 12,
    },
});