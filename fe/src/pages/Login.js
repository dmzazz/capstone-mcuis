// Import the necessary modules
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

// Import SVG
import HeaderImage from '../assets/header.svg';
import FooterImage from '../assets/footer.svg';

// Define the Login component
const Login = ({navigation}) => {
  // Define styles using StyleSheet.create outside of the component
  const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   position: 'relative',
    // },
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

  // Render the component
  return (
    <>
      <View className="relative flex flex-1 justify-center items-center">
        {/* Use HeaderImage component */}
        <HeaderImage style={styles.headerImage} />
        {/* Use Image component */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text className="text-[16px] mb-2">Welcome, please log in first!</Text>

        <View style={styles.textInputContainer}>
          <Image
            source={require('../assets/username.png')}
            style={styles.textInputIcon}
          />
          <TextInput placeholder="Input username" style={styles.textInput} />
        </View>

        <View style={styles.textInputContainer}>
          <Image
            source={require('../assets/password.png')}
            style={styles.textInputIcon}
          />
          <TextInput
            placeholder="Input password"
            style={styles.textInput}
            secureTextEntry={true}
          />
        </View>

        {/* <Text style={{marginTop: 15, marginBottom: 15}}>
        Don't have an account?{' '}
        <Text style={{color: '#FFA447', fontWeight: 'bold'}}>Register</Text> now
      </Text> */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={{width: '80%'}}
          onPress={() => navigation.navigate('Main')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FB0000', '#FFD233']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Use FooterImage component */}
        <FooterImage style={styles.footerImage} />
      </View>
    </>
  );
};

// Export the Login component
export default Login;
