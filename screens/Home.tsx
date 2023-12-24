import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { SafeAreaView, StyleSheet, TextInput, Button, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';
// import pic from '../assets/4x.webp';

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      {/* User Icon Button */}
      {/* <TouchableOpacity style= {styles.userIconContainer} onPress={() => {navigation.navigate('Profile')}}>
        <Icon name="user-circle-o" size={20} color="black" />
      </TouchableOpacity> */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Motion APP</Text>
        <Text style={{ fontSize: 30, color: 'black' }}>Welcome to Motion</Text>
      </View>
      <Image style={{width: 200, height: 200, borderRadius: 20}} source={{uri:'https://media1.tenor.com/m/u28GHpki8VgAAAAd/cat-walking.gif'}} />
      
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
  titleContainer: {
    marginTop: 50,
    borderWidth: 3, // Set the border width
    borderColor: 'darkgray', // Set the border color
    borderRadius: 10, // Set the border radius
    padding: 20,
    backgroundColor: colors.tabBar,
    marginBottom: 20, // Add some space between the title and the next text
  },
  titleText: {
    fontSize: 50,
    color: 'black',
  },
});

export default Home;
