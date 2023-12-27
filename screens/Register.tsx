import { View, Text, ActivityIndicator, Keyboard } from 'react-native'
import React from 'react'
import { globalStyles,registerStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-root-toast';

const Register = ({ navigation }: { navigation: any }) => {
    
    const [username, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    // const auth = FIREBASE_AUTH;

    const register = async () => {
        Keyboard.dismiss();
        if (!username.trim()) {
            // Alert.alert('Error', 'Please enter a username.');
            let toast = Toast.show('Please enter a username.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#F95555',
                // containerStyle: { marginBottom: 55 }
            });
            return;
        }

        if (!email.trim()) {
            // Alert.alert('Error', 'Please enter a valid email.');
            let toast = Toast.show('Please enter a valid email.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#F95555',
                // containerStyle: { marginBottom: 55 }
            });
            return;
        }
        if (!password.trim()) {
            // Alert.alert('Error', 'Please enter a valid password.');
            let toast = Toast.show('Please enter a valid password.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#F95555',
                // containerStyle: { marginBottom: 55 }
            });
            return;
        }

        

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            // Update user's display name in Firebase
            await updateProfile(response.user, {
                displayName: username,
            });

            await setDoc(doc(FIREBASE_DB, "users", response.user.uid), {
                uid: response.user.uid,
                displayName: username,
                email: email,
                photoURL: null,
                bio: null,
                rating: null,
              });

              let toast = Toast.show("Registration Successful", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM + 50,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#76FF76',
                textColor: '#000000'
                
              });
    
              // Navigate to the home screen
              navigation.navigate('Home');

            console.log(response);
        } catch (error: any) {
            console.log(error);
            let errorMessage = 'An error occurred during registration.';
            if(error.code === 'auth/email-already-in-use'){
                errorMessage = 'Email already in use';
            }
            if(error.code === 'auth/invalid-email'){
                errorMessage = 'Invalid Email';
            }
            if(error.code === 'auth/weak-password'){
                errorMessage = 'Password must be at least 6 characters';
            }
            
            let toast = Toast.show(errorMessage, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: '#F95555',
                // containerStyle: { marginBottom: 55 }
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={registerStyles.container}>
            <Text style={{fontSize: 30, fontWeight: 'bold',marginTop:'5%'}}>Create An Account</Text>
            <TextInput
                style={registerStyles.input}
                onChangeText={(text) => setUserName(text)}
                placeholder="Username"  
                // autoComplete='email'
            />
            <TextInput
                style={registerStyles.input}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                keyboardType='email-address'
                autoComplete='email'
                // textContentType = 'emailAddress'
            />
            <TextInput
                style={registerStyles.input}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                autoComplete='password'
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