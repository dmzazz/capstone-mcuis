import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Import logo
import LogoIcon from '../../assets/logo-icon.svg';
import Search from '../../assets/search.svg';

const HeaderHistory = ({searchQuery, setSearchQuery}) => {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (showSearch) {
          setShowSearch(false);
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [showSearch]);

  const handleOutsidePress = () => {
    if (showSearch && inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View
        className="bg-white py-2 flex-row justify-between items-center"
        style={{elevation: 5}}>
        <LogoIcon />
        {showSearch ? (
          <>
            <View className="flex-1">
              <TextInput
                ref={inputRef}
                placeholder="Search..."
                autoFocus={true}
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="bg-gray-100 mr-5 px-4 rounded-lg"
              />
            </View>
          </>
        ) : (
          <View className="mr-5">
            <TouchableOpacity onPress={() => setShowSearch(true)}>
              <Search />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeaderHistory;
