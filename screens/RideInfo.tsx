import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

type RideInfoProps = NativeStackScreenProps<RootStackParamList, 'RideInfo'>;

const RideInfo = ({ route, navigation }: RideInfoProps) => {
  const ride = route.params.ride;
  
  return (
    <View>
      <Text>{`Ride name: ${ride.name}`}</Text>
      <Text>{`ride id: ${ride.id}`}</Text>
      <Text>{`Ride park: ${ride.park}`}</Text>
        <Text>{`Ride image: ${ride.video}`}</Text>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={ride.video}
      />
    </View>
  );
};

export default RideInfo;

