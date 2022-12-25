import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const isLoggedIn = useSelector((state) => state.session.user);

  const userNavOptions = (
    <div className='user-opt'>
      {isLoggedIn ? (
        <ProfileButton user={isLoggedIn} />
      ) : (
        <>
          <LoginFormModal />
          <NavLink to='/signup'>Sign Up</NavLink>
        </>
      )}
    </div>
  );

  return (
    <nav>
      <NavLink exact to='/' className='home'>
        Home
      </NavLink>
      {isLoaded && userNavOptions}
    </nav>
  );
};

export default Navigation;
