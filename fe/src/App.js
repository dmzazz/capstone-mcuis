import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import {Image} from 'react-native'; // Import Image component

// Import Component
import Home from './pages/home-page/Home';
import Login from './pages/Login';
import History from './pages/history-fire/History';
import Hotspot from './pages/hotspot/Hotspot';
import RuteEvacuate from './pages/rute-evacuate/RuteEvacuate';
import Profile from './pages/profile/Profile';
import EarlyWarning from './pages/early-warning/EarlyWarning';
import SelfEvacuate from './pages/self-evacuate/SelfEvacuate';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Import home icon from assets folder
const HomeIcon = require('./assets/home.png');
const NavigationIcon = require('./assets/navigation.png');
const HistoryIcon = require('./assets/history.png');
const ProfileIcon = require('./assets/profile.png');

// Navigation bar bottom
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          // Set icon based on route name
          if (route.name === 'Home') {
            iconSource = HomeIcon;
          } else if (route.name === 'RuteEvacuate') {
            iconSource = NavigationIcon;
          } else if (route.name === 'History') {
            iconSource = HistoryIcon;
          } else if (route.name === 'Profile') {
            iconSource = ProfileIcon;
          }

          // Set the tint color based on route name
          const tintColor = focused ? 'red' : color;

          // Return the icon component with adjusted tint color
          return (
            <Image
              source={iconSource}
              style={{padding: 16, width: 26, height: 24, tintColor: tintColor}}
            />
          );
        },
      })}
      // tabBarOptions={{
      //   style: {height: 90, paddingBottom: 15},
      //   labelStyle: {display: 'none'},
      // }}
    >
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="RuteEvacuate"
        component={RuteEvacuate}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

// Bottom
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
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
  );
};

export default App;
