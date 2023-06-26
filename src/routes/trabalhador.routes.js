//rotas logado

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../pages/DrawerContent';
import SolicitacaoListC from '../pages/SolicitacaoListC';
import SolicitacaoC from '../pages/SolicitacaoC';

const DrawerMenu = createDrawerNavigator();
const StackHome = createNativeStackNavigator();

function StackRoutes() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Solicitacao" component={SolicitacaoListC} options={{ headerShown: false }} />
            {/* <StackHome.Screen name="SolicitacaoC" component={SolicitacaoC} options={{ headerShown: true , headerTitle:'Nova solicitação'}} /> */}
        </Stack.Navigator>
    )
}

function TrabRoutes() {
    return (
        <StackHome.Navigator
            screenOptions={{
                initialRouteName: 'Drawer',
            }}
        >

            <StackHome.Screen name="Drawer" component={MenuRoutes} options={{ headerShown: false }} />
            <StackHome.Screen name="SolicitacaoC" component={SolicitacaoC} options={{ headerShown: true , headerTitle:'Nova solicitação'}} />

        </StackHome.Navigator>
    )
}

function MenuRoutes() {
    return (
        <DrawerMenu.Navigator backgroundColor='#8B572A' labelStyle={{ color: "black" }} drawerContent={props => <DrawerContent {...props} />}>
            <DrawerMenu.Screen name="Solicitacao"
                component={SolicitacaoListC}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="home" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }} />

         
        </DrawerMenu.Navigator>
    )
}

export default TrabRoutes;