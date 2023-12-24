import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles, viewParks } from '../styles/globalStyles';
import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const ViewParks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [parks, setParks] = useState<any[]>([]);  
  const [filteredParks, setFilteredParks] = useState<any[]>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const parksDB = collection(FIREBASE_DB, 'parks');

    const unsubscribe = onSnapshot(parksDB, {
      next: (snapshot) => {
        const parks: any[] = [];
        snapshot.forEach((doc) => {
          // console.log(doc.data());
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
        console.log("LOADED PARKS");
      },
      error: (error) => console.log(error),
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
    // Handle the click event for the parkBox with the given ID
    // You can navigate to a detailed view or perform any other action
    console.log(`Clicked on park with ID: ${parkId}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    // reset the firebase query to show all
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150, 
      useNativeDriver: false, 
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView>  
      <View style={viewParks.container}>
        <Animated.View style={[styles.searchBarContainer, { backgroundColor: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['white', 'lightgray'],
        }) }]}>
          <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search parks..."
            placeholderTextColor="black" 
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Icon name="times" size={20} color="gray" />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
        <View style = {viewParks.parkBoxContainer}>
          {/* add other stuff here */}
          {filteredParks.sort((a, b) => a.name.localeCompare(b.name))
          .map((park) => (
            <TouchableOpacity
              key={park.id}
              style={viewParks.parkBox}
              onPress={() => handleParkBoxClick(park.id)}
            >
              <Image source={{ uri: park.image }} style={{ width: 100, height: 100, borderRadius: 20 }} />
              <View>
                <Text>{park.name}</Text>
                <Text>{park.location[0]}</Text>
              </View>
            </TouchableOpacity>
          ))}
          
         
        
          
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 10,
    width: '98%',
    height: 50
  },
  searchIcon: {
    marginRight: 10,
    color: 'black',
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  clearButton: {
    padding: 10,
  },
});

export default ViewParks;
