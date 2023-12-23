import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';



const Stack = createNativeStackNavigator(); 

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const Profile = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const SignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View>
      {user ? (
        // If user is logged in, display the following
        <View>
          <Text>User: {user.displayName}</Text>
          <Button title="Sign Out" onPress={SignOut} />
        </View>
      ) : (

        // If user is not logged in, display the following
        <View>
          <Text>Please sign in to view your profile</Text>
          <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </View>
  );
};

export default Profile;
