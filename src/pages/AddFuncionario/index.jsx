import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../config'
import { TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';




export default function AddFuncionario() {
    // const { marca } = route.params;
    const { signUpUser } = useContext(AuthContext);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    // const [name, setName] = useState(marca != null ? marca.nome : "");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('');

    const tipoList = [
        { label: 'Administrador', value: 'Administrador' },
        { label: 'Trabalhador', value: 'Trabalhador' }
    ];

    const handleTipo = (value) => {
        setTipo(value);
    }
    async function handleSave() {
        await signUpUser(email, senha, name, tipo)
        navigation.goBack();
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
                            selectedValue={tipo}
                            onValueChange={handleTipo}>
                            <Picker.Item label="Selecione o tipo de acesso" value="" />
                            {tipoList.map((state) => (
                                <Picker.Item
                                    key={state.value}
                                    label={state.label}
                                    value={state.value}
                                />
                            ))}
                        </Picker>
                    </View>


                    <TextInput
                        //theme={theme}
                        label="email"
                        mode="flat"
                        //textColor="#000"
                        style={styles.imput}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput
                        //theme={theme}
                        label="Senha"
                        mode="flat"
                        //textColor="#000"
                        style={styles.imput}
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                    />


                    <TouchableOpacity style={styles.btn} onPress={handleSave} >
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
        padding: 10
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