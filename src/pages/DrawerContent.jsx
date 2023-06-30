import React, { useState, useEffect ,useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text} from 'react-native-paper';
import { AuthContext } from '../contexts/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons , Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { db } from '../config'
import { useNavigation } from "@react-navigation/native";

const DrawerContent = (props) => {
    // const [user, setUser] = useState([]);
    const [userP, setUserP] = useState([]);
    const { signOut , user} = useContext(AuthContext);
    const appVersion = Constants.manifest.version; 
    const navigation = useNavigation();

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
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#0000FFaa' }}>
                <TouchableOpacity onPress={() => navigation.navigate("Perfil")} style={{ padding: 18 , flexDirection:'row' , justifyContent:'space-between'}}>
                    <Text style={{ color: '#fff', marginBottom: 10 , fontSize: 16}}>{userP.nome}</Text>
                    <Entypo name="edit" size={22} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                    <DrawerItemList {...props}>
                    </DrawerItemList>
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <Text style={{color: '#5c5c5c'}}>Versão {appVersion}</Text>
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={signOut}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name="logout" size={22} color='#5c5c5c' />
                        <Text style={{ fontSize: 15, marginLeft: 5, color: '#5c5c5c' }}>Sair</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrawerContent;