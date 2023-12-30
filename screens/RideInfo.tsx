import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import YoutubePlayer from 'react-native-youtube-iframe';
import {rideInfoStyles} from '../styles/globalStyles'

type RideInfoProps = NativeStackScreenProps<RootStackParamList, 'RideInfo'>;

const RideInfo = ({ route, navigation }: RideInfoProps) => {
  const ride = route.params.ride;
  const [isVideoLoading, setVideoLoading] = useState(false);

  const handleVideoReady = () => {
    console.log('video ready');
    setVideoLoading(false);
  };

  return (
    // <View style={{ display: 'flex', alignItems: 'center' }}>
      <View style={rideInfoStyles.container}>

      <Text style={rideInfoStyles.title}>{`${ride.name}`}</Text>
      {/* <Text style={rideInfoStyles.text}>{`ride id: ${ride.id}`}</Text> */}
      <Text style={rideInfoStyles.text}>{`Dizzy Level: ${ride.rating}`}</Text>
      {isVideoLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View style={rideInfoStyles.video}>
          <YoutubePlayer
            height={176} // max is 220
            width={320} // max is 400
            play={false}
            videoId={ride.video}
            onReady={() => console.log('ready')}
          />
        </View>
      )}
      <Text style={rideInfoStyles.title}>{'Reviews'}</Text>
    </View>
  );
};

export default RideInfo;
