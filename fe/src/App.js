import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {decode as base64Decode} from 'base-64';

// Import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Component
import Login from './screens/login/Login';
import Hotspot from './screens/hotspot/Hotspot';
import EarlyWarning from './screens/early-warning/EarlyWarning';
import RuteEvacuate from './screens/rute-evacuate/RuteEvacuate';
import SelfEvacuate from './screens/self-evacuate/SelfEvacuate';
import BottomNav from './navigation/BottomNav';

const Stack = createNativeStackNavigator();

// Bottom
const App = () => {
  const [auth, setAuth] = useState('false');
  //   useEffect(() => {
  //     const fetchAccessToken = async () => {
  //       try {
  //         const accessToken = await AsyncStorage.getItem('accessToken');
  //         if (accessToken) {
  //           // Decode accessToken to check for expiration time
  //           const tokenData = parseJwt(accessToken);
  //           if (tokenData.exp * 1000 < Date.now()) {
  //             // If the accessToken has expired, redirect to the login page
  //             navigation.navigate('Login');
  //           } else {
  //             // setIsLoading(false);
  //           }
  //         } else {
  //           // setIsLoading(false); // Set loading to false when there's no accessToken
  //         }
  //       } catch (error) {
  //         console.error('Error fetching accessToken:', error);
  //         // Handle error fetching accessToken
  //       }
  //     };

  //     fetchAccessToken();
  //   }, []);

  // // Fungsi untuk mendekode accessToken JWT
  // const parseJwt = (accessToken) => {
  //   const base64Url = accessToken.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(
  //     base64Decode(base64)
  //       .split('')
  //       .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
  //       .join('')
  //   );
  //   return JSON.parse(jsonPayload);
  // };

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={BottomNav}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RuteEvacuate"
            component={RuteEvacuate}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EarlyWarning"
            component={EarlyWarning}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Hotspot"
            component={Hotspot}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelfEvacuate"
            component={SelfEvacuate}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
