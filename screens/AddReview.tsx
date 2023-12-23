import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Pressable} from 'react-native';
// import mongoose from "mongoose";



// require('dotenv').config();

// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err: any) => {
//     console.log('Failed to connect to MongoDB', err);
// });



const AddReview = ({ navigation }: { navigation: any }) => {
  return (
    <View style={globalStyles.container}>
      <Text>Add Review</Text>
      {/* <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
        /> */}
            
    </View>
  )
}

export default AddReview