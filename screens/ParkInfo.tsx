import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type ParkInfoProps = NativeStackScreenProps<RootStackParamList, 'ParkInfo'>;

const ParkInfo = ({ route, navigation }: ParkInfoProps) => {
  const park = route.params.park;
  return (
    <View>
      <Text>{`Park name: ${park.name}`}</Text>
      <Text>{`Park id: ${park.id}`}</Text>
      <Text>{`Park location: ${park.location}`}</Text>
    </View>
  );
};

export default ParkInfo;
