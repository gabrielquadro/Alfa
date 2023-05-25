//rotas logado

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../pages/DrawerContent';
import FuncionariosList from '../pages/FuncionariosList'
import AddFuncionario from '../pages/AddFuncionario';
import Cidades from '../pages/Cidades';
import AddCidades from '../pages/AddCidades';


const DrawerMenu = createDrawerNavigator();
const StackHome = createNativeStackNavigator();

function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

function AppRoutes() {
    return (
        <StackHome.Navigator
            screenOptions={{
                initialRouteName: 'Drawer',
            }}
        >

            <StackHome.Screen name="Drawer" component={MenuRoutes} options={{ headerShown: false }} />
            <StackHome.Screen name="Perfil" component={Profile} options={{ headerShown: true }} />
            <StackHome.Screen name="AddFuncionario" component={AddFuncionario} options={{ headerShown: true }} />
            <StackHome.Screen name="AddCidades" component={AddCidades} options={{ headerShown: true }} />
        </StackHome.Navigator>
    )
}

function MenuRoutes() {
    return (
        <DrawerMenu.Navigator backgroundColor='#8B572A' labelStyle={{ color: "black" }} drawerContent={props => <DrawerContent {...props} />}>
            <DrawerMenu.Screen name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="home" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }} />

            <DrawerMenu.Screen
                name="Empresas"
                headerShown='false'
                component={Profile}
                options={{
                    drawerIcon: ({ color }) => (
                        <Feather name="user" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />

            <DrawerMenu.Screen
                name="Funcionarios"
                headerShown='false'
                component={FuncionariosList}
                options={{
                    drawerIcon: ({ color }) => (
                        <Feather name="user" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />

            <DrawerMenu.Screen
                name="Cidades"
                headerShown='false'
                component={Cidades}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="city" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />
            <DrawerMenu.Screen
                name="Marca veiculos"
                headerShown='false'
                component={Profile}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="car-side" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />
            <DrawerMenu.Screen
                name="Modelo veiculos"
                headerShown='false'
                component={Profile}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="car-side" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />
            <DrawerMenu.Screen
                name="Veiculos"
                headerShown='false'
                component={Profile}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="car-side" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />
            <DrawerMenu.Screen
                name="Requisicao veiculo"
                headerShown='false'
                component={Profile}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="car-side" size={22} color={color} />
                    ),
                    drawerLabelStyle: { marginLeft: -10 },
                    unmountOnBlur: true,
                    headerShown: true,
                }}
            />
        </DrawerMenu.Navigator>
    )
}

export default AppRoutes;