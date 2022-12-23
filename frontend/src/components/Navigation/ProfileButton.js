import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  return (
    <button>
      <i className='fas fa-user-circle' />
    </button>
  );
};

export default ProfileButton;
