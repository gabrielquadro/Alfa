import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth'
import { db } from '../../config'
import PostsList from '../../components/PostsList'



export default function Marca() {
    // const navigation = useNavigation();
    // const { user } = useContext(AuthContext);
    // const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRefresh, setLoadingRefresh] = useState(false);
    // const [lastItem, setLastItem] = useState('');
    // const [emptyList, setEmptyList] = useState(false);
    const navigation = useNavigation();
    const { signOut, user } = useContext(AuthContext);
    const [marcas, setMarcas] = useState([]);

    useFocusEffect(
        useCallback(() => {
            async function fetchPosts() {
                setLoading(true);
                await db.collection('marcas')
                    .get()
                    .then((snapshoot) => {
                        setMarcas([]);
                        const formList = [];
                        snapshoot.docs.map(u => {
                            formList.push({
                                ...u.data(),
                                id: u.id,
                            })
                        })

                        setMarcas(formList);
                        setLoading(false);


                    })
            }
            fetchPosts();

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
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("AddMarca", { marca: null })}>
                        <Text style={styles.btnSairTxt}>Nova marca de veículo</Text>
                    </TouchableOpacity>
                    <FlatList
                        style={styles.list}
                        data={marcas}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.listView} onPress={() => navigation.navigate('AddMarca', { marca: item })}>
                                <Text>{item?.nome}</Text>
                            </TouchableOpacity>
                        )}

                    // refreshing={loadingRefresh}
                    // onRefresh={handlerefreshPosts}
                    // onEndReached={() => getListPosts()}
                    // onEndReachedThreshold={0.1}
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