import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleDropdown = () => {
    if (isDisplayed) return;
    setIsDisplayed(true);
  };

  const logout = (e) => {
    e.preventDefault();

    dispatch(sessionActions.logoutUser());
  };

  useEffect(() => {
    if (!isDisplayed) return;

    const closeMenu = (e) => {
      // let isDropdown = false;
      // let currNode = e.target;
      // const page = document.querySelector('body');

      // while (currNode !== page) {
      //   if (currNode.className === 'dropdown') {
      //     isDropdown = true;
      //     break;
      //   }

      //   currNode = currNode.parentNode;
      // }

      // if (!isDropdown) setIsDisplayed(false);
      setIsDisplayed(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [isDisplayed]);

  return (
    <>
      <button className='dropdown' onClick={handleDropdown}>
        <i className='fas fa-user-circle' />
      </button>
      {isDisplayed && (
        <ul className='dropdown'>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;
