import {useState} from 'react';

export default function Role() {
  const [role, setRole] = useState('firefighter');

  switch (role) {
    case 'user':
      roleName = 'User';
      break;
    case 'firefighter':
      roleName = 'Firefighter';
      break;
    default:
      return null;
  }
}
