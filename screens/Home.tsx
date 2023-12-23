import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      {/* User Icon Button */}
      {/* <TouchableOpacity style= {styles.userIconContainer} onPress={() => {navigation.navigate('Profile')}}>
        <Icon name="user-circle-o" size={20} color="black" />
      </TouchableOpacity> */}
      <Text style={{fontSize:50, color:'white'}}>Motion APP</Text>
      <Text style={{fontSize:30, color:'white'}}>Welcome to Motion</Text>
    </SafeAreaView>
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
