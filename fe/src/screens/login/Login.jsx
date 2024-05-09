import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

// Import axios
import axios from 'axios';

import jwt_decode from 'jwt-decode';

// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Image
import HeaderImage from '../../assets/header.svg';
import FooterImage from '../../assets/footer.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Handle Lpgin
  const handleSubmit = async () => {
    try {
      // Validate email and password inputs
      if (!email || !password) {
        setError('Email dan password harus diisi.');
        return;
      }

      // Regex email validation
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        setError('Format email tidak valid.');
        return;
      }

      setLoading(true);

      // No need for Authorization header in login request
      const response = await axios.post(
        'http://192.168.1.10:5000/api/v1/login',
        {
          email,
          password,
        },
      );

      if (response.status === 200) {
        // Assuming you want to save the accessToken here
        AsyncStorage.setItem('accessToken', response.data.accessToken);
        AsyncStorage.setItem('nama', response.data.nama);
        AsyncStorage.setItem('email', response.data.email);
        AsyncStorage.setItem('role', response.data.role);
        console.log(response.data.accessToken);

        // Handle successful login
        navigation.navigate('Main');

        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setLoading(false);

      // Checking if the error is due to an Axios error and displaying the custom message
      if (error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        // For unexpected errors that might not follow the structure we anticipate
        setError('An error occurred. Please try again later.');
      }
    }
  };

  useEffect(() => {
    // Cleanup
    return () => {
      setError('');
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View className="relative flex-1 justify-center items-center">
        {/* Use HeaderImage component */}
        <HeaderImage style={styles.headerImage} />
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text className="text-lg mb-6">Welcome, please log in first!</Text>

        {error && <Text className="text-red-500">{error}</Text>}

        <View className="w-4/5 mb-2 flex-row items-center border rounded-lg">
          <Image
            source={require('../../assets/username.png')}
            className="ml-4"
          />
          <TextInput
            placeholder="Input email"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            className="px-2 py-2"
          />
        </View>

        <View className="w-4/5 mb-2 flex-row items-center border rounded-lg">
          <Image
            source={require('../../assets/password.png')}
            className="ml-4"
          />
          <TextInput
            placeholder="Input password"
            autoCapitalize="none"
            autoComplete="current-password"
            secureTextEntry={true}
            value={password}
            className="px-2 py-2"
            onChangeText={setPassword}
          />
        </View>

        <Text className="my-4">
          Don't have an account?{' '}
          <Text className="text-[#FFA447] font-bold">Register</Text> now
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-4/5"
          onPress={() => handleSubmit()}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FB0000', '#FFD233']}
            style={styles.linearGradient}>
            <Text className="text-white text-center p-3">Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* Use FooterImage component */}
        <FooterImage style={styles.footerImage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: '80%',
    height: '20%',
    resizeMode: 'stretch',
    marginTop: -10,
    marginBottom: 50,
  },
  linearGradient: {
    borderRadius: 5,
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1
  },
});

export default Login;
