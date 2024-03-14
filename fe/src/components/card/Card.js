import {Text, View} from 'react-native';

// Import icon
import AttentionSvg from '../../assets/attention.svg';
import ClockSvg from '../../assets/clock.svg';

const Card = ({status, time, smoke, fire}) => {
  return (
    <>
      <View
        className="w-[90%] bg-white mb-4 px-3 py-2 flex-row justify-between items-center rounded-md"
        style={{elevation: 5}}>
        <View>
          <View className="flex-row items-center">
            <AttentionSvg />
            <Text className="text-yellow-500 text-lg font-bold ml-2">
              {status}
            </Text>
          </View>
          <View className="flex-row items-center">
            <ClockSvg />
            <Text className="text-black text-lg font-bold ml-2">{time}</Text>
          </View>
        </View>
        <View>
          <View>
            <Text className="text-black">Sunday, 14 Januari 2024</Text>
          </View>
          <View className="w-full mt-1 rounded-md">
            <Text className="text-black font-bold">
              <Text className="text-yellow-500">Smoke</Text> : {smoke}
            </Text>
            <Text className="text-black font-bold">
              <Text className="text-red-500">Fire</Text> : {fire}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Card;
