import { ActivityIndicator, Keyboard, Text } from 'react-native';
import { useState } from 'react';
import { registerStyles } from '../styles/globalStyles';
import { Pressable, SafeAreaView, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-root-toast';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

function showDefaultPopup(message: string) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: '#F95555',
  });
}

const Register = ({ navigation }: Props) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const register = async () => {
    Keyboard.dismiss();
    if (!username.trim()) {
      showDefaultPopup('Please enter a username.');
      return;
    }

    if (!email.trim()) {
      showDefaultPopup('Please enter a valid email.');
      return;
    }
    if (!password.trim()) {
      showDefaultPopup('Please enter a valid password.');
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password,
      );
      // Update user's display name in Firebase
      await updateProfile(response.user, {
        displayName: username,
      });

      await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), {
        uid: response.user.uid,
        displayName: username,
        email: email,
        photoURL: null,
        bio: null,
        rating: null,
      });

      Toast.show('Registration Successful', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM + 50,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: '#76FF76',
        textColor: '#000000',
      });

      // Navigate to the home screen
      navigation.navigate('Home');

      console.log(response);
    } catch (error: any) {
      console.log(error);
      let errorMessage = 'An error occurred during registration.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      }
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid Email';
      }
      if (error.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters';
      }

      showDefaultPopup(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={registerStyles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: '5%' }}>
        Create An Account
      </Text>
      <TextInput
        style={registerStyles.input}
        onChangeText={(text) => setUserName(text)}
        placeholder='Username'
        placeholderTextColor='#3d3d3d'
      />
      <TextInput
        style={registerStyles.input}
        onChangeText={(text) => setEmail(text)}
        placeholder='Email'
        placeholderTextColor='#3d3d3d'
        keyboardType='email-address'
        autoComplete='email'
      />
      <TextInput
        style={registerStyles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder='Password'
        placeholderTextColor='#3d3d3d'
        autoComplete='password'
        secureTextEntry={true}
      />
      {loading ? <ActivityIndicator size='large' color='#00ff00' /> : (
        <>
          <Pressable style={registerStyles.button} onPress={register}>
            <Text style={registerStyles.text}>Register</Text>
          </Pressable>
        </>
      )}

      <Pressable
        style={{ marginTop: '4%' }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={registerStyles.link}>Already have an account? Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Register;
