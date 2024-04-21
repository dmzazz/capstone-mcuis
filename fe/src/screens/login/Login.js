import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
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

  // Json
  const [loggedInUser, setLoggedInUser] = useState();

  // Refresh Token
  const [accessToken, setAccessToken] = useState('');
  const [expire, setExpire] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedInStatus = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        navigation.navigate('Main'); // Navigate to main screen if user is already logged in
      }
    };
    checkLoggedInStatus();
  }, []);

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  // const refreshToken = async () => {
  //   try {
  //     const accessToken = AsyncStorage.getItem('accessToken');
  //     const response = await axios.get(
  //       'http://10.127.12.199:5000/api/v1/users',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //     // console.log(response);
  //     setAccessToken(response.data.accessToken);
  //     const decoded = jwt_decode(response.data.accessToken);
  //     setExpire(decoded.exp);
  //     navigation.navigate('Main');
  //   } catch (error) {
  //     if (error.response) {
  //       navigation.navigate('Login');
  //     }
  //   }
  // };

  // const axiosJWT = axios.create();

  // axiosJWT.interceptors.request.use(
  //   async config => {
  //     const currentDate = new currentDate();
  //     if (expire * 1000 < currentDate.getTime()) {
  //       const response = await axios.get(
  //         'http://10.127.12.199:5000/api/v1/users',
  //       );
  //       config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  //       setAccessToken(response.data.accessToken);
  //       const decoded = jwt_decode(response.data.accessToken);
  //       setExpire(decoded.exp);
  //     }
  //     return config;
  //   },
  //   error => {
  //     return Promise.reject(error);
  //   },
  // );

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
        'http://10.127.12.199:5000/api/v1/login',
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
    <View style={styles.container}>
      {/* Use HeaderImage component */}
      <HeaderImage style={styles.headerImage} />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={{fontSize: 18, marginBottom: 15}}>
        Welcome, please log in first!
      </Text>

      {error && <Text style={{color: 'red'}}>{error}</Text>}

      <View style={styles.textInputContainer}>
        <Image
          source={require('../../assets/username.png')}
          style={styles.textInputIcon}
        />
        <TextInput
          placeholder="Input email"
          style={styles.textInput}
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Image
          source={require('../../assets/password.png')}
          style={styles.textInputIcon}
        />
        <TextInput
          placeholder="Input password"
          style={styles.textInput}
          autoCapitalize="none"
          autoComplete="current-password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Text style={{marginTop: 15, marginBottom: 15}}>
        Don't have an account?{' '}
        <Text style={{color: '#FFA447', fontWeight: 'bold'}}>Register</Text> now
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{width: '80%'}}
        onPress={() => handleSubmit()}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FB0000', '#FFD233']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* 
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.buttonText}>Login</Text>
      )} */}
      {/* Use FooterImage component */}
      <FooterImage style={styles.footerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
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
  textInputContainer: {
    width: '80%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  textInputIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  linearGradient: {
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Login;
