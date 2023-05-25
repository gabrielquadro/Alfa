import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { db } from '../../config'


export default function Profile() {

    const { signOut, user } = useContext(AuthContext);
    const [userP, setUserP] = useState([]);


    async function handleSignOut() {
        await signOut();
    }

    useEffect(() => {
        async function getUser() {
            const userprofile = db.collection('users').doc(user.uid).get()
                .then((value) => {
                    setUserP(value.data());
                })
        }
        getUser();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.nome} >{userP.nome}</Text>
            {/* <Text style={styles.email} >{user.email}</Text> */}
            <TouchableOpacity style={styles.btnAtt}>
                <Text style={styles.btnAttTxt}>Atualizar perfil</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353840',
        alignItems: 'center',
        justifyContent:'center'
    },
    nome: {
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    email: {
        color: '#f1f1f1',
        marginTop: 10,
        marginHorizontal: 20,
        fontSize: 28,
        fontSize: 18,
        fontStyle: 'italic'
    },
    btnAtt: {
        marginTop: 16,
        backgroundColor: '#428cfd',
        width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAttTxt: {
        fontSize: 18,
        color: '#FFF'
    },
    btnSair: {
        marginTop: 16,
        backgroundColor: '#ddd',
        width: '80%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnSairTxt: {
        fontSize: 18,
        color: '#353840'
    },
    img: {
        // width: 120,
        // height: 120,
        // borderRadius: 15,
        // marginTop: 20,
        width: 160,
        height: 160,
        borderRadius: 80
    },
    UploadButton: {
        marginTop: '20%',
        backgroundColor: '#fff',
        width: 165,
        height: 165,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 8,
        zIndex: 99

    },
    UploadButtonTxt: {
        fontSize: 55,
        position: 'absolute',
        zIndex: 99,
        bottom: '-10%',
        right: '-10%',
        color:'#FFF'

    }


});