import React, {useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const CarouselCardItem = () => {
  const dataCarousel = [
    {image: require('../../assets/self-evacuation/home/1.png')},
    {image: require('../../assets/self-evacuation/home/2.png')},
    {image: require('../../assets/self-evacuation/home/3.png')},
    {image: require('../../assets/self-evacuation/home/4.png')},
    {image: require('../../assets/self-evacuation/home/5.png')},
    {image: require('../../assets/self-evacuation/home/6.png')},
    {image: require('../../assets/self-evacuation/home/7.png')},
    {image: require('../../assets/self-evacuation/home/8.png')},
  ];

  const width = Dimensions.get('window').width * 1;
  const [currentIndex, setCurrentIndex] = useState(0); // Untuk melacak index saat ini

  // Fungsi untuk merender stepper dengan angka
  const renderStepper = () => {
    return (
      <View className="flex-row justify-center items-center mt-2">
        {[...Array(dataCarousel.length).keys()].map(index => (
          <Text
            key={index}
            className={`text-[#ccc] m-1 ${
              currentIndex === index ? 'text-[#FFD233] font-bold' : {}
            }`}>
            {index + 1} {/* Menampilkan angka dimulai dari 1 */}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 items-center mt-2">
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={dataCarousel}
        scrollAnimationDuration={3000}
        onSnapToItem={index => setCurrentIndex(index)} // Update index saat ini ketika berganti slide
        renderItem={({item}) => (
          <View className="flex-1 justify-center items-center px-4">
            <Image
              source={item.image} className="w-full h-full"
            />
          </View>
        )}
      />
      {renderStepper()}
    </View>
  );
};

export default CarouselCardItem;
