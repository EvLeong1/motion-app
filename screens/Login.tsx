import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { loginStyles } from '../styles/globalStyles';
import { SafeAreaView, TextInput } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-root-toast';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

import { FIREBASE_AUTH } from '../FirebaseConfig';
import { RootStackParamList } from '../App';

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      //successful login will navigate to home screen
      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password,
      );
      Toast.show('Login Successful', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM + 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: '#76FF76',
        textColor: '#000000',
      });

      // Navigate to the home screen
      // navigation.navigate('Home');
      navigation.goBack();

    } catch (error: any) {
      let errorMessage = 'An error occurred during login.';
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/invalid-email'
      ) {
        errorMessage = 'Email or Password not found';
      }

      Toast.show(errorMessage, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: '#F95555',
        containerStyle: { marginBottom: 55 },
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: '10%',
          marginTop: '5%',
        }}
      >
        Sign In To Account
      </Text>
      <View>
        <TextInput
          autoComplete='email'
          style={loginStyles.input}
          onChangeText={(text) => setEmail(text)}
          placeholder='email'
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
          placeholder='password'
          placeholderTextColor='#3d3d3d'
          secureTextEntry={true}
          autoCorrect={false}
        />
      </View>
      <Pressable
        style={{ marginTop: '0%' }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={loginStyles.forgot}>Forgot Password?</Text>
      </Pressable>
      {loading ? <ActivityIndicator size='large' color='#00ff00' /> : (
        <>
          <Pressable style={loginStyles.button} onPress={login}>
            <Text style={loginStyles.text}>Login</Text>
          </Pressable>
        </>
      )}

      <Pressable
        style={{ marginTop: '4%' }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={loginStyles.link}>Don't have an account? Register</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Login;
