import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Exame = () => {
    const [paciente, setPaciente] = useState(null); // Dados do paciente
    const [loading, setLoading] = useState(true); // Carregamento

    // Função para buscar os dados do paciente
    const fetchPaciente = async () => {
        try {
            // Usar a mesma chave de AsyncStorage definida no Login.js
            const user = await AsyncStorage.getItem('usuarioLogado'); 
            const pacienteLogado = JSON.parse(user);
    
            if (pacienteLogado && pacienteLogado.paciente_id) {
                const response = await fetch(`http://172.16.1.107:3001/pacientes/${pacienteLogado.paciente_id}/pdf`);
                const data = await response.json();
    
                console.log('Resposta da API:', data);
    
                // Verifica se o PDF está disponível
                if (data.pdfLink) {
                    setPaciente({ paciente_pdf: data.pdfLink });
                } else {
                    console.warn('Nenhum PDF disponível.');
                }
            } else {
                console.warn('Paciente não encontrado no AsyncStorage.');
            }
        } catch (error) {
            console.error('Erro ao carregar paciente:', error);
        } finally {
            setLoading(false);
        }
    };
    

    // Carrega os dados ao montar o componente
    useEffect(() => {
        fetchPaciente();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
                <Text>Carregando informações...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Exames</Text>
            {paciente && paciente.paciente_pdf ? (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => Linking.openURL(paciente.paciente_pdf)} // Abre o PDF no navegador
                >
                    <Text style={styles.examName}>Visualizar Exame</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.noExamsText}>Nenhum exame disponível.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    card: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        alignItems: 'center',
    },
    examName: { fontSize: 18, color: '#1E90FF' },
    noExamsText: { textAlign: 'center', color: '#888', fontSize: 16 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Exame;
