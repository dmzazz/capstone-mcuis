import React from 'react';
import {Button, Image, Text, View} from 'react-native';

// Import SVG
import HeaderImageMain from '../../assets/header-main.svg';
import HeaderHome from '../../components/header/Header.jsx';

const Hotspots = ({navigation}) => {
  return (
    <>
      {/* Background Header */}
      <View style={{position: 'absolute', zIndex: 50}}>
        <HeaderImageMain style={{top: 0}} />
      </View>

      {/* Header */}
      <HeaderHome />

      {/* Main */}
      <View style={{marginHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            marginLeft: 10,
            marginBottom: 5,
          }}>
          See Hotspots
        </Text>

        <Image
          source={require('../../assets/hotspots-map.png')}
          style={{width: '100%', height: 200}}
        />

        <View style={{marginTop: 10, borderRadius: 10, overflow: 'hidden'}}>
          <Button
            title="Evacuate Now"
            color="#4ECB71"
            onPress={() => navigation.navigate('RuteEvacuate')}
          />
        </View>
      </View>
    </>
  );
};

export default Hotspots;
