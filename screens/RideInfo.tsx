import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Switch, ToggleButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  reviewStyles,
  rideInfoStyles,
  viewParks,
} from '../styles/globalStyles';
import { Review, RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

type RideInfoProps = NativeStackScreenProps<RootStackParamList, 'RideInfo'>;

const RideInfo = ({ route }: RideInfoProps) => {
  const ride = route.params.ride;
  const isVideoLoading = false;
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState('');
  const [isDarkRide, setDarkRide] = useState<boolean>(false);
  const [hasDrops, setHasDrops] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [motionRating, setMotionRating] = useState('1');
  const [user, setUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<DocumentData | undefined>();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(FIREBASE_DB, 'reviews'),
        where('rideID', '==', ride.rideID),
      ),
      {
        next: (snapshot) => {
          const tempReviews: Review[] = [];
          snapshot.forEach((doc) => {
            tempReviews.push({
              ...doc.data() as Review,
              id: doc.id,
            });
          });

          setReviews(tempReviews);
        },
        error: (error) => {
          console.log(error);
        },
      },
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);

      const usersDB = collection(FIREBASE_DB, 'users');

      if (user) {
        try {
          const q = query(usersDB, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const uDoc = querySnapshot.docs[0].data();
            setUserDoc(uDoc);
          } else {
            console.log('User document not found');
          }
        } catch (error) {
          console.error('Error retrieving user document:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      headerTitleStyle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTitle: ride.name,
    });
  }, [navigation]);

  const toggleModal = () => {
    if (user) {
      setModalVisible(!isModalVisible);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleAddReview = async () => {
    setSubmit(true);

    if (motionRating == null) {
      return;
    }

    if (reviewText === '') {
      return;
    }

    await addDoc(collection(FIREBASE_DB, 'reviews'), {
      parkID: route.params.ride.park,
      rideID: route.params.ride.rideID,
      rideName: route.params.ride.name,
      email: userDoc?.email,
      username: userDoc?.displayName,
      date: new Date().toString(),
      text: reviewText,
      hasDrops: hasDrops,
      isDark: isDarkRide,
      rating: motionRating,
      upvotes: 0,
    });

    setSubmit(false);
    toggleModal();

    Toast.show('Review added!', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: '#76FF76',
    });
  };

  return (
    <SafeAreaView style={rideInfoStyles.container}>
      <Text style={rideInfoStyles.title}>{`${ride.name}`}</Text>
      <Text style={rideInfoStyles.text}>{`Dizzy Level: ${ride.rating}`}</Text>

      {isVideoLoading
        ? <ActivityIndicator size='large' color='black' />
        : (
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

      <Button title='Add Review' onPress={toggleModal} />
      <ScrollView contentContainerStyle={viewParks.container}>
        {reviews.sort((a, b) => a.date.localeCompare(b.date)).map((
          review,
        ) => (
          <View key={review.id} style={reviewStyles.reviewBox}>
            <View style={reviewStyles.wide}>
              <View style={reviewStyles.vertLeft}>
                <Text style={viewParks.title}>{review.username}</Text>
                <Text style={reviewStyles.text}>Rating: {review.rating}</Text>
              </View>
              <View style={reviewStyles.vertRight}>
                <Text style={reviewStyles.text}>
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
            <View style={reviewStyles.textContainer}>
              <Text style={reviewStyles.textContent}>{review.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <ScrollView
          contentContainerStyle={rideInfoStyles.modalContainer}
          keyboardDismissMode='interactive'
          scrollEnabled={false}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={rideInfoStyles.modalTitle}>Add Review</Text>
            <IonIcons
              name='close'
              size={25}
              color='black'
              onPress={toggleModal}
            />
          </View>

          <TextInput
            placeholder='Leave Dizzy Entry Text'
            multiline={true}
            value={reviewText}
            onChangeText={(text) => setReviewText(text)}
            style={rideInfoStyles.modalReview}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{}}>Dark?</Text>
            <Switch
              value={isDarkRide}
              onValueChange={setDarkRide}
              color='lightgreen'
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{}}>Drops?</Text>
            <Switch
              value={hasDrops}
              onValueChange={setHasDrops}
              color='lightgreen'
            />
          </View>

          <ToggleButton.Row
            onValueChange={(value) => setMotionRating(value || motionRating)}
            value={motionRating}
          >
            <ToggleButton icon={() => <Text>1</Text>} value='1' />
            <ToggleButton icon={() => <Text>2</Text>} value='2' />
            <ToggleButton icon={() => <Text>3</Text>} value='3' />
            <ToggleButton icon={() => <Text>4</Text>} value='4' />
            <ToggleButton icon={() => <Text>5</Text>} value='5' />
          </ToggleButton.Row>

          <View style={rideInfoStyles.addRevButton}>
            <Button
              title='Submit Review'
              onPress={handleAddReview}
              color='white'
            />
          </View>

          {submit && reviewText === '' && (
            <View style={rideInfoStyles.errorBox}>
              <Text style={rideInfoStyles.errorText}>
                Please enter text for your review.
              </Text>
            </View>
          )}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default RideInfo;
