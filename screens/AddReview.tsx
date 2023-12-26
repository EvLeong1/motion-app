import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Pressable} from 'react-native';


// var Themeparks = require('themeparks');


// var api = new Themeparks.DestinationsApi()
// api.getDestinations().then(function(data: any) {
//   console.log('API called successfully. Returned data: ' + data);
// }, function(error: any) {
//   console.error(error);
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