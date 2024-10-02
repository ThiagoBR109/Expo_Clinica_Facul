import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExamDetails = ({ route }) => {
    const { examId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Exame</Text>
            <Text>Exame ID: {examId}</Text>
            {/* Aqui você pode adicionar o componente para exibir o PDF */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
});

export default ExamDetails;
