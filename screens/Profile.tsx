import { View, Text, Button, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ViewProfile } from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

const Profile = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [userDoc, setUserDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const usersDB = collection(FIREBASE_DB, 'users');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);
      setPhotoURL(user?.photoURL || null);

      // Check if the user is logged in
      if (user) {
        try {
          const q = query(usersDB, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const uDoc = querySnapshot.docs[0].data();
            setUserDoc(uDoc);
            console.log('User Document:', uDoc);
          } else {
            console.log('User document not found');
          }
        } catch (error) {
          console.error('Error retrieving user document:', error);
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
      } else {
        setLoading(false); // Set loading to false if the user is not logged in
      }
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
    console.log(userDoc);
  };

  const loadUser = async () => {
    console.log("in load: "+userDoc);
  }

  if (loading) {
    // Display a loading indicator while the data is being fetched
    return (
      <View style={ViewProfile.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={ViewProfile.container}>
        {user ? (
          // If the user is logged in, display the following
          <View style={ViewProfile.profileContainer}>
            {user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={ViewProfile.photo} />
            ) : (
              <TouchableOpacity onPress={handleAddPhotoPress} style={ViewProfile.addPhotoButton}>
                <MaterialIcons name="add-photo-alternate" size={50} color="black" />
              </TouchableOpacity>
            )}
            <View style={ViewProfile.boxContainer}>
              <Text style={ViewProfile.descriptor}>Username</Text>
              <Text style={ViewProfile.text}>{user.displayName}</Text>
            </View>
            <View style={ViewProfile.boxContainer}>
              <Text style={ViewProfile.descriptor}>Email</Text>
              <Text style={ViewProfile.text}>{user.email}</Text>
            </View>
            <View style={ViewProfile.boxContainer}>
              <Text style={ViewProfile.descriptor}>Dizzy Bio</Text>
              <Text style={ViewProfile.text}>{userDoc?.bio}</Text>
            </View>
            <View style={ViewProfile.boxContainer}>
              <Text style={ViewProfile.descriptor}>Rating</Text>
              <Text style={ViewProfile.text}>{userDoc?.rating}</Text>
            </View>

            <View style={{ borderColor:'#ccc', borderWidth:1, borderRadius: 20, padding:5 }}>
              <Button title="Sign Out" onPress={SignOut} />
            </View>
          </View>
        ) : (
          // If the user is not logged in, display the following
          <View style={ViewProfile.signInContainer}>
            <Text>Please sign in to view your profile</Text>
            <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
