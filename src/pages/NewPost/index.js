import React , {useState, useLayoutEffect, useContext}from 'react';
import { View, TextInput , StyleSheet, TouchableOpacity , Text} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../config'
import { AuthContext } from '../../contexts/auth'

export default function NewPost(){
    const [post,setPost] = useState("");
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    //interface montada só após isso
    useLayoutEffect(() => {
        const options = navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handlePost} style={styles.btnCompartilhar}>
                    <Text style={{color: '#FFF'}}>Compartilhar</Text>
                </TouchableOpacity>
            )
        })
    },[navigation, post])

    async function handlePost(){
        if(!post){
            alert("Digite algo");
            return;
        }

        // let avatarUrl = null;

        // try {
        //     let response = storage().ref('user').child(user?.uid)
        //     .getDownloadURL();
        //     avatarUrl = response;
        // } catch (error) {
        //     avatarUrl = null;
        // }
        //.add = autoid
        await db.collection('posts').add({
            created: new Date(),
            content: post,
            user: user.uid,
            likes: 0
        })
        .then(()=> {
            setPost('')
            console.log('Post criado')
        })
        .catch((error) => {
            console.log(error);
        })
        navigation.goBack();
    }


    return(
        <View style={styles.container} >
            <TextInput 
            style={styles.imput}
            placeholder='Digite aqui o seu post...'
            value={post}
            onChangeText={(text) => setPost(text)}
            multiline={true}
            placeholderTextColor='#DDD'
            maxLength={300}
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404349',
    },
    imput:{
        backgroundColor: 'transparent',
        margin: 10,
        color: '#FFF',
        fontSize: 20
    },
    btnCompartilhar: {
        marginRight: 7,
        padding: 7,
        backgroundColor:'#418cfd',
        borderRadius: 4,
        alignItems:'center',
        justifyContent:'center',
    }

});