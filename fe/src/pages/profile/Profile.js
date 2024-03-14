import React from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Logo from '../../assets/logo-icon.svg';
import ImgUser from '../../assets/img-user.svg';

const Profile = ({navigation}) => {
  return (
    <>
      {/* Header */}
      <View
        className="w-full bg-white py-2 flex-row justify-between items-center"
        style={{elevation: 3}}>
        {/* Logo Icon */}
        <Logo />

        <Text className="text-black text-lg font-bold pr-2">
          Change Profile
        </Text>
      </View>

      {/* Card Change Profile */}
      <View
        className="bg-white flex-col items-center mt-2 mx-2 py-5 rounded-lg"
        style={{elevation: 5}}>
        <View className="mb-5">
          <ImgUser />
        </View>
        <View>
          <Text className="text-black">Username</Text>
          <TextInput
            placeholder="Username"
            defaultValue="Jabran"
            className="w-80 h-10 pl-4 border rounded-md"
          />
        </View>
        <View className="mt-2">
          <Text className="text-black">Role</Text>
          <TextInput
            placeholder="User"
            defaultValue="User"
            className="w-80 h-10 pl-4 border rounded-md"
          />
        </View>
        <View className="mt-2">
          <Text className="text-black">New Password</Text>
          <TextInput
            placeholder="New password"
            className="w-80 h-10 pl-4 border rounded-md"
          />
        </View>

        {/* Button Save Changes */}
        <View
          className="w-80 mt-5 rounded-lg overflow-hidden"
          style={{elevation: 5}}>
          <Button title="save changes" color="#4ECB71"></Button>
        </View>

        {/* Button Logout */}
        <View
          className="w-80 mt-16 rounded-lg overflow-hidden"
          style={{elevation: 5}}>
          <Button
            title="logout"
            color="#FF004D"
            onPress={() => navigation.navigate('Login')}></Button>
        </View>
      </View>
    </>
  );
};

export default Profile;
