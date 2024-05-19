import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {getCurrentTime} from '../../../utils/dateUtils.js';

// Import component
import AlertUser from '../../alert-user/AlertUser.jsx';
import CarouselCardItem from '../../carousel/CarouselCardItem.jsx';
import HeaderHome from '../../header/Header.jsx';

// Import SVG
import HeaderImageMain from '../../../assets/header-main.svg';

const User = ({navigation}) => {
  const [status, setStatus] = useState('Normal');
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());
  const [showAlert, setShowAlert] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  const isNewData = createdAt => {
    const dataTime = new Date(createdAt).getTime();
    return dataTime > lastFetchTime;
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
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
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => console.error('Error fetching location:', error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    requestLocationPermission();

    const interval = setInterval(() => {
      axios
        .get('http://34.125.93.178/api/v1/sensor/')
        .then(response => {
          const data = response.data.data;
          if (data.length > 0) {
            const latestData = data[data.length - 1];
            if (isNewData(latestData.createdAt)) {
              setLastFetchTime(Date.now());
              setStatus(latestData.status);
              console.log(latestData.status);
            }
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, 1000);

    if (status === 'Danger') {
      setTimeout(() => {
        setShowAlert(true);
      }, 5000);
    }

    const timeout = setTimeout(() => {
      setStatus('Normal');
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [status]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderStatus = () => {
    let statusTitle, statusIcon, statusText, imageSource, statusTitleColor;
    switch (status) {
      case 'Normal':
        statusTitle = 'normal';
        statusTitleColor = 'text-green-500';
        statusIcon = require('../../../assets/smile-icon.png');
        statusText = 'Situation is safe, have a nice day';
        imageSource = require('../../../assets/situation/normal.png');
        break;
      case 'Attention':
        statusTitle = 'attention';
        statusTitleColor = 'text-yellow-500';
        statusIcon = require('../../../assets/attention-icon.png');
        statusText = 'Smoke detected, please be careful';
        imageSource = require('../../../assets/situation/attention.png');
        break;
      case 'Danger':
        statusTitle = 'danger';
        statusTitleColor = 'text-red-500';
        statusIcon = require('../../../assets/danger-icon.png');
        statusText = 'Fire detected, evacuate immediately.';
        imageSource = require('../../../assets/situation/danger.png');
        break;
      default:
        return null;
    }

    return (
      <>
        <View className="flex-row">
          <View className="w-4/12 justify-between">
            <View className="mb-4">
              <View className="flex-row mt-2">
                <Text className={`${statusTitleColor} text-2xl font-bold`}>
                  {statusTitle}
                </Text>
                <Image source={statusIcon} className="ml-1 mt-2" />
              </View>
              <View className="min-w-[150]">
                <Text>{currentTime}</Text>
              </View>
            </View>
            <View className="bg-[#FFCF96] min-w-[150] mb-4 p-1.5 rounded-lg">
              <Text className="text-black">{statusText}</Text>
            </View>
          </View>

          <View className={`${status === 'danger' ? 'ml-14' : 'ml-10'}`}>
            <Image source={imageSource} style={{width: 200}} />
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View className="relative">
        {/* Background Header */}
        <View className="absolute z-50">
          <HeaderImageMain className="top-0 " />
        </View>
        {/* Header */}
        <HeaderHome />
        {/* Banner */}
        <View className="w-full bg-white px-4 py-5" style={{elevation: 2}}>
          {renderStatus()}
        </View>
        {/* Self Evacuation */}
        <Text className="text-black text-xl font-bold ml-2 mt-5 mb-1">
          Self Evacuation
        </Text>
        <View className="bg-white h-full px-2 py-3" style={{elevation: 2}}>
          <Text className="text-black text-center">Step-by-step</Text>
          <Text className="text-black">
            <Text
              className="text-[#FFD233]"
              onPress={() => navigation.navigate('SelfEvacuate')}>
              Click here
            </Text>{' '}
            to see details
          </Text>

          {/* Carousel */}
          <CarouselCardItem />
        </View>
        {/* Modal Allow Permission */}
        {/* <View className="flex-1 justify-center items-center">
          <AllowPermission
            modalVisible={modalVisible}
            closeModal={closeModal}
          />
        </View> */}
        {/* Alert
        Jika status danger tampilkan Alert User */}
        {showAlert && <AlertUser navigation={navigation} />}
      </View>
    </>
  );
};

export default User;
