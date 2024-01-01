import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const Home = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <FadeInView style={globalStyles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Motion APP
          </Text>
          <Text style={{ fontSize: 30, color: 'black' }}>
            Welcome to Motion
          </Text>
        </View>
        <Image
          style={{ width: 200, height: 200, borderRadius: 20 }}
          source={{
            uri: 'https://media1.tenor.com/m/u28GHpki8VgAAAAd/cat-walking.gif',
          }}
        />
      </FadeInView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userIconContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    padding: 10,
    borderRadius: 20,
  },
  titleContainer: {
    marginTop: 50,
    borderWidth: 3, // Set the border width
    borderColor: 'darkgray', // Set the border color
    borderRadius: 10, // Set the border radius
    padding: 20,
    backgroundColor: colors.tabBar,
    marginBottom: 20, // Add some space between the title and the next text
  },
  titleText: {
    fontSize: 50,
    color: 'black',
  },
});

export default Home;
