import React from 'react';
import {Button, Image, Text, View} from 'react-native';

// Import SVG
import HeaderImageMain from '../../assets/header-main.svg';

const RuteEvacuate = ({navigation}) => {
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
            <Text className="text-black font-bold ml-1">Cikarang</Text>
          </View>
        </View>
      </View>

      {/* Main */}
      <View className="mx-2">
        <Text className="text-black font-bold ml-4 mb-2">Evacuate route</Text>

        <Image
          source={require('../../assets/fire-location-map.png')}
          className="w-full"
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
