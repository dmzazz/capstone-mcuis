import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';

const HeaderHome = () => {
  const [status, setStatus] = useState('normal');
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return '#4ECB71'; // Green
      case 'attention':
        return '#FFD700'; // Yellow
      case 'danger':
        return '#FF0000'; // Red
      default:
        return '#000000'; // Black (fallback)
    }
  };
  return (
    <View className="w-full bg-white pt-10 pb-5">
      <View className="flex-row items-center">
        {/* Logo Icon */}
        <Image
          source={require('../../assets/logo-icon.png')}
          className="w-12 h-12"
        />
        {/* Text Welcome */}
        <View className="flex-col">
          <Text className="text-lg font-bold text-black">
            Hi, Welcome <Text style={{color: getStatusColor()}}>Wendy</Text>
          </Text>
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
  );
};

export default HeaderHome;
