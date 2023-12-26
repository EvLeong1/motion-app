import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB } from '../FirebaseConfig';
import { globalStyles, viewParks } from '../styles/globalStyles';

const ViewParks = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [parks, setParks] = useState<any[]>([]);
  const [filteredParks, setFilteredParks] = useState<any[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const parksDB = collection(FIREBASE_DB, 'parks');

    const unsubscribe = onSnapshot(parksDB, {
      next: (snapshot) => {
        const parks: any[] = [];
        const filteredParks: any[] = [];
        snapshot.forEach((doc) => {
          parks.push({
            id: doc.id,
            ...doc.data(),
          });
          filteredParks.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setParks(parks);
        setFilteredParks(filteredParks);
        setLoading(false); 
        console.log("LOADED PARKS");
      },
      error: (error) => {
        console.log(error);
        setLoading(false); 
      },
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    const filteredParks = parks.filter((park) =>
      park.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredParks(filteredParks);
  };

  const handleParkBoxClick = (parkId: any) => {
    console.log(`Clicked on park with ID: ${parkId}`);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading ? (
        <View style={viewParks.loadingContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={viewParks.container}>
          {filteredParks.sort((a, b) => a.name.localeCompare(b.name)).map((park) => (
            <TouchableOpacity key={park.id} style={viewParks.parkBox} onPress={() => handleParkBoxClick(park.id)}>
              <Image source={{ uri: park.image }} style={viewParks.image} />
              <View style={viewParks.textContainer}>
                <Text style={viewParks.title}>{park.name}</Text>
                <Text style={viewParks.location}>{park.location[2]}, {park.location[1]}, {park.location[0]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};



export default ViewParks;
