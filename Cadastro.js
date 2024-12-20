import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [idade, setIdade] = useState('');
    const [celular, setCelular] = useState('');
    const [cep, setCep] = useState('');
    const [sus, setSus] = useState('');
    const [senha, setSenha] = useState('');
    const [genero, setGenero] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleCadastro = () => {
        if (!nome || !email || !cpf || !idade || !celular || !cep || !sus || !senha || !genero) {
            showModal('Erro: Todos os campos devem ser preenchidos.');
            return;
        }

        const pacienteData = {
            nome,
            email,
            cpf,
            idade,
            celular,
            cep,
            sus,
            senha,
            genero
        };

        fetch('http://172.16.1.111:3001/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pacienteData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Paciente cadastrado com sucesso!') {
                showModal('Paciente cadastrado com sucesso!');
                setNome('');
                setEmail('');
                setCpf('');
                setIdade('');
                setCelular('');
                setCep('');
                setSus('');
                setSenha('');
                setGenero('');
            } else {
                showModal('Erro: Ocorreu um erro ao cadastrar o paciente.');
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar paciente:', error);
            showModal('Erro: Erro ao conectar com o servidor.');
        });
    };

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false); 
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro do Paciente</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
                maxLength={11}
            />

            <TextInput
                style={styles.input}
                placeholder="Idade"
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
                maxLength={3}
            />

            <TextInput
                style={styles.input}
                placeholder="Celular"
                value={celular}
                onChangeText={setCelular}
                keyboardType="phone-pad"
                maxLength={11}
            />

            <TextInput
                style={styles.input}
                placeholder="CEP"
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                maxLength={8}
            />

            <TextInput
                style={styles.input}
                placeholder="Cartão SUS"
                value={sus}
                onChangeText={setSus}
                keyboardType="numeric"
                maxLength={15}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
            />

            <Text style={styles.label}>Gênero</Text>
            <View style={styles.radioContainer}>
                <TouchableOpacity 
                    style={styles.radioButton} 
                    onPress={() => setGenero('Masculino')}
                >
                    <View style={genero === 'Masculino' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                    <Text style={styles.radioText}>Masculino</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.radioButton} 
                    onPress={() => setGenero('Feminino')}
                >
                    <View style={genero === 'Feminino' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
                    <Text style={styles.radioText}>Feminino</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
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
        backgroundColor: '#d3f2f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '75%',
        height: 40,
        bordercolor: 'gray',
        borderwidth: 1,
        borderRadius: 15,
        marginBottom: 15,
        backgroundColor: 'white',
        paddingHorizontal: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    radioButtonUnselected: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 10,
    },
    radioButtonSelected: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#f56f42',
        backgroundColor: '#f56f42',
        marginRight: 10,
    },
    radioText: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        width: '60%',
    },
    button: {
        backgroundColor: '#f56f42',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',  
    },
    buttonText: {
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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#333',
    },
});

export default Cadastro;
