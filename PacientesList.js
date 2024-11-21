import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  

const PacientesList = ({ navigation }) => {
    const [pacientes, setPacientes] = useState([]);

    
    const fetchPacientes = () => {
        fetch('http://172.16.1.111:3001/pacientes')
        .then(response => response.json())
        .then(data => {
            setPacientes(data);  
        })
        .catch(error => {
            console.error('Erro ao buscar pacientes:', error);
            Alert.alert('Erro', 'Não foi possível buscar os pacientes.');
        });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchPacientes();  
        });

        return unsubscribe;  
    }, [navigation]);

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
        justifyContent: 'space-between', 
        alignItems: 'center',            
    },
    pacienteInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, 
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
