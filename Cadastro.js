import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [celular, setCelular] = useState('');
    const [cep, setCep] = useState('');
    const [sus, setSus] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = () => {
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('CPF:', cpf);
        console.log('Celular:', celular);
        console.log('CEP:', cep);
        console.log('Sus:', sus);
        console.log('Senha:', senha);
    };

return (
    <View style={styles.container}>
        <Text style={styles.title}>Tela de Cadastro</Text>

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

        <Button title="Cadastrar" onPress={handleCadastro} />
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
    
}
});

export default Cadastro;
