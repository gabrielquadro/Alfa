import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import { AntDesign , Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native-paper';


export default function Login() {
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [hidePass, setHidePass] = useState(true);

    const { signUp, signIn, loadingAuth } = useContext(AuthContext);

    async function handleSignIn() {
        if (!email || !senha) {
            Alert.alert("Informe todos os campos")
        }

        await signIn(email, senha)

    }

    async function handSignUp() {
        if (!name || !email || !senha) {
            Alert.alert("Informe todos os campos")
            return;
        }
        //cadastrar usuário
        await signUp(email, senha, name)
    }

    if (login) {
        return (
            <View style={styles.container}>
                <Ionicons name="car-sport" size={50} color="black" />
                <Text style={styles.title}>Alfa solicitações</Text>
                <TextInput style={styles.imput}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="email"
                    placeholderTextColor='#000' />
                <TextInput style={styles.imput}
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                    placeholder="senha"
                    secureTextEntry={hidePass}
                    placeholderTextColor='#000' 
                    right={<TextInput.Icon icon={({ color, size }) => (
                        <AntDesign name="eye" size={24} color="black" onPress={() => setHidePass(!hidePass)} />
                      )} />}
                    />

                <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#FFF" />
                    ) : (<Text style={styles.btnTxt}>Acessar</Text>)
                    }
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.signUpBtn}>
                    <Text onPress={() => setLogin(!login)} style={styles.signUpBtnTxt}>Cadastrar</Text>
                </TouchableOpacity> */}

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alfa solicitações</Text>
            <TextInput style={styles.imput}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="nome"
                placeholderTextColor='#000' />
            <TextInput style={styles.imput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="email"
                placeholderTextColor='#000' />
            <TextInput style={styles.imput}
                value={senha}
                onChangeText={(text) => setSenha(text)}
                placeholder="senha"
                placeholderTextColor='#000' />
            <TouchableOpacity onPress={handSignUp} style={styles.btn}>
                {loadingAuth ? (
                    <ActivityIndicator size={20} color="#FFF" />
                ) : (<Text style={styles.btnTxt}>Cadastrar</Text>)
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLogin(!login)} style={styles.signUpBtn}>
                <Text style={styles.signUpBtnTxt}>Já possuo uma conta</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0000FFaa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontSize: 45,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 20
    },
    imput: {
        width: '80%',
        backgroundColor: '#FFF',
        marginTop: 12,
        borderRadius: 8,
    },
    btn: {
        width: '80%',
        backgroundColor: 'black',
        borderRadius: 8,
        marginTop: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: '#FFF',
        fontSize: 15,
    },
    signUpBtn: {
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpBtnTxt: {
        color: '#FFF',
        fontSize: 15,
    }

});