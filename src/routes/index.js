import React, {useContext , useState} from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import TrabRoutes from './trabalhador.routes';
import { AuthContext } from '../contexts/auth';
import { db } from '../config'

function Routes() {
    //controla s eta logado
    const { signed , loading, user} = useContext(AuthContext);
    const [userProf, setUserProf] = useState([]);
    async function getUser() {
        const userprofile = db.collection('users').doc(user?.uid).get()
            .then((value) => {
                setUserProf(value.data());
            })
    }
    getUser();


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#36393F' }}>
                <ActivityIndicator size={50} color="#E52246" />
            </View>
        )
    }

    return (
        signed ? userProf?.tipo == 'Administrador' ? <AppRoutes /> : <TrabRoutes /> : <AuthRoutes />
    )
}

export default Routes;