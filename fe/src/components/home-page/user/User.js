import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {getCurrentTime} from '../../../utils/dateUtils';

// Import component
import {AllowPermission} from '../../allow-permission/AllowPermission';
import {CarouselSelfEvacuation} from '../../components/carousel/CarouselSelfEvacuation';
import AlertUser from '../../alert-user/AlertUser';
import HeaderHome from '../../header-home/HeaderHome';

// Import SVG
import HeaderImageMain from '../../../assets/header-main.svg';
import CarouselCardItem from '../../carousel/CarouselCardItem';
import axios from 'axios';

const User = ({navigation}) => {
  const [status, setStatus] = useState('normal');
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());
  const [showAlert, setShowAlert] = useState(false);

  const [currentTime, setCurrentTime] = useState('');

  // Untuk menemukan apakah data baru berdasarkan waktu saat ini
  const isNewData = createdAt => {
    const dataTime = new Date(createdAt).getTime();
    return dataTime > lastFetchTime;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get('http://192.168.1.28:5000/api/v1/sensor/')
        .then(response => {
          const data = response.data.data;
          if (data.length > 0) {
            const latestData = data[data.length - 1]; // assuming the latest data is at the end
            if (isNewData(latestData.createdAt)) {
              setLastFetchTime(Date.now()); // update data terakhir yang diambil berdasarkan waktu saat ini
              setStatus(latestData.status); // update status berdasarkan data terakhir
            }
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, 1000); // fetch every second

    if (status === 'danger') {
      alertTimeout = setTimeout(() => {
        setShowAlert(true);
      }, 5000); // Display alert after 5 seconds
    }

    const timeout = setTimeout(() => {
      setStatus('normal'); // Kembali ke status normal jika tidak ada data terbaru
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [status]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime()); // Gunakan utilitas getCurrentTime
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to render image and text based on status
  const renderStatus = () => {
    let statusTitle, statusIcon, statusText, imageSource, statusTitleColor;
    switch (status) {
      case 'normal':
        statusTitle = 'Normal';
        statusTitleColor = 'text-green-500';
        statusIcon = require('../../../assets/smile-icon.png');
        statusText = 'Situation is safe, have a nice day';
        imageSource = require('../../../assets/situation/normal.png');
        break;
      case 'attention':
        statusTitle = 'Attention';
        statusTitleColor = 'text-yellow-500';
        statusIcon = require('../../../assets/attention-icon.png');
        statusText = 'Smoke detected, please be careful';
        imageSource = require('../../../assets/situation/attention.png');
        break;
      case 'danger':
        statusTitle = 'Danger';
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
              onPress={() => navigation.navigate('EarlyWarning')}>
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
