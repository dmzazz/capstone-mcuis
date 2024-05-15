import React, {useEffect, useState} from 'react';
import {View, Text, Image, SectionList, Button, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Import SVG
import HeaderSvg from '../../../assets/early-warning/header.svg';
import MainSvg from '../../../assets/early-warning/main.svg';
import FooterSvg from '../../../assets/early-warning/footer.svg';

const User = ({navigation}) => {
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());
  const [alertShown, setAlertShown] = useState(false); // Tambahkan state untuk melacak apakah alert baru saja ditampilkan

  const dataItem = [
    {
      title: '1. Evacuate',
      data: [
        'Move to the evacuation page to find out the evacuation route provided by Smart Fire Evacuation',
      ],
    },
    {
      title: '2. See Hotspot',
      data: ['To find out the fire hotspots detected by the system'],
    },
    {
      title: '3. SOS',
      data: [
        'Emergency Call! Notify the fire department that there is a fire in your location',
      ],
    },
  ];

  const sendNotificationToFireFighter = async () => {
    try {
      // Menunggu hasil dari AsyncStorage untuk mendapatkan token secara asinkron
      const token = await AsyncStorage.getItem('accessToken');

      // Mengirim permintaan ke server dengan token yang diperoleh
      const response = await fetch('http://192.168.1.16:5000/api/v1/sos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firefighterId: 8, message: 'danger'}),
      });

      // Menguraikan respons dari server ke dalam format JSON
      const data = await response.json();
      console.log(data); // Cetak respons dari server

      if (response.status === 200) {
        // Alert.alert(data.message);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: data.message,
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const isNewData = confirmation_updated_at => {
    const dataTime = new Date(confirmation_updated_at).getTime();
    return dataTime > lastFetchTime;
  };

  useEffect(() => {
    const fetchNotificationMessage = async () => {
      try {
        const response = await fetch(
          'http://192.168.1.16:5000/api/v1/user/notification/3',
        );
        const notification = await response.json();
        console.log(notification);
        if (isNewData(notification.confirmation_updated_at) && !alertShown) {
          setAlertShown(true); // Setel alertShown menjadi true saat alert ditampilkan
          setLastFetchTime(Date.now()); // update data terakhir yang diambil berdasarkan waktu saat ini
          Alert.alert('Firefighter on the way to your location');
          setTimeout(() => {
            setAlertShown(false); // Setel alertShown menjadi false setelah satu detik
          }, 1000);
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
      }
    };

    // Panggil fungsi untuk memeriksa notifikasi saat komponen dipasang
    const intervalId = setInterval(fetchNotificationMessage, 1000); // Ambil setiap detik

    return () => {
      clearInterval(intervalId);
    };
  }, [alertShown]); // Tambahkan alertShown ke dependencies agar useEffect dipanggil setiap kali alertShown berubah

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#F94A29', '#F94C10', '#FF1E00']}>
        <AlertNotificationRoot />
        <View className="w-full h-full">
          {/* Header SVG*/}
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
              <View className="justify-center items-center">
                <MainSvg />
              </View>

              {/* Instructions */}
              <Text className="text-white text-lg font-bold">
                Instructions!
              </Text>
              <SectionList
                sections={dataItem}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                  <Text className="text-white">
                    {item.includes('Emergency Call') ? (
                      <>
                        <Text className="font-bold">Emergency Call</Text>{' '}
                        <Text>
                          Notify the fire department that there is a fire in
                          your location
                        </Text>
                      </>
                    ) : (
                      item
                    )}
                  </Text>
                )}
                renderSectionHeader={({section: {title}}) => (
                  <Text className="text-white mt-2">{title}</Text>
                )}
              />
            </View>

            {/* Button */}
            <View className="flex-row items-center mt-6">
              <View
                className="w-32 rounded-xl overflow-hidden"
                style={{elevation: 5}}>
                <Button
                  title="evacuate"
                  color="#4ECB71"
                  onPress={() => navigation.navigate('RuteEvacuate')}
                />
              </View>
              <TouchableOpacity onPress={() => sendNotificationToFireFighter()}>
                <Image
                  source={require('../../../assets/early-warning/sos.png')}
                  className="mx-2"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  className="w-32 rounded-xl overflow-hidden"
                  style={{elevation: 5}}>
                  <Button
                    title="see hotspot"
                    color="#FFA447"
                    onPress={() => navigation.navigate('Hotspot')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="absolute bottom-0">
            <FooterSvg />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default User;
