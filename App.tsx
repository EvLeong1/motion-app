import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
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
import { colors } from './styles/colors';
import ParkInfo from './screens/ParkInfo';

export type RootStackParamList = {
  TabBar: undefined;
  Login: undefined;
  Register: undefined;
  ParkInfo: { park: any };
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const ViewParksStack = createNativeStackNavigator();

const ViewParksStackNavigator = () => (
  <ViewParksStack.Navigator>
    <ViewParksStack.Screen name='View Parks' component={ViewParks} />
  </ViewParksStack.Navigator>
);

function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.tabBarActiveTintColor,
        tabBarInactiveTintColor: colors.tabBarInactiveTintColor,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: colors.tabBar,
          position: 'absolute',
          borderTopWidth: 0.5,
          borderTopColor: 'gray',
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='ViewParks'
        component={ViewParksStackNavigator}
        options={{
          tabBarLabel: 'View Parks',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='park' color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name='user-circle-o' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // console.log(user?.email);
    });
  }, []);

  //Main Stack Navigator
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='TabBar'
            component={TabBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='ParkInfo' component={ParkInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
