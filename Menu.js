import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Menu = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                
                <View style={styles.buttonContainer}>
                    <Animatable.View animation="fadeInRight" duration={2500}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.buttonText}>Acesso de Pacientes</Text>
                        </TouchableOpacity>
                    </Animatable.View>

                    <Animatable.View animation="fadeInLeft" duration={2500}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('Login_adm')}
                    >
                        <Text style={styles.buttonText}>Acesso de Administrador</Text>
                    </TouchableOpacity>
                    </Animatable.View>
                </View>
            </View>

            <View style={styles.photosContainer}>
                <Image
                    source={require('./assets/sus_logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Image
                    source={require('./assets/Logo_Clinica.png')}
                    style={styles.logo2}
                    resizeMode="contain"
                />
                <Image
                    source={require('./assets/niteroi_logo.png')}
                    style={styles.logo3}
                    resizeMode="contain"
                />
                <Image
                    source={require('./assets/estacio_logo.png')}
                    style={styles.logo4}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,  
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',  
    },
    buttonContainer:{
        width: '100%',  
        alignItems: 'center',
    },
    button:{
        backgroundColor: '#1E90FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginBottom: 20,
        width: '90%',
        alignItems: 'center',  
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    photosContainer: {
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        alignItems: 'center',
        width: '100%',  
        padding: 10,  
    },
    logo: {
        width: 80,
        height: 80,
    },
    logo2: {
        width: 100,
        height: 100,
    },
    logo3: {
        width: 100,
        height: 100,
    },
    logo4: {
        width: 60,
        height: 60,
    },


});

export default Menu;
