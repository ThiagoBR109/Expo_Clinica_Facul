import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

const Login_adm = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        if (usuario === 'Thiago' && senha === '123') {
            alert("Login Efetuado!");
            navigation.navigate('Cadastro'); 
            setUsuario('');  
            setSenha('');  
        } else {
            alert('Usuário ou senha inválidos!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('./assets/Logo_Clinica.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.header}>Saúde Fácil</Text>
            </View>
        
            <Text style={styles.subtitle}>Área do Administrador</Text>
        
            <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Usuário do Administrador</Text>
                    <TextInput
                        style={styles.input}
                        value={usuario}
                        onChangeText={setUsuario}
                        placeholder="Digite seu usuário"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                        placeholder="Digite sua senha"
                    />
                </View>
            </View>
        
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
    
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#d3f2f0',
    },
    headerContainer: {
        position: 'absolute',
        top: 20,
        width: '100%',               
        flexDirection: 'row',       
        justifyContent: 'center',    
        alignItems: 'center',         
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',          
    },
    logo: {
        width: 130,                    
        height: 130,
        position: 'absolute',         
        left: 0,                     
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 80,                
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    inputGroup: {
        marginBottom: 15,
        width: '80%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 5,
    },
    input: {
        height: 45,
        paddingHorizontal: 10,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },
    buttonContainer: {
        marginTop: 20,
        width: '60%',
    },
});




export default Login_adm;
