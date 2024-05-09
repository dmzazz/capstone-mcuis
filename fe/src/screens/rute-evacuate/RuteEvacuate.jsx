import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Import SVG
import HeaderImageMain from '../../assets/header-main.svg';

const RuteEvacuate = ({navigation}) => {
  const [city, setCity] = useState('');

  const allowPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        await getCity(latitude, longitude); // Memanggil getCity setelah mendapatkan koordinat
        // console.log(latitude, longitude);
      },
      error => Alert.alert('Error', error.message),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
        interval: 100,
      },
    );
  };

  const getCity = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      );
      const json = await response.json();
      // console.log(json);
      if (json.error) {
        console.error('Error fetching city:', json.error);
        setCity('City not found');
      } else {
        // Extract city name from the response
        const cityName =
          json.address.city ||
          json.address.town ||
          json.address.village ||
          json.address.hamlet ||
          'Unknown';
        setCity(cityName);
      }
    } catch (error) {
      console.error('Error fetching city:', error);
      setCity('City not found');
    }
  };

  useEffect(() => {
    // Menampilkan nama
    const fetchName = async () => {
      try {
        const nama = await AsyncStorage.getItem('nama');
        setNama(nama);
      } catch (error) {
        console.log(error);
      }
    };
    fetchName();
    allowPermission();
  }, []);
  return (
    <>
      {/* Background Header */}
      <View className="absolute z-50">
        <HeaderImageMain className="top-0 " />
      </View>

      {/* Header */}
      <View className="w-full pt-10 pb-5">
        <View className="flex-row items-center">
          {/* Logo Icon */}
          <Image
            source={require('../../assets/logo-icon.png')}
            className="w-12 h-12"
          />
          {/* Text Welcome */}
          <View className="flex-col">
            <Text className="text-lg font-bold text-black">Don't panic</Text>
            <Text className="mt-[-5px]">beware of fire</Text>
          </View>

          {/* Location */}
          <View
            className="bg-white absolute right-5 flex-row items-center p-2 rounded-lg"
            style={{elevation: 5}}>
            <Image source={require('../../assets/location-icon.png')} />
            <Text className="text-black font-bold ml-1">{city}</Text>
          </View>
        </View>
      </View>

      {/* Main */}
      <View className="mx-2">
        <Text className="text-black font-bold ml-4 mb-2">Evacuate route</Text>

        <Image
          source={require('../../assets/route-evacuation.png')}
          style={{width: '100%', height: 200}}
        />
        <View className="mt-4 rounded-lg overflow-hidden">
          <Button
            title="back to home"
            color="#4ECB71"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    </>
  );
};

export default RuteEvacuate;
