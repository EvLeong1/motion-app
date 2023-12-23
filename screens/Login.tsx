import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';


const Login = () => {

    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={globalStyles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Email"
      />
      <TextInput
        style={globalStyles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Password"
      />
    </SafeAreaView>
  )
}

export default Login