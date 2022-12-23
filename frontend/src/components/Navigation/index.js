import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isLoaded }) => {
  const isLoggedIn = useSelector((state) => state.session.user);

  const userNavOptions = isLoggedIn ? (
    <ProfileButton user={isLoggedIn} />
  ) : (
    <>
      <NavLink to='/login'>Log In</NavLink>
      <NavLink to='/signup'>Sign Up</NavLink>
    </>
  );

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to='/'>
            Home
          </NavLink>
          {isLoaded && userNavOptions}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
