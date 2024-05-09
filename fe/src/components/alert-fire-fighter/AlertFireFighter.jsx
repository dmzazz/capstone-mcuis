import React, {useEffect, useState} from 'react';
import {View, Modal, Text} from 'react-native';

const AlertFireFighter = ({navigation}) => {
  const [countdown, setCountdown] = useState(3); // State untuk menyimpan countdown

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      // Mengurangi countdown setiap detik
      setCountdown(prevCount => prevCount - 1);
    }, 1000); // Interval setiap 1 detik

    // Membersihkan timer ketika countdown mencapai 0
    if (countdown === 0) {
      clearInterval(redirectTimer);
      navigation.navigate('EarlyWarning'); // Redirect ke halaman confirmation
    }

    // Membersihkan timer ketika komponen unmount
    return () => clearInterval(redirectTimer);
  }, [countdown, navigation]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      statusBarTranslucent={true}>
      <View
        className="flex-1 items-center"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View
          className="bg-white w-[95%] mt-16 p-2 rounded-lg"
          style={{elevation: 5}}>
          <View className="flex-row items-center">
            <Text className="text-red-500 text-lg font-bold mr-1 mb-2">
              Danger!
            </Text>
          </View>
          <Text className="text-black">
            You will be redirected to the user location page within {countdown}{' '}
            seconds
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default AlertFireFighter;
