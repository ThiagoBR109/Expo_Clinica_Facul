import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importando os ícones

const PacienteDetails = ({ route }) => {
    const { paciente } = route.params;

    const handleEnviarPDF = () => {
        // Lógica para enviar o PDF para o paciente
        Alert.alert('Envio de PDF', `Enviar PDF para ${paciente.paciente_nome}`);
    };

    const handleEditarPaciente = () => {
        // Lógica para editar as informações do paciente
        Alert.alert('Editar', `Editar informações de ${paciente.paciente_nome}`);
    };

    const handleApagarPaciente = () => {
        // Lógica para apagar o paciente
        Alert.alert('Apagar', `Apagar o paciente ${paciente.paciente_nome}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Paciente</Text>
            <Text style={styles.label}>Nome: {paciente.paciente_nome}</Text>
            <Text style={styles.label}>Email: {paciente.paciente_email}</Text>
            {/* Exibir mais detalhes aqui */}
            
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        color: '#1E90FF',
        marginLeft: 10,
    },
    buttonTextDelete: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    icon: {
        marginRight: 10,
    },
});

export default PacienteDetails;
