import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import axios from 'axios';

// Import component
import Card from '../../components/card/Card';
import HeaderHistory from '../../components/header-history/HeaderHistory';

// Import vector
import BackgroundRight from '../../assets/history/background-right.svg';
import BackgroundLeft from '../../assets/history/background-left.svg';

const History = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://192.168.1.28:5000/api/v1/sensor/')
        .then(response => {
          setData(response.data.data);
          // console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
          setData([]); // Ensure data is initialized as an empty array in case of error
        });
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 minutes (300000 milliseconds)
    const interval = setInterval(fetchData, 3000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Ensure filteredData is always an array
  const filteredData = Array.isArray(data)
    ? searchQuery
      ? data.filter(
          item =>
            (item.location &&
              item.location
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (item.status &&
              item.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.createdAt &&
              item.createdAt.toLowerCase().includes(searchQuery.toLowerCase())),
        )
      : data
    : [];

  return (
    <>
      <View className="bg-white">
        {/* Background Vector */}
        <View className="absolute top-56 right-0">
          <BackgroundRight />
        </View>
        <View className="absolute top-32">
          <BackgroundLeft />
        </View>

        {/* Header */}
        <HeaderHistory
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {/* Main */}
        <ScrollView className="mt-4 mb-20 z-50">
          <View className="items-center">
            {filteredData.map((item, index) => (
              <Card
                key={index}
                status={item.status}
                time={item.createdAt}
                day={item.createdAt}
                location={item.location}
                smoke={item.smoke_value !== null ? item.smoke_value : 0}
                fire={item.fire_level}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default History;
