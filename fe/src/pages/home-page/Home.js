import React, {useState} from 'react';

// Import component
import User from '../../components/home-page/user/User';
import FireFighter from '../../components/home-page/firefighter/FireFighter';

const Home = ({navigation}) => {
  const [role, setRole] = useState('user');

  return (
    <>
      {role === 'user' && <User navigation={navigation} />}
      {role === 'firefighter' && <FireFighter navigation={navigation} />}
    </>
  );
};

export default Home;
