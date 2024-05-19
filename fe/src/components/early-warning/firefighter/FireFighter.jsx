import React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Linking,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

// Import SVG
import HeaderSvg from '../../../assets/early-warning/header.svg';
import FooterSvg from '../../../assets/early-warning/footer.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FireFighter = () => {
  const handleSendConfirmation = async () => {
    try {
      // Menunggu hasil dari AsyncStorage untuk mendapatkan token secara asinkron
      const token = await AsyncStorage.getItem('accessToken');

      const response = await fetch(
        'http://34.125.93.178/api/v1/firefighter/confirmation/1',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({confirmation_status: 'confirmed'}),
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(data); // Cetak respons dari server
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: data.message,
        });
      } else {
        console.error('Failed to send confirmation');
      }
    } catch (error) {
      console.error('Error sending confirmation:', error);
    }
  };

  const openGoogleMaps = () => {
    const latitude = -6.278706171299003; // Static latitude value
    const longitude = 107.17729323741403; // Static longitude value
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#F94A29', '#F94C10', '#FF1E00']}>
      <AlertNotificationRoot />
      <View className="w-full h-full">
        {/* Header SVG */}
        <HeaderSvg />

        {/* Header */}
        <View className="flex-row">
          <Image
            source={require('../../../assets/logo-icon.png')}
            className="w-12 h-12"
          />
          <View>
            <Text className="text-white text-xl font-bold">
              Danger, there is a fire!!!
            </Text>
            <Text className="text-black font-bold">Emergency Situation</Text>
          </View>
        </View>

        {/* Container */}
        <View className="mx-4">
          {/* Main */}
          <View>
            {/* Main Image */}
            <TouchableOpacity
              onPress={openGoogleMaps}
              className="justify-center items-center">
              <Image
                source={require('../../../assets/map-firefighter.jpg')}
                className="w-full h-52 mt-2"
              />
            </TouchableOpacity>

            {/* Instructions */}
            <Text className="text-white text-lg font-bold">Instructions!</Text>
            <Text className="text-white">
              Click below to notify the user that the fire brigade is heading to
              the fire location
            </Text>
          </View>

          {/* Button */}
          <View className="flex-row items-center mt-6">
            <View
              className="w-full rounded-xl overflow-hidden"
              style={{elevation: 5}}>
              <Button
                title="Confirmation"
                color="#4ECB71"
                onPress={handleSendConfirmation}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="absolute bottom-0">
          <FooterSvg />
        </View>
      </View>
    </LinearGradient>
  );
};

export default FireFighter;
