import React from 'react';
import {View, Text, Image, FlatList, SectionList, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Import SVG
import HeaderSvg from '../../assets/early-warning/header.svg';
import MainSvg from '../../assets/early-warning/main.svg';
import FooterSvg from '../../assets/early-warning/footer.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const dataItem = [
  {
    title: '1. Evacuate',
    data: [
      'Move to the evacuation page to find out the evacuation route provided by Smart Fire Evacuation',
    ],
  },
  {
    title: '2. See Hotspot',
    data: ['To find out the fire hotspots detected by the system'],
  },
  {
    title: '3. SOS',
    data: [
      'Emergency Call! Notify the fire department that there is a fire in your location',
    ],
  },
];

const EarlyWarning = ({navigation}) => {
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#F94A29', '#F94C10', '#FF1E00']}>
        <View className="w-full h-full">
          {/* Header SVG*/}
          <HeaderSvg />

          {/* Header */}
          <View className="flex-row">
            <Image
              source={require('../../assets/logo-icon.png')}
              className="w-12 h-12"
            />
            <View>
              <Text className="text-white text-xl font-bold">
                Danger, there is a fire!!!
              </Text>
              <Text className="text-black font-bold">Emergency Situation</Text>
            </View>
          </View>

          {/* Container */}
          <View className="mx-4">
            {/* Main */}
            <View>
              {/* Main Image */}
              <View className="justify-center items-center">
                <MainSvg />
              </View>

              {/* Instructions */}
              <Text className="text-white text-lg font-bold">
                Instructions!
              </Text>
              <SectionList
                sections={dataItem}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                  <Text className="text-white">
                    {item.includes('Emergency Call') ? (
                      <>
                        <Text className="font-bold">Emergency Call</Text>{' '}
                        <Text>
                          Notify the fire department that there is a fire in
                          your location
                        </Text>
                      </>
                    ) : (
                      item
                    )}
                  </Text>
                )}
                renderSectionHeader={({section: {title}}) => (
                  <Text className="text-white mt-2">{title}</Text>
                )}
              />
            </View>

            {/* Button */}
            <View className="flex-row items-center mt-6">
              <View
                className="w-32 rounded-xl overflow-hidden"
                style={{elevation: 5}}>
                <Button
                  title="evacuate"
                  color="#4ECB71"
                  onPress={() => navigation.navigate('Navigation')}
                />
              </View>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/early-warning/sos.png')}
                  className="mx-2"
                />
              </TouchableOpacity>
              <View
                className="w-32 rounded-xl overflow-hidden"
                style={{elevation: 5}}>
                <Button
                  title="see hotspot"
                  color="#FFA447"
                  onPress={() => navigation.navigate('Hotspot')}
                />
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="absolute bottom-0">
            <FooterSvg />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default EarlyWarning;
