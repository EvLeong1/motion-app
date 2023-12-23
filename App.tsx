import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {User, onAuthStateChanged} from 'firebase/auth';
import { useState } from 'react';


import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import AddReview from './screens/AddReview';
import Profile from './screens/Profile';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator(); 


export default function App() {
  const [user, setUser] = useState<User | null> (null);

  React.useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user?.email);
    });
  }, []);

  //Main Stack Navigator
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        {/* <Stack.Screen name="AddReview" component={AddReview} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


