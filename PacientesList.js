import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importando o ícone

const PacientesList = ({ navigation }) => {
    const [pacientes, setPacientes] = useState([]);

    // Função para buscar pacientes do servidor
    const fetchPacientes = () => {
        fetch('http://172.16.1.110:3001/pacientes')
        .then(response => response.json())
        .then(data => {
            setPacientes(data);  // Define os pacientes no estado
        })
        .catch(error => {
            console.error('Erro ao buscar pacientes:', error);
            Alert.alert('Erro', 'Não foi possível buscar os pacientes.');
        });
    };

    useEffect(() => {
        fetchPacientes();  // Busca os pacientes quando a tela for carregada
    }, []);

    const renderPaciente = ({ item }) => (
        <TouchableOpacity 
            style={styles.pacienteItem}
            onPress={() => navigation.navigate('PacienteDetails', { paciente: item })}
        >
            <View style={styles.pacienteInfo}>
                <View>
                    <Text style={styles.pacienteNome}>{item.paciente_nome}</Text>
                    <Text style={styles.pacienteEmail}>{item.paciente_email}</Text>
                    <Text style={styles.pacienteCpf}>CPF: {item.paciente_cpf}</Text>
                </View>
                {/* Adicionando o ícone de chevron-right */}
                <Icon name="chevron-right" size={20} color="#f56f42" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Pacientes</Text>
            <FlatList
                data={pacientes}
                keyExtractor={(item) => item.paciente_id.toString()}
                renderItem={renderPaciente}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    pacienteItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between', // Para alinhar o ícone à direita
        alignItems: 'center',            // Alinhar o texto e ícone verticalmente
    },
    pacienteInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, // Faz com que o conteúdo do paciente ocupe o espaço restante
    },
    pacienteNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pacienteEmail: {
        fontSize: 14,
        color: 'gray',
    },
    pacienteCpf: {
        color: 'gray',
    },
});

export default PacientesList;
