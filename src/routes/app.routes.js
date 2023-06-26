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
import Empresas from '../pages/Empresas';
import AddEmpresa from '../pages/AddEmpresa';
import Marca from '../pages/Marca';
import AddMarca from '../pages/AddMarca';
import Modelo from '../pages/Modelo';
import AddModelo from '../pages/AdddModelo';
import Veiculos from '../pages/Veiculos';
import AddVeiculo from '../pages/AddVeiculo';
import SolicitacaoListAdm from '../pages/SolicitacaoListAdm'
import SolicitacaoAdm from '../pages/SolicitacaoAdm';

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
            <StackHome.Screen name="AddFuncionario" component={AddFuncionario} options={{ headerShown: true , headerTitle:'Novo funcionário' }} />
            <StackHome.Screen name="AddCidades" component={AddCidades} options={{ headerShown: true, headerTitle:'Nova cidade'}} />
            <StackHome.Screen name="AddEmpresa" component={AddEmpresa} options={{ headerShown: true , headerTitle:'Nova empresa'}} />
            <StackHome.Screen name="AddModelos" component={AddModelo} options={{ headerShown: true , headerTitle:'Novo modelo'}} />
            <StackHome.Screen name="AddMarca" component={AddMarca} options={{ headerShown: true , headerTitle:'Nova marca'}} />
            <StackHome.Screen name="AddVeiculo" component={AddVeiculo} options={{ headerShown: true , headerTitle:'Novo veículo'}} />
            <StackHome.Screen name="Solicitacao" component={SolicitacaoAdm} options={{ headerShown: true , headerTitle:'Solicitação'}} />
        </StackHome.Navigator>
    )
}

function MenuRoutes() {
    return (
        <DrawerMenu.Navigator backgroundColor='#8B572A' labelStyle={{ color: "black" }} drawerContent={props => <DrawerContent {...props} />}>
           <DrawerMenu.Screen
                name="Requisicao veiculo"
                headerShown='false'
                component={SolicitacaoListAdm}
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
                component={Marca}
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
                name="Modelos veiculos"
                headerShown='false'
                component={Modelo}
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
                component={Veiculos}
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