import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { globalStyles,registerStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from '@firebase/auth';

const Register = ({ navigation }: { navigation: any }) => {
    
    const [username, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const auth = FIREBASE_AUTH;

    const register = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
        } catch (error: any) {
            console.log(error);
            Alert.alert('Registration Failed' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={registerStyles.container}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: '10%',marginTop:'5%'}}>Create An Account</Text>
            <TextInput
                style={registerStyles.input}
                onChangeText={(text) => setUserName(text)}
                placeholder="Username"
            />
            <TextInput
                style={registerStyles.input}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                keyboardType='email-address'
                autoComplete='email'
            />
            <TextInput
                style={registerStyles.input}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                secureTextEntry={true}
            />
            { loading ? <ActivityIndicator size='large' color='#00ff00' /> : <>
                <Pressable style={registerStyles.button}  onPress={register}>
                    <Text style={registerStyles.text}>Register</Text>
                </Pressable>
            </>
            }


            {/* <Pressable style={registerStyles.button}  onPress={() => Alert.alert(username+', '+ email +', '+ password)}>
                <Text style={registerStyles.text}>Register</Text>
            </Pressable> */}
            
            
            <Pressable style = {{marginTop:'4%'}}onPress={() => navigation.navigate('Login')}>
                <Text style={registerStyles.link}>Already have an account? Login</Text>
            </Pressable> 
  
        </SafeAreaView>
    )
}

export default Register