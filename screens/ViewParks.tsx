import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import {
  CompositeNavigationProp,
  ParamListBase,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';
import { FIREBASE_DB } from '../FirebaseConfig';
import { globalStyles, viewParks } from '../styles/globalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Park, RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/FontAwesome';



const ViewParks = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [parks, setParks] = useState<Park[]>([]);
  const [favoriteParks, setFavoriteParks] = useState<Park[]>([]);

  const parksDB = collection(FIREBASE_DB, 'parks');

  const navigation = useNavigation<any>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search',
        onChangeText: (query: any) => handleSearch(query.nativeEvent.text),
        hideWhenScrolling: false,
      },
      headerTitleStyle: {
        color: 'black',
        fontSize: 20,
      },
      headerTitle: 'All Parks',
    });
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(parksDB, {
      next: (snapshot) => {
        const tempParks: Park[] = [];
        snapshot.forEach((doc) => {
          tempParks.push({
            ...doc.data() as Park,
            id: doc.id
          });
        });

        setParks(tempParks);
        setLoading(false);
      },
      error: (error) => {
        console.log(error);
        setLoading(false);
      },
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    handleSearch(searchQuery);
  }, [parks, searchQuery]);

  const handleSearch = (query: any) => {
    setSearchQuery(query);
  };

  const filteredParks = parks.filter((park) =>
    park.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleParkBoxClick = (park: Park) => {
    // console.log(`Clicked on park with ID: ${park.id}`);
    navigation.navigate('ParkInfo', { park: park });
  };

  const handleFavoriteClick = (park: Park) => {
    console.log('Favorite clicked!');
    console.log(park.name);

    // Add to favorites
    if (!favoriteParks.includes(park)) {
      setFavoriteParks([...favoriteParks, park]);
    }
    // Remove from favorites
    else {
      setFavoriteParks(favoriteParks.filter((p) => p !== park));
    }
    // console.log(favoriteParks.map((p) => p.name));
    //save to Firebase
    
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading
        ? (
          <View style={viewParks.loadingContainer}>
            <ActivityIndicator size='large' color='black' />
          </View>
        )
        : (
          
          <ScrollView contentContainerStyle={viewParks.container} >
            {filteredParks.sort((a, b) => a.name.localeCompare(b.name)).map((
              park,
            ) => (
              <TouchableOpacity
                key={park.id}
                style={viewParks.parkBox}
                onPress={() => handleParkBoxClick(park)}
              >
                <Image source={{ uri: park.image }} style={viewParks.image} />
                <View style={viewParks.textContainer} >
                  <Text style={viewParks.title}>{park.name}</Text>
                  <Text style={viewParks.location}>
                    {park.location[2]}, {park.location[1]}, {park.location[0]}
                  </Text>
                </View>
                <Icon
                  name='star-o'
                  size={30}
                  color='black'
                  onPress={() => handleFavoriteClick(park)}
                />
              </TouchableOpacity>
            ))}
            
          </ScrollView>
        )}
        {/* <View style={{flex:1}}>
        <View style={{borderWidth:1,position:'absolute',bottom:50,alignSelf:'flex-end'}}>
           <Button
             title="Press"
             color="#841584"
             accessibilityLabel="Press"
             onPress={onPressTouch}/>
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default ViewParks;
