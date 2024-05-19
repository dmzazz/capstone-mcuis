import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

// Icon SVG
import LogoImage from '../../../assets/logo-icon.svg';
import TopLeft from '../../../assets/self-evacuation/top-left.svg';
import TopRight from '../../../assets/self-evacuation/top-right.svg';
import BottomLeft from '../../../assets/self-evacuation/bottom-left.svg';

// Icon step
import StepOne from '../../../assets/self-evacuation/step-one.svg';
import StepTwo from '../../../assets/self-evacuation/step-two.svg';
import StepThree from '../../../assets/self-evacuation/step-three.svg';
import StepFour from '../../../assets/self-evacuation/step-four.svg';
import StepFive from '../../../assets/self-evacuation/step-five.svg';
import AlertFireFighter from '../../alert-fire-fighter/AlertFireFighter';

const FireFighter = ({navigation}) => {
  const steps = [
    {icon: <StepOne width={40} height={40} />, text: 'Stay Calm'},
    {icon: <StepTwo width={40} height={40} />, text: 'Notification appears'},
    {
      icon: <StepThree width={40} height={40} />,
      text: 'You will redirected to the confirmation page',
    },
    {icon: <StepFour width={40} height={40} />, text: 'Confirm'},
    {
      icon: <StepFive width={40} height={40} />,
      text: 'Confirmation send to user',
    },
  ];

  const [showAlert, setShowAlert] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());

  const isNewData = updatedAt => {
    const dataTime = new Date(updatedAt).getTime();
    return dataTime > lastFetchTime;
  };

  useEffect(() => {
    const fetchNotificationMessage = async () => {
      try {
        const response = await fetch(
          'http://34.125.93.178/api/v1/firefighter/notification/1',
        );
        const notification = await response.json();
        // console.log(notification);
        if (isNewData(notification.updatedAt)) {
          setLastFetchTime(Date.now()); // update data terakhir yang diambil berdasarkan waktu saat ini
          setShowAlert(true); // update status berdasarkan data terakhir
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
      }
    };

    // Call the function to check for notifications when the component mounts
    const intervalId = setInterval(fetchNotificationMessage, 1000); // Fetch every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <View>
        <View className="bg-white relative">
          {/* Vector */}
          <View className="absolute top-5 left-5">
            <TopLeft />
          </View>
          <View className="absolute top-5 right-5">
            <TopRight />
          </View>
          <View className="absolute bottom-5 left-5">
            <BottomLeft />
          </View>
          <View className="absolute bottom-0 right-0">
            <Image
              source={require('../../../assets/self-evacuation/animation.gif')}
              className="w-20 h-20"
            />
          </View>

          {/* Logo main */}
          <View className="justify-center items-center">
            <LogoImage width={400} height={250} />
          </View>
        </View>

        {/* Step by step */}
        <View className="bg-white h-full mt-4">
          <View className="flex-row items-center justify-between mx-4 mt-2">
            <Text className="text-black font-bold">
              Steps for self-evacuation
            </Text>
          </View>
          <View className="mt-4 items-center">
            {steps.map((step, index) => (
              <View
                key={index}
                className="bg-white w-80 mb-4 px-10 py-3 flex-row items-center rounded-lg"
                style={{elevation: 5}}>
                {step.icon}
                <Text className="ml-2 text-black font-bold">{step.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {showAlert && <AlertFireFighter navigation={navigation} />}
    </>
  );
};

export default FireFighter;
