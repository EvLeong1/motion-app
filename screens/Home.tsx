import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyles.container}>
      {/* User Icon Button */}
      {/* <TouchableOpacity style= {styles.userIconContainer} onPress={() => {navigation.navigate('Profile')}}>
        <Icon name="user-circle-o" size={20} color="black" />
      </TouchableOpacity> */}
      <Text style={{fontSize:50}}>Motion APP</Text>
      {/* <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  userIconContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    padding: 10,
    
    borderRadius: 20,
  },
});

export default Home;
