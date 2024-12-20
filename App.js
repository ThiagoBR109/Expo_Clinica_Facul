import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Login_adm from './Login_adm';
import Cadastro from './Cadastro';
import Menu from './Menu';
import Exame from './Exame';
import Menu_adm from './Menu_adm';
import PacientesList from './PacientesList';
import PacienteDetails from './PacienteDetails'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E90FF', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Login_adm" component={Login_adm} options={{title: 'Login Administrador', headerStyle:{backgroundColor: '#f56f42'}}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerStyle:{backgroundColor: '#f56f42'}}}/>
        <Stack.Screen name="Exame" component={Exame} />
        <Stack.Screen name="Menu_adm" component={Menu_adm} options={{title: 'Menu', headerStyle:{backgroundColor: '#f56f42'}}}/>
        <Stack.Screen name="PacientesList" component={PacientesList} options={{title: 'Pacientes', headerStyle:{backgroundColor: '#f56f42'}}}/>
        <Stack.Screen name="PacienteDetails" component={PacienteDetails} options={{title: 'Pacientes', headerStyle:{backgroundColor: '#f56f42'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
