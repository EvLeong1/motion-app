import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_DB } from '../FirebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Review, RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { globalStyles, viewParks, reviewStyles } from '../styles/globalStyles';
import { User } from 'firebase/auth';

type MyReviewsProps = NativeStackScreenProps<RootStackParamList, 'MyReviews'>

const MyReviews = ({ route, navigation } : MyReviewsProps) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  const user : User = route.params.user;

  // This hook is unfinished because I do not think we have any Review storing functionality
  // in Firebase yet, but the query should be structured as follows:
  React.useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(FIREBASE_DB, 'reviews'), where('email', '==', user.email)), {
      next: (snapshot) => {
        const tempReviews: Review[] = [];
        snapshot.forEach((doc) => {
          tempReviews.push({
            ...doc.data() as Review,
          });
        });

        setReviews(tempReviews);
        setLoading(false);
      },
      error: (error) => {
        console.log(error);
        setLoading(false);
      },
    });
    return () => unsubscribe();
  }, []);

  const Reviews = () => {
    let content : JSX.Element[] = new Array<JSX.Element>();
    reviews.forEach( (review) => {
      
      // const revDate = new Date(review.date);

      content.push(

        // The review objects only hold parkID and rideID, so
        // there may need to be additional database queries to
        // display the corresponding park and ride names

        // Also, we can add more content like a hyperlink to the actual
        // ride's page and/or an image, but I just went with the basics for now

        <View key={review.rideID} style={reviewStyles.reviewBox}>
          <View style={reviewStyles.wide}>
            <View style={reviewStyles.vertLeft}>
              <Text style={viewParks.title}>{review.rideName}</Text>
              <Text style={reviewStyles.text}>{review.parkID}</Text>
            </View>
            <View style={reviewStyles.vertRight}>
              <Text style={reviewStyles.text}>{new Date(review.date).toLocaleDateString()}</Text>
              <Text style={reviewStyles.text}>Rating: {review.rating}</Text>
            </View>
          </View>
          <View style={reviewStyles.textContainer}>
            <Text style={reviewStyles.textContent}>{review.text}</Text>
          </View>
        </View>

      )
    })

    return content;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading ? 
        (
          <View style={viewParks.loadingContainer}>
            <ActivityIndicator size='large' color='black' />
          </View>
        )
        : (
          <ScrollView contentContainerStyle={viewParks.container} >

            {/* Reviews component will render all of a user's reviews */}
            <Reviews />

            {/* Below is a hard-coded example of how reviews will appear (it can be deleted) */}

            <View key="Small World" style={reviewStyles.reviewBox}>
              <View style={reviewStyles.wide}>
                <View style={reviewStyles.vertLeft}>
                  <Text style={viewParks.title}>Small World</Text>
                  <Text style={reviewStyles.text}>Disneyland</Text>
                </View>
                <View style={reviewStyles.vertRight}>
                  <Text style={reviewStyles.text}>December 21, 2023</Text>
                  <Text style={reviewStyles.text}>Rating: 5</Text>
                </View>
              </View>
              <View style={reviewStyles.textContainer}>
                <Text style={reviewStyles.textContent}>Ride was really fun but I threw
                  up 45 times afterward. I would not recommend this ride to people with
                  motion sickness.
                </Text>
              </View>
            </View>

            <View key="Cars Ride" style={reviewStyles.reviewBox}>
              <View style={reviewStyles.wide}>
                <View style={reviewStyles.vertLeft}>
                  <Text style={viewParks.title}>Cars Ride</Text>
                  <Text style={reviewStyles.text}>Disneyland</Text>
                </View>
                <View style={reviewStyles.vertRight}>
                  <Text style={reviewStyles.text}>December 22, 2021</Text>
                  <Text style={reviewStyles.text}>Rating: 3</Text>
                </View>
              </View>
              <View style={reviewStyles.textContainer}>
                <Text style={reviewStyles.textContent}>
                  I love this ride so much I like when I race the other car but I never
                  win and sometimes I get really mad and I have to take out my anger on
                  my Winnie the Pooh plushie. Definitely recommend this ride to people with
                  motion sickness.
                </Text>
              </View>
            </View>
            {/* END OF HARD-CODE EXAMPLE */}

          </ScrollView>
        )
      }
    </SafeAreaView>
  )
}

export default MyReviews;
