import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import YoutubePlayer from 'react-native-youtube-iframe';

type RideInfoProps = NativeStackScreenProps<RootStackParamList, 'RideInfo'>;

const RideInfo = ({ route, navigation }: RideInfoProps) => {
  const ride = route.params.ride;
  const [isVideoLoading, setVideoLoading] = useState(false);

  const handleVideoReady = () => {
    console.log('video ready');
    setVideoLoading(false);
  };

  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Text>{`Ride name: ${ride.name}`}</Text>
      <Text>{`ride id: ${ride.id}`}</Text>
      <Text>{`Ride park: ${ride.park}`}</Text>
      {isVideoLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View style={{ borderColor: 'black', borderWidth: 4, borderRadius: 10 }}>
          <YoutubePlayer
            height={176} // max is 220
            width={320} // max is 400
            play={false}
            videoId={ride.video}
            onReady={() => console.log('ready')}
          />
        </View>
      )}
    </View>
  );
};

export default RideInfo;
