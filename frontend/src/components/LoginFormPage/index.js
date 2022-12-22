import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginFormPage.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.session.user);
  const [credential, setCred] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState([]);

  if (isLoggedIn) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErr(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username/email:
        <input
          type='text'
          id='cred'
          value={credential}
          onChange={(e) => setCred(e.target.value)}
          required
        />
      </label>
      <label>
        password:
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginFormPage;
