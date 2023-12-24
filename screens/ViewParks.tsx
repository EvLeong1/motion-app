import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../styles/globalStyles';
import { platform } from 'os';

const ViewParks = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: any) => {
    console.log('Search query:', query);
    // add firebase search here
  };

  const handleClear = () => {
    setSearchQuery('');
    //reset the firebase query to show all
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search parks..."
          placeholderTextColor="white" 
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name="times" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View>
        <Text>ViewParks</Text>
        {/* add other stuff here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: 'white',
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: 'white',
    
    
  },

  clearButton: {
    padding: 10,
  },
});

export default ViewParks;
