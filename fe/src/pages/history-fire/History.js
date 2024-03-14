import React from 'react';
import {ScrollView, View} from 'react-native';

// Import component
import Card from '../../components/card/Card';
import HeaderHistory from '../../components/header-history/HeaderHistory';

// Import vector
import BackgroundRight from '../../assets/history/background-right.svg';
import BackgroundLeft from '../../assets/history/background-left.svg';

const History = () => {
  const data = [
    {
      status: 'Attention',
      time: '07:59 pm',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '08:15 am',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '10:30 am',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '12:45 pm',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '02:00 pm',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '04:20 pm',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '06:10 pm',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '09:00 am',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '11:25 am',
      smoke: 'detected',
      fire: 'not detected',
    },
    {
      status: 'Attention',
      time: '03:55 pm',
      smoke: 'detected',
      fire: 'not detected',
    },
  ];
  return (
    <>
      <View className="bg-white">
        {/* Background Vector */}
        <View className="absolute top-56 right-0">
          <BackgroundRight />
        </View>
        <View className="absolute top-32">
          <BackgroundLeft />
        </View>

        {/* Header */}
        <HeaderHistory />
        {/* Main */}
        <ScrollView className="mt-4 mb-20 z-50">
          <View className="items-center">
            {data.map((item, index) => (
              <Card
                key={index}
                status={item.status}
                time={item.time}
                smoke={item.smoke}
                fire={item.fire}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default History;
