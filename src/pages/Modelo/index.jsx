import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth'
import { db } from '../../config'
import PostsList from '../../components/PostsList'



export default function Modelo() {
    // const navigation = useNavigation();
    // const { user } = useContext(AuthContext);
    // const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRefresh, setLoadingRefresh] = useState(false);
    // const [lastItem, setLastItem] = useState('');
    // const [emptyList, setEmptyList] = useState(false);
    const navigation = useNavigation();
    const { signOut, user } = useContext(AuthContext);
    const [modelos, setModelos] = useState([]);
    const [marcas, setMarcas] = useState([]);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            async function fetchData() {
                try {
                  const modelosSnapshot = await db.collection('modelos').get();
                  const modelosList = modelosSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                  }));
                  setModelos(modelosList);
          
                  const marcasSnapshot = await db.collection('marcas').get();
                  const marcasList = marcasSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                  }));
                  setMarcas(marcasList);
          
                  setLoading(false);
                } catch (error) {
                  console.error(error);
                }
              }
          
              fetchData();

        }, [])
    );


    return (
        <View style={styles.container}>


            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator SIZE={50} color="black"></ActivityIndicator>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("AddModelos", { item: null })}>
                        <Text style={styles.btnSairTxt}>Novo modelo</Text>
                    </TouchableOpacity>
                    <FlatList
                        style={styles.list}
                        data={modelos}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.listView} onPress={() => navigation.navigate('AddModelos', { item: item })}>
                                <Text>{item.nome}</Text>
                                <Text>{(marcas.find(marca => marca.id === item.marca)).nome}</Text>
                            </TouchableOpacity>
                        )}

                    >

                    </FlatList>
                </View>
            )}



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10
    },
    btn: {
        // marginTop: 16,
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
    listView: {
        flexDirection: 'row',
        // marginTop: 8,
        margin: 2,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 3,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    }

});