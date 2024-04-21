import React, {useState} from 'react';

// Import component
import User from '../../components/early-warning/user/User';
import FireFighter from '../../components/early-warning/firefighter/FireFighter';

const EarlyWarning = ({navigation}) => {
  const [role, setRole] = useState('firefighter');

  return (
    <>
      {role === 'user' && <User navigation={navigation} />}
      {role === 'firefighter' && <FireFighter navigation={navigation} />}
    </>
  );
};

export default EarlyWarning;
