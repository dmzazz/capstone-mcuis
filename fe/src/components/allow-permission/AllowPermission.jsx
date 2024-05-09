import {Modal, Button, Image, Text, View} from 'react-native';

export const AllowPermission = ({modalVisible, closeModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View
        className="flex flex-1 justify-center items-center"
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View className="bg-[#4ECB71] w-11/12 h-80 mb-[-20px] rounded-t-3xl">
          <Image
            source={require('../../assets/location.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View className="bg-white w-11/12 p-5 rounded-t-3xl rounded-b-lg">
          <Text className="text-black font-bold text-center text-xl">
            Let <Text className="text-red-500">Smart</Text> Evac get access to
            your location
          </Text>
          <Text className="text-center my-3">
            In order to know your position to facilitate the evacuation route
          </Text>

          {/* Button */}
          <View className="rounded-lg overflow-hidden">
            <Button
              title="allow location"
              color="#4ECB71"
              onPress={closeModal}
            />
          </View>
          <View className="my-1" />
          <View className="rounded-lg overflow-hidden">
            <Button title="not now" color="#FF004D" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
