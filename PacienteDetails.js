import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PacienteDetails = ({ route, navigation }) => {
    const { paciente } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [pdfModalVisible, setPdfModalVisible] = useState(false);
    const [nome, setNome] = useState(paciente.paciente_nome);
    const [email, setEmail] = useState(paciente.paciente_email);
    const [cpf, setCpf] = useState(paciente.paciente_cpf);
    const [idade, setIdade] = useState(paciente.paciente_idade);
    const [celular, setCelular] = useState(paciente.paciente_celular);
    const [cep, setCep] = useState(paciente.paciente_cep);
    const [sus, setSus] = useState(paciente.paciente_sus);
    const [senha, setSenha] = useState(paciente.paciente_senha);
    const [genero, setGenero] = useState(paciente.paciente_genero);
    const [pdfLink, setPdfLink] = useState(paciente?.paciente_pdf || '');

    useEffect(() => {
        setNome(paciente.paciente_nome);
        setEmail(paciente.paciente_email);
        setCpf(paciente.paciente_cpf);
        setIdade(paciente.paciente_idade);
        setCelular(paciente.paciente_celular);
        setCep(paciente.paciente_cep);
        setSus(paciente.paciente_sus);
        setSenha(paciente.paciente_senha);
        setGenero(paciente.paciente_genero);
    }, [paciente]);

    const handleEnviarPDF = () => {
        setPdfModalVisible(true);
    };

    const handleSalvarPdfLink = () => {
        if (pdfLink.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira o link do PDF.');
            return;
        }
    
        // Configuração do fetch para enviar o link do PDF
        fetch(`http://172.16.1.105:3001/atualizarPDF`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paciente_id: paciente.paciente_id, // Enviando ID do paciente para identificar
                pdfLink: pdfLink,                 // Enviando o link do PDF
            }),
        })
        .then(response => {
            console.log('Resposta do servidor:', response);
            return response.json();
        })
        .then(data => {
            Alert.alert('Sucesso', 'Link do PDF atualizado com sucesso!');
            setPdfModalVisible(false); // Fecha o modal após salvar o link
        })
        .catch(error => {
            console.error('Erro ao atualizar link do PDF:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o link do PDF.');
        });
    };
    
    

    const handleEditarPaciente = () => {
        setModalVisible(true);
    };

    const handleSalvarEdicao = () => {
        editarPaciente(paciente.paciente_id, { nome, email, cpf, idade, celular, cep, sus, senha, genero });
        setModalVisible(false);
    };

    const editarPaciente = (id, dados) => {
        fetch(`http://172.16.1.105:3001/pacientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        })
        .then(response => response.json())
        .then(data => {
            Alert.alert('Sucesso', 'Paciente atualizado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao atualizar paciente:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o paciente.');
        });
    };

    const handleApagarPaciente = () => {
        Alert.alert(
            'Confirmar Exclusão',
            `Tem certeza que deseja apagar o paciente ${paciente.paciente_nome}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Apagar',
                    style: 'destructive',
                    onPress: () => apagarPaciente(paciente.paciente_id),
                },
            ]
        );
    };

    const apagarPaciente = (id) => {
        fetch(`http://172.16.1.104:3001/pacientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                Alert.alert('Sucesso', 'Paciente apagado com sucesso!');
            } else {
                throw new Error('Erro ao apagar paciente');
            }
        })
        .catch(error => {
            console.error('Erro ao apagar paciente:', error);
            Alert.alert('Erro', 'Não foi possível apagar o paciente.');
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Paciente</Text>
            <Text style={styles.label}>Nome: {nome}</Text>
            <Text style={styles.label}>Email: {email}</Text>

            <TouchableOpacity style={styles.button} onPress={handleEnviarPDF}>
                <Icon name="upload" size={20} color="#1E90FF" style={styles.icon} />
                <Text style={styles.buttonText}>Enviar PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleEditarPaciente}>
                <Icon name="edit" size={20} color="#1E90FF" style={styles.icon} />
                <Text style={styles.buttonText}>Editar Paciente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleApagarPaciente}>
                <Icon name="trash" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonTextDelete}>Apagar Paciente</Text>
            </TouchableOpacity>

            {/* Modal para edição */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Paciente</Text>
                        <Text>Nome</Text>
                        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
                        <Text>Email</Text>
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                        <Text>CPF</Text>
                        <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} />
                        <Text>Idade</Text>
                        <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} />
                        <Text>Celular</Text>
                        <TextInput style={styles.input} placeholder="Celular" value={celular} onChangeText={setCelular} />
                        <Text>CEP</Text>
                        <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep} />
                        <Text> Carteira SUS</Text>
                        <TextInput style={styles.input} placeholder="SUS" value={sus} onChangeText={setSus} />
                        <Text>Senha</Text>
                        <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} />
                        <Text>Gênero</Text>
                        <TextInput style={styles.input} placeholder="Gênero" value={genero} onChangeText={setGenero} />
                        <Button title="Salvar" onPress={handleSalvarEdicao} />
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
                    </View>
                </View>
            </Modal>

            {/* Modal para inserir link PDF */}
            <Modal
                visible={pdfModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setPdfModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Inserir Link do PDF</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Link do PDF"
                            value={pdfLink}
                            onChangeText={setPdfLink}
                        />
                        <Button title="Salvar Link" onPress={handleSalvarPdfLink} />
                        <Button title="Cancelar" onPress={() => setPdfModalVisible(false)} color="red" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    button: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, marginVertical: 10,
        borderRadius: 10, elevation: 3,
    },
    buttonText: { fontSize: 16, color: '#1E90FF', marginLeft: 10 },
    buttonTextDelete: { fontSize: 16, color: '#fff', marginLeft: 10 },
    deleteButton: { backgroundColor: 'red' },
    icon: { marginRight: 10 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', elevation: 5 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingLeft: 8, borderRadius: 5 },
});

export default PacienteDetails;
