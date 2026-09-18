import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaChamados from './src/screens/ListaChamados';
import NovoChamado from './src/screens/NovoChamado';
import NovoCliente from './src/screens/NovoCliente';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ListaChamados">
                <Stack.Screen
                    name="ListaChamados"
                    component={ListaChamados}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NovoChamado"
                    component={NovoChamado}
                    options={{
                        title: 'Cadastrar Equipamento',
                        headerStyle: { backgroundColor: '#333333' },
                        headerTintColor: '#F29924',
                        headerTitleStyle: { fontWeight: 'bold' }
                    }}
                />
                <Stack.Screen
                    name="NovoCliente"
                    component={NovoCliente}
                    options={{
                        title: 'Cadastrar Cliente',
                        headerStyle: { backgroundColor: '#333333' },
                        headerTintColor: '#F29924',
                        headerTitleStyle: { fontWeight: 'bold' }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}