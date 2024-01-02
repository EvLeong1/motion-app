import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import ViewParks from './screens/ViewParks';
import { colors } from './styles/colors';
import ParkInfo from './screens/ParkInfo';
import RideInfo from './screens/RideInfo';
import MyReviews from './screens/MyReviews';

export type RootStackParamList = {
  Home: undefined;
  TabBar: undefined;
  Login: undefined;
  Register: undefined;
  ParkInfo: { park: Park };
  RideInfo: { ride: Ride};
  MyReviews: { user: any };
};

export type Park = {
  id: string;
  image: string;
  location: string[];
  name: string;
};

export type Ride = {
  id: string;
  name: string;
  park: string;
  image: string;
  video: string;
  rideID: string;
  rating: string;
  numReviews: number;
};

export type Review = {
  id: string;
  username: string;
  parkID: string;
  rideID: string;
  rideName: string;
  date: string;
  text: string;
  rating: string;
  hasDrops: boolean;
  isDark: boolean;
  email: string;
  upvotes: number;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const ViewParksStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const ViewParksStackNavigator = () => (
  <ViewParksStack.Navigator>
    <ViewParksStack.Screen name='View Parks' component={ViewParks} />
  </ViewParksStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name='My Profile' component={Profile} />
  </ProfileStack.Navigator>
);

function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={() => ({
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
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name='user-circle-o' size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
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
          <Stack.Screen name='RideInfo' component={RideInfo} />
          <Stack.Screen name='MyReviews' component={MyReviews} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
