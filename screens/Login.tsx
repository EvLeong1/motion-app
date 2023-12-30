import { View, Text, Alert, ActivityIndicator, Pressable, Keyboard } from 'react-native'
import React from 'react'
import { globalStyles, registerStyles, loginStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth'
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

import { FIREBASE_AUTH } from '../FirebaseConfig';
import { RootStackParamList } from '../App';

const Login = ({ navigation }: Props) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  // const navi = useNavigation();

  // React.useLayoutEffect(() => {
  //   navi.setOptions({
  //     headerLargeTitle: true,
  //   });
  // }, [navi]);

  const login = async () => {
    Keyboard.dismiss();
      setLoading(true);
      
      try {
          //successful login will navigate to home screen
          const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
          let toast = Toast.show("Login Successful", {
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
          
          // console.log(response);
      } catch (error: any) {
          let errorMessage = 'An error occurred during login.';
          if(error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email'){
              // Alert.alert('Login Failed', 'Email or Password not found');
              errorMessage = 'Email or Password not found';
          }
          
          let toast = Toast.show(errorMessage, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            backgroundColor: '#F95555',
            containerStyle: { marginBottom: 55 }

  
          });
          
          // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
          // setTimeout(function hideToast() {
          //   Toast.hide(toast);

          // }, 2000);
          console.log(error);
          // Alert.alert('Registration Failed ' + error.message);
      } finally {
        setLoading(false);
        

      }
  }

  return (
    <SafeAreaView style={loginStyles.container}>
      <Text style={{fontSize: 30, fontWeight: 'bold', marginBottom: '10%',marginTop:'5%'}}>Sign In To Account</Text>
      <View>
        <TextInput
          autoComplete='email'
          style={loginStyles.input}
          onChangeText={(text) => setEmail(text)}
          placeholder="email"
          keyboardType='email-address'
          placeholderTextColor='#3d3d3d'
          autoCorrect={false}
          secureTextEntry={false}

        />
      </View>
      <View>
        <TextInput
          style={loginStyles.input}
          onChangeText={(pass) => setPassword(pass)}
          placeholder="password"
          placeholderTextColor='#3d3d3d'
          secureTextEntry={true}
          // autoComplete='password'
          autoCorrect={false}
        />
      </View>
      <Pressable style = {{marginTop:'0%'}}onPress={() => navigation.navigate('Register')}>
        <Text style ={loginStyles.forgot}>Forgot Password?</Text>
      </Pressable>
      { loading ? <ActivityIndicator size='large' color='#00ff00' /> : <>
                <Pressable style={loginStyles.button}  onPress={login}>
                    <Text style={loginStyles.text}>Login</Text>
                </Pressable>
            </>
      }

      <Pressable style = {{marginTop:'4%'}}onPress={() => navigation.navigate('Register')}>
        <Text style={loginStyles.link}>Don't have an account? Register</Text>
      </Pressable> 
      {/* <Pressable style = {{marginTop:'4%'}}> */}
      {/*   <Text style={loginStyles.link}>Forgot Password?</Text> */}
      {/* </Pressable>  */}
      
    </SafeAreaView>
  )
}

export default Login
