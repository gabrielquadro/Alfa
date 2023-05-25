import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth'
import { db } from '../../config'
import PostsList from '../../components/PostsList'



export default function FuncionarioList() {
    // const navigation = useNavigation();
    // const { user } = useContext(AuthContext);
    // const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRefresh, setLoadingRefresh] = useState(false);
    // const [lastItem, setLastItem] = useState('');
    // const [emptyList, setEmptyList] = useState(false);
    const navigation = useNavigation();
    const { signOut, user } = useContext(AuthContext);
    const [funcionarios, setFuncionarios] = useState([]);

    // useFocusEffect(
    //     useCallback(() => {
    //         let isActive = true;

    //         async function fetchPosts() {
    //             db.collection('posts')
    //                 .orderBy('created', 'desc')
    //                 .limit(5)
    //                 .get()
    //                 .then((snapshoot) => {
    //                     if (isActive) {
    //                         setPosts([]);
    //                         const postList = [];
    //                         snapshoot.docs.map(u => {
    //                             postList.push({
    //                                 ...u.data(),
    //                                 id: u.id,
    //                             })
    //                         })

    //                         setPosts(postList);
    //                         setEmptyList(!!snapshoot.empty)
    //                         setLastItem(snapshoot.docs[snapshoot.docs.length - 1])
    //                         setLoading(false);
    //                     }
    //                 })
    //         }
    //         fetchPosts();
    //         return () => {
    //             isActive = false;
    //         }
    //     }, [])
    // )
    // //pega posts ao final da lista
    // async function getListPosts() {
    //     if (emptyList) {
    //         setLoading(false);
    //         return;
    //     }

    //     if (loading) return;

    //     db.collection('posts')
    //         .orderBy('created', 'desc')
    //         .limit(5)
    //         .startAfter(lastItem)
    //         .get()
    //         .then((snapshoot) => {
    //             const postList = [];
    //             snapshoot.docs.map(u => {
    //                 postList.push({
    //                     ...u.data(),
    //                     id: u.id,
    //                 })
    //             })

    //             setEmptyList(!!snapshoot.empty)
    //             setLastItem(snapshoot.docs[snapshoot.docs.length - 1])
    //             setPosts(oldPosts => [...oldPosts, ...postList]);
    //             setLoading(false);
    //         })

    // }

    // function handlerefreshPosts() {
    //     setLoadingRefresh(true);

    //     db.collection('posts')
    //         .orderBy('created', 'desc')
    //         .limit(5)
    //         .get()
    //         .then((snapshoot) => {

    //             setPosts([]);
    //             const postList = [];
    //             snapshoot.docs.map(u => {
    //                 postList.push({
    //                     ...u.data(),
    //                     id: u.id,
    //                 })
    //             })

    //             setPosts(postList);
    //             setEmptyList(false)
    //             setLastItem(snapshoot.docs[snapshoot.docs.length - 1])
    //             setLoading(false);

    //         })
    //     setLoadingRefresh(false)
    // }

    return (
        <View style={styles.container}>


            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator SIZE={50} color="#e52246"></ActivityIndicator>
                </View>
            ) : (
                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("AddFuncionario")}>
                        <Text style={styles.btnSairTxt}>Novo funcionário</Text>
                    </TouchableOpacity>
                    <FlatList
                        style={styles.list}
                        data={funcionarios}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <PostsList
                                data={item}
                                userId={user.uid}
                            />
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
    btnNew: {
        position: 'absolute', //por cima de tudo
        bottom: '5%',
        right: '6%',
        width: 60,
        height: 60,
        backgroundColor: '#202225',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99, //sobre toda interface
    },
    list: {
        flex: 1,
        backgroundColor: '#f1f1f1'
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
    btnSairTxt:{
        fontSize: 16,
        color: '#FFF'
    }

});