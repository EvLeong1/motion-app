import React, { useState } from 'react';
import { ActivityIndicator, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import YoutubePlayer from 'react-native-youtube-iframe';
import { RadioButton, Divider, ToggleButton } from 'react-native-paper';
import Modal from 'react-native-modal'; 
import { rideInfoStyles } from '../styles/globalStyles';
import { RootStackParamList } from '../App';
import { Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import { SafeAreaView } from 'react-native-safe-area-context';

type RideInfoProps = NativeStackScreenProps<RootStackParamList, 'RideInfo'>;

const RideInfo = ({ route, navigation }: RideInfoProps) => {
  const ride = route.params.ride;
  const [isVideoLoading, setVideoLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [isDarkRide, setDarkRide] = useState(false);
  const [hasDrops, setHasDrops] = useState(false);
  const [motionRating, setMotionRating] = useState('1');

  const handleVideoReady = () => {
    console.log('video ready');
    setVideoLoading(false);
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleAddReview = () => {
    // Implement logic to save the review and its details
    console.log('Review Text:', reviewText);
    console.log('Is Dark Ride:', isDarkRide);
    console.log('Has Drops:', hasDrops);
    if(motionRating == null){
      
      
      return;
    }
    console.log('Motion Rating:', motionRating);

    // Add logic to save the review details and close the modal
    toggleModal();
  };

  return (
    
    <SafeAreaView style={rideInfoStyles.container}>
      <Text style={rideInfoStyles.title}>{`${ride.name}`}</Text>
      <Text style={rideInfoStyles.text}>{`Dizzy Level: ${ride.rating}`}</Text>

      {isVideoLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View style={rideInfoStyles.video}>
          <YoutubePlayer
            height={176}
            width={320}
            play={false}
            videoId={ride.video}
            onReady={() => console.log('ready')}
          />
        </View>
      )}

      <Text style={rideInfoStyles.title}>{'Reviews'}</Text>

      {/* Add Review Button */}
      <Button title="Add Review" onPress={toggleModal} />

      {/* Review Form Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        {/* <View style={{}}> */}
          <ScrollView contentContainerStyle={rideInfoStyles.modalContainer} keyboardDismissMode='interactive' scrollEnabled={false}>
          <Text style={rideInfoStyles.modalTitle}>Add Review</Text>
          <Divider theme={{ colors: { primary: 'green' } }} />

          <TextInput
            placeholder="Leave Dizzy Entry Text"
            blurOnSubmit={true}
            
            multiline = {true}
            value={reviewText}
            onChangeText={(text) => setReviewText(text)}
            style={rideInfoStyles.modalReview}
          />

          <RadioButton.Item
            label="Is the ride dark?"
            value="darkRide"
            status={isDarkRide ? 'checked' : 'unchecked'}
            onPress={() => setDarkRide(!isDarkRide)}
          />

          <RadioButton.Item
            label="Does the ride have drops?"
            value="hasDrops"
            status={hasDrops ? 'checked' : 'unchecked'}
            onPress={() => setHasDrops(!hasDrops)}
          />

          
          <ToggleButton.Row onValueChange={value => setMotionRating(value || motionRating)} value={motionRating}>
            <ToggleButton icon={() => <Text>1</Text>} value="1" />
            <ToggleButton icon={() => <Text>2</Text>} value="2" />
            <ToggleButton icon={() => <Text>3</Text>} value="3" />
            <ToggleButton icon={() => <Text>4</Text>} value="4" />
            <ToggleButton icon={() => <Text>5</Text>} value="5" />
          </ToggleButton.Row>
          <View style={rideInfoStyles.addRevButton}>

            <Button title="Submit Review" onPress={handleAddReview}  />
          </View>
          </ScrollView>
        {/* </View> */}
      </Modal>
    </SafeAreaView>
  );
};


export default RideInfo;
