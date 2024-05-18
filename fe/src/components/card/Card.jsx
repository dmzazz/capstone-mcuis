import {Image, Text, View} from 'react-native';
import moment from 'moment';

// Import icon
import AttentionSvg from '../../assets/attention.svg';
import ClockSvg from '../../assets/clock.svg';

const Card = ({status, time, location, day, smoke, fire}) => {
  // Determine text color based on status
  const textColor =
    status === 'Danger'
      ? 'text-red-500'
      : status === 'Attention'
      ? 'text-yellow-500'
      : 'text-black';

  return (
    <>
      <View
        className="w-[90%] bg-white mb-4 px-3 py-2 flex-row justify-between items-center rounded-md"
        style={{elevation: 5}}>
        <View>
          <View className="flex-row items-center">
            <Image source={require('../../assets/location-icon.png')} />
            <Text className={`text-black font-bold ml-2`}>{location}</Text>
          </View>
          <View className="flex-row items-center my-1">
            <AttentionSvg />
            <Text className={`${textColor} capitalize font-bold ml-2`}>{status}</Text>
          </View>
          <View className="flex-row items-center">
            <ClockSvg />
            <Text className="text-black font-bold ml-2">
              {moment(time).format('LT')}
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text className="text-black">
              {moment(day).format('dddd, DD MMMM YYYY')}
            </Text>
          </View>
          <View className="w-full rounded-md">
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
