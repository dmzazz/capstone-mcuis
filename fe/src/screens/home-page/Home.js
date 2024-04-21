import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import component
import User from '../../components/home-page/user/User';
import FireFighter from '../../components/home-page/firefighter/FireFighter';

const Home = ({navigation}) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const role = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        setRole(role); // Perbarui state role
      } catch (error) {
        console.error(error);
      }
    };
    role();
  }, []);

  useEffect(() => {
    const token = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        navigation.navigate('Login'); // Redirect ke screen login ketika tidak ada token
      }
    };
    token();
  }, []);

  return (
    <>
      {role === 'user' && <User navigation={navigation} />}
      {role === 'firefighter' && <FireFighter navigation={navigation} />}
    </>
  );
};

export default Home;
