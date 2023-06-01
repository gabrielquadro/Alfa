import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { db } from '../../config'
import PostsList from '../../components/PostsList'
import { TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';


export default function AddModelo({ route }) {
    const { item } = route.params;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(item != null ? item.nome : "");
    const [marca, setMarca] = useState(item != null ? item.marca : "");
    const [marcas, setMarcas] = useState([]);

    const navigation = useNavigation();



    const handleChangeMarca = (value) => {
        setMarca(value);
    }



    async function handleSave() {
        if (item != null) {
            setLoading(true)
            await db.collection('modelos').doc(item.id).set({
                created: new Date(),
                nome: name,
                marca: marca
            })
                .then(() => {
                    console.log('Adicionado modelo')
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false)
                    navigation.goBack();
                })
        } else {
            setLoading(true)
            await db.collection('modelos').add({
                created: new Date(),
                nome: name,
                marca: marca
            })
                .then(() => {
                    console.log('Adicionado modelo')
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false)
                    navigation.goBack();
                })
        }
    }



    useFocusEffect(
        useCallback(() => {
            async function fetchPosts() {
                setLoading(true);
                db.collection('marcas')
                    .get()
                    .then((snapshoot) => {
                        setMarcas([]);
                        const list = [];
                        snapshoot.docs.map(u => {
                            list.push({
                                ...u.data(),
                                id: u.id,
                            })
                        })
                        setMarcas(list);
                        setLoading(false);

                    })
            }
            fetchPosts();
        }, [])
    )

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
                            selectedValue={marca}
                            onValueChange={handleChangeMarca}>
                            <Picker.Item label="Selecione a marca" value="" />
                            {marcas.map((state) => (
                                <Picker.Item
                                    key={state.id}
                                    label={state.nome}
                                    value={state.id}
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