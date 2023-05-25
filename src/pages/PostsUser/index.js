import React, { useLayoutEffect, useState, useCallback, useContext } from 'react';
import { View, ActivityIndicator , StyleSheet , FlatList} from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native'
import { db } from '../../config'
import PostsList from '../../components/PostsList'
import { AuthContext } from '../../contexts/auth'


export default function PostsUser() {
    const route = useRoute();
    const [title, setTitle] = useState(route.params?.user.nome);
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: title === '' ? '' : title
        })
    }, [navigation, title])

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            db.collection('posts')
                .where('user', '==', route.params?.userId)
                .orderBy('created', 'desc')
                .get()
                .then((snapshoot) => {
                    console.log(snapshoot.docs.map)
                    if (isActive) {
                        setPosts([]);
                        const postList = [];
                        snapshoot.docs.map(u => {
                            postList.push({
                                ...u.data(),
                                id: u.id,
                            })
                        })
                        setPosts(postList);
                        console.log(route.params?.userId)
                        console.log(posts)
                        setLoading(false);
                    }


                })
            return () => {
                isActive = false;
            }

        }, [])
    )
    return (
        <View style={styles.container}>
             {loading ? (
                <View style ={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator SIZE={50} color="#e52246"></ActivityIndicator>
                </View>
            ) : (
                <FlatList
                    style={styles.list}
                    data={posts}
                    renderItem={({ item }) => (
                        <PostsList
                            data={item}
                            userId={user.uid}
                        />
                    )}
                >

                </FlatList>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#36393F',
    },
   
    list: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    }

});