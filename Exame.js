import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Exame = () => {
    const [paciente, setPaciente] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const fetchPaciente = async () => {
        try {
            const user = await AsyncStorage.getItem('usuarioLogado'); 
            const pacienteLogado = JSON.parse(user);
    
            if (pacienteLogado && pacienteLogado.paciente_id) {
                const response = await fetch(`http://172.16.1.111:3001/pacientes/${pacienteLogado.paciente_id}/pdf`);
                const data = await response.json();
    
                console.log('Resposta da API:', data);
    
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
                    onPress={() => Linking.openURL(paciente.paciente_pdf)} 
                >
                    <Text style={styles.examName}>Visualizar Exame</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.noExamsText}>Nenhum exame disponível.</Text>
            )}
            <Text style={styles.footerText}>
                O resultado dos exames podem ficar prontos entre 1 a 5 dias úteis após realizado.
            </Text>
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
    footerText: {
        textAlign: 'center',
        color: 'red', 
        fontSize: 14,
        marginTop: 20,
        position: 'absolute',
        bottom: 30,
        right: 0,
        left: 0,
    },
});

export default Exame;
