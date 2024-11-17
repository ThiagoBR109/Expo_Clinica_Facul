import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://172.16.1.104:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf: usuario, senha: senha }),
            });

            // Verifica se o servidor respondeu com status 200 antes de tentar parsear o JSON
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            const data = await response.json();

            if (data.message === 'Login bem-sucedido') {
                setModalMessage('Login Efetuado!');
                setModalVisible(true);
                await AsyncStorage.setItem('usuarioLogado', JSON.stringify(data.paciente));
                const storedUser = await AsyncStorage.getItem('usuarioLogado');
                console.log('Usuário armazenado:', storedUser);
                setTimeout(() => {
                    setModalVisible(false);
                    navigation.navigate('Exame');
                    setUsuario('');
                    setSenha('');
                }, 1000);
            } else {
                setModalMessage(data.message || 'Usuário ou senha inválidos!');
                setModalVisible(true);
                setTimeout(() => setModalVisible(false), 2000);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);

            // Exibe uma mensagem amigável no modal
            setModalMessage('Erro ao conectar ao servidor. Verifique sua conexão.');
            setModalVisible(true);
            setTimeout(() => setModalVisible(false), 2000);
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

            <Text style={styles.subtitle}>Resultado de Exames</Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        value={usuario}
                        onChangeText={setUsuario}
                        placeholder="Digite seu CPF"
                        keyboardType="numeric"
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                    </View>
                </View>
            </Modal>
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
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',  
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;
