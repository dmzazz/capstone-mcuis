import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/home-page/Home';
import History from '../screens/history-fire/History';
import Profile from '../screens/profile/Profile';
import {Image} from 'react-native';

// Import home icon from assets folder
const HomeIcon = require('../assets/home.png');
const NavigationIcon = require('../assets/navigation.png');
const HistoryIcon = require('../assets/history.png');
const ProfileIcon = require('../assets/profile.png');

// Navigation bar bottom
const BottomNav = () => {
  const Tab = createBottomTabNavigator();
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
              style={{padding: 18, width: 26, height: 24, tintColor: tintColor}}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
