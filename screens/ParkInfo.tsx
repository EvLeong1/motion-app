import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ride, RootStackParamList } from '../App';
import { useEffect, useLayoutEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';
import { globalStyles, viewParks } from '../styles/globalStyles';
type ParkInfoProps = NativeStackScreenProps<RootStackParamList, 'ParkInfo'>;

const ParkInfo = ({ route, navigation }: ParkInfoProps) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [rides, setRides] = useState<Ride[]>([]);

  const park = route.params.park;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(FIREBASE_DB, 'rides'), where('park', '==', park.name)),
      {
        next: (snapshot) => {
          const tempRides: Ride[] = [];
          snapshot.forEach((doc) => {
            tempRides.push({
              ...doc.data() as Ride,
              id: doc.id,
            });
          });

          setRides(tempRides);
          setLoading(false);
        },
        error: (error) => {
          console.log(error);
          setLoading(false);
        },
      },
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [rides, searchQuery]);

  const filteredRides = rides.filter((ride) =>
    ride.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: any) => {
    setSearchQuery(query);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerTitle: `${park.name}`,

      headerSearchBarOptions: {
        placeholder: 'Search',
        onChangeText: (query: any) => handleSearch(query.nativeEvent.text),
      },
    });
  }, [navigation]);

  function handleRideBoxClick(ride: Ride): void {
    console.log('Ride box clicked!');
    navigation.navigate('RideInfo', { ride: ride });
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading
        ? (
          <View style={viewParks.loadingContainer}>
            <ActivityIndicator size='large' color='black' />
          </View>
        )
        : (
          <ScrollView contentContainerStyle={viewParks.container}>
            {filteredRides.sort((a, b) => a.name.localeCompare(b.name)).map((
              ride,
            ) => (
              <TouchableOpacity
                key={ride.id}
                style={viewParks.parkBox}
                onPress={() => handleRideBoxClick(ride)}
              >
                <Image source={{ uri: ride.image }} style={viewParks.image} />
                <View style={viewParks.textContainer}>
                  <Text style={viewParks.title}>{ride.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
    </SafeAreaView>
  );
};

export default ParkInfo;
