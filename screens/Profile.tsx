import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';


const Profile = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
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

  return (
    <View>
      {user ? (
        <View>
          <Text>User: {user.displayName}</Text>
          <Button title="Sign Out" onPress={SignOut} />
        </View>
      ) : (
        <View>
          <Text>Please sign in to view your profile</Text>
          <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
        </View>
      )}
    </View>
  );
};

export default Profile;
