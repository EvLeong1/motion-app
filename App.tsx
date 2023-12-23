import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {User, onAuthStateChanged} from 'firebase/auth';
import { useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import AddReview from './screens/AddReview';
import Profile from './screens/Profile';
import ViewParks from './screens/ViewParks';
import { FIREBASE_AUTH } from './FirebaseConfig';


const Tab = createBottomTabNavigator();


const Stack = createNativeStackNavigator(); 

// function AuthStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Register" component={Register} />
//     </Stack.Navigator>
//   );
// };
 function TabBar () {
  return (
    <Tab.Navigator initialRouteName="Home" >
          <Tab.Screen name="Home" component={Home}  
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen name="View Parks" component={ViewParks}  
          options={{
            tabBarLabel: 'View Parks',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="park" color={color} size={size} />
              ),
              
            }}
          />
        
          <Tab.Screen name="Profile" component={Profile} 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-circle-o" size={size} color={color} />
              ),
            }}
          />
          
        </Tab.Navigator>
  );
 }
 
export default function App() {
  const [user, setUser] = useState<User | null> (null);

  React.useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user?.email);
    });
  }, []);

  //Main Stack Navigator
  return (
    <RootSiblingParent>
      <NavigationContainer>
        {/* <Tab.Navigator initialRouteName="Home" >
          <Tab.Screen name="Home" component={Home}  
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen name="View Parks" component={ViewParks}  
          options={{
            tabBarLabel: 'View Parks',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="park" color={color} size={size} />
              ),
              
            }}
          />
        
          <Tab.Screen name="Profile" component={Profile} 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-circle-o" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen name = "AuthStack" component={AuthStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-circle-o" size={size} color={color} />
              ),
            // tabBarStyle: { display: 'none' },
            headerShown: false,
            }} />
          
        </Tab.Navigator> */}
        <Stack.Navigator >
          <Stack.Screen name="Home" component={TabBar} options={{headerShown: false}}/>
          
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}


