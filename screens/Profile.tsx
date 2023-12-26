import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    gap: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },
  addPhotoButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    padding: 20,
    color: '#ccc',
    backgroundColor: '#ccc',
  },
  
  descriptor: {
    fontSize: 15,
    color: 'black',
    fontStyle: 'italic',
    // textDecorationLine: 'underline',
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  signInContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
  boxContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    gap: 5,
  },
});

const Profile = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setPhotoURL(user?.photoURL || null);
    });

    return () => unsubscribe();
  }, []);

  const SignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddPhotoPress = () => {
    console.log('Add photo clicked!');
  };

  return (
    <View style={styles.container}>
      {user ? (
        // If user is logged in, display the following
        <View style={styles.profileContainer}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.photo} />
          ) : (
            <TouchableOpacity onPress={handleAddPhotoPress} style={styles.addPhotoButton}>
              <MaterialIcons name="add-photo-alternate" size={50} color="black" />
            </TouchableOpacity>
          )}
          <View style={styles.boxContainer}>
            <Text style={styles.descriptor}>Username</Text>
            <Text style={styles.text}>{user.displayName}</Text>
          </View>
          <View style={styles.boxContainer}>
            <Text style={styles.descriptor}>Email</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>

          <Button title="Sign Out" onPress={SignOut} />
          
        </View>
      ) : (
        // If user is not logged in, display the following
        <View style={styles.signInContainer}>
          <Text>Please sign in to view your profile</Text>
          <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </View>
  );
};

export default Profile;
