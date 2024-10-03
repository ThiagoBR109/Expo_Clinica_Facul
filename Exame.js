import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const examList = [
    { id: '1', name: 'Exame de Sangue', date: '2024-09-20' },
    { id: '2', name: 'Raio-X de Tórax', date: '2024-09-15' },
    { id: '3', name: 'Ressonância Magnética', date: '2024-09-10' },
];

const Exame = () => {
    const navigation = useNavigation();

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`; 
};

const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ExamDetails', { examId: item.id })}>
        <View style={styles.textContainer}>
            <Text style={styles.examName}>{item.name}</Text>
            <Text style={styles.examDate}>Data: {formatDate(item.date)}</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#1E90FF" />
    </TouchableOpacity>
);

return (
    <View style={styles.container}> 
        <Text style={styles.title}>Meus Exames</Text>
        <FlatList
            data={examList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    card: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,padding: 15, backgroundColor: '#f8f8f8', marginBottom: 10, borderRadius: 8 },
    textContainer:{flexDirection: 'column'},
    examName: { fontSize: 18 },
    examDate: { color: '#888' },
});

export default Exame;