import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [errors, setErrors] = useState([]);

  if (isLoggedIn) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordValidation) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    alert('Passwords did not match');
    return setErrors(['Passwords did not match']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          autoComplete='off'
          id='username'
          onChange={(e) => setUsername(e.target.value)}
          required
          type='text'
          value={username}
        />
      </label>
      <label>
        Email:
        <input
          autoComplete='off'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          required
          type='email'
          value={email}
        />
      </label>
      <label>
        Password:
        <input
          autoComplete='off'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          required
          type='password'
          value={password}
        />
      </label>
      <label>
        Confirm Password:
        <input
          autoComplete='off'
          id='validate'
          onChange={(e) => setPasswordValidation(e.target.value)}
          required
          type='password'
          value={passwordValidation}
        />
      </label>
      <input type='submit' />
    </form>
  );
};

export default SignupFormPage;
