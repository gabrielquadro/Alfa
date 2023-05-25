import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../../config'
import { useNavigation } from '@react-navigation/native'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'


function PostsList({ data, userId }) {
    const [likePost, setLikePost] = useState(data?.likes);
    const [nome, setNome] = useState('');
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    async function handleLike(id, likes) {
        //chave
        const docId = `${userId}_${id}`;

        //chegar se já foi pedido pelo usuário
        const doc = await db.collection('likes')
        .doc(docId).get();

        if(doc.exists){
            console.log('remover like')
            //já deu like, remove o like
            await db.collection('posts')
            .doc(id).update({
                likes: likes - 1
            })

            await db.collection('likes').doc(docId).delete()
            .then(()=> {
                setLikePost(likes - 1)
            })
            return
        }

        //precisa dar like no post
        await db.collection('likes').doc(docId).set({
            postId: id,
            userId: userId
        })

        await db.collection('posts').doc(id).update({
            likes: likes + 1
        })
        .then(()=> {
            setLikePost(likes + 1)
        })
        return

    }

    function formatDate() {
        const datePost = new Date(data.created.seconds * 1000);



        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }

    useEffect(() => {
        async function getUser() {
            //console.log(data.user);
            const userprofile = db.collection('users').doc(data.user).get()
                .then((value) => {
                    setNome(value.data().nome)
                    setUser(value.data());
                })
        }
        getUser();
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("PostsUser", { userId: data.user, user: user })} style={styles.header}>
                <Image
                    style={styles.img}
                    source={require('../../assets/avatar.png')}
                />
                <Text numberOfLines={1} style={styles.name}>{nome}</Text>
            </TouchableOpacity>

            <View style={styles.contentView}>
                <Text style={styles.content}>{data?.content}</Text>
            </View>

            <View style={styles.Actions}>
                <TouchableOpacity onPress={() => handleLike(data.id, likePost)} style={styles.btnLike}>
                    <Text style={styles.likes}>{likePost === 0 ? '' : likePost}</Text>
                    <MaterialCommunityIcons name={likePost === 0 ? "heart-plus" : "cards-heart"} size={20} color="#e52246" />
                </TouchableOpacity>
                <Text style={styles.time}>{formatDate()}</Text>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        margin: 8,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 3,
        padding: 10
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 10
    },
    name: {
        color: '#353840',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        color: '#353840',
    },
    Actions: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    btnLike: {
        marginTop: 5,
        width: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    likes: {
        color: '#e52246'
        , marginRight: 6
    },
    time: {
        color: '#121212'
    },
    contentView: {
        marginBottom: 10,
        marginTop: 5
    }
    

});

export default PostsList;