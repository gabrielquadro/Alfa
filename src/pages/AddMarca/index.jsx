import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { db } from '../../config'
import PostsList from '../../components/PostsList'
import { TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';


export default function AddMarca({ route }) {
    const { marca } = route.params;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(marca != null ? marca.nome : "");
    const navigation = useNavigation();



    async function handleSave() {
        if (marca != null) {
            setLoading(true)
            await db.collection('marcas').doc(marca.id).set({
                created: new Date(),
                nome: name,
            })
                .then(() => {
                    console.log('Adicionado marca')
                })
                .catch((error) => {
                    console.log(error);
                }).finally(() => {
                    setLoading(false)
                    navigation.goBack();
                })
        } else {
            setLoading(true)
            await db.collection('marcas').add({
                created: new Date(),
                nome: name,
            })
                .then(() => {
                    console.log('Adicionado marca')
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
        backgroundColor: 'black',
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
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: 'transparent'
    },
    picker: {
        borderWidth: 1,
        // borderColor: 'white',
        borderRadius: 2,
        marginTop: 12,
    },
});