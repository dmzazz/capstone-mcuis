import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import Logo from '../../assets/logo-icon.svg';
import ImgUser from '../../assets/img-user.svg';

const Profile = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Get Role dan Email
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedNama = await AsyncStorage.getItem('nama');
        const fetchedRole = await AsyncStorage.getItem('role');
        const fetchedEmail = await AsyncStorage.getItem('email');
        // Ensure fetched values are strings
        setNama(String(fetchedNama || ''));
        setRole(String(fetchedRole || ''));
        setEmail(String(fetchedEmail || ''));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  // Handle Change Password
  const handleChangePassword = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.put(
        'http://34.125.93.178/api/v1/change-password',
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        console.log(response.data.msg);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Password changed successfully!',
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.msg) {
        setError(error.response.data.msg);
      }
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.delete('http://34.125.93.178/api/v1/logout');
      // Hapus token sebelum navigasi ke halaman login
      await AsyncStorage.removeItem('accessToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <View className="w-11/12 mx-auto">
        <AlertNotificationRoot />
      </View>
      {/* Header */}
      <View
        className="w-full bg-white py-2 flex-row justify-between items-center"
        style={{elevation: 3}}>
        {/* Logo Icon */}
        <Logo />
      </View>

      {/* Card Change Profile */}
      <View
        className="bg-white mt-2 mx-2 py-5 items-center rounded-lg"
        style={{elevation: 5}}>
        <Text className="text-black text-lg font-bold pr-2">Profile</Text>
        <View className="flex-row mb-4">
          <View className="ml-6">
            <ImgUser width={100} height={100} />
          </View>

          <View className="justify-center ml-4">
            <Text className="text-black capitalize">{nama}</Text>
            <Text className="text-black">{email}</Text>
            <Text className="text-black capitalize">{role}</Text>
          </View>
        </View>

        <View className="items-center">
          <View className="mt-2">
            <Text className="text-black">Old Password</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Old password"
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
              placeholderTextColor="grey"
              className="w-80 h-10 pl-4 border text-black rounded-md"
            />
          </View>
          <View className="mt-2">
            <Text className="text-black">New Password</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="New password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholderTextColor="grey"
              className="w-80 h-10 pl-4 border text-black rounded-md"
            />
          </View>
          <View className="mt-2">
            <Text className="text-black">Confirm New Password</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="Confirm New password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="grey"
              className="w-80 h-10 pl-4 border text-black rounded-md"
            />
          </View>

          {/* Button Save Changes */}
          <View
            className="w-80 mt-5 rounded-lg overflow-hidden"
            style={{elevation: 5}}>
            <Button
              title="save changes"
              color="#4ECB71"
              onPress={handleChangePassword}></Button>
          </View>

          <Text className="text-red-500">{error}</Text>

          {/* Button Logout */}
          <View
            className="w-80 mt-16 rounded-lg overflow-hidden"
            style={{elevation: 5}}>
            <Button
              title="logout"
              color="#FF004D"
              onPress={() => handleLogout()}></Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default Profile;
