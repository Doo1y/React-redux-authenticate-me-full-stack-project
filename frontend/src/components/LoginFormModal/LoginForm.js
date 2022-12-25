import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginFormModal.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, setCred] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState([]);

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
    <form id='login-form' onSubmit={handleSubmit}>
      <label>
        Username or Email:
        <input
          autoComplete='off'
          type='text'
          id='login-cred'
          value={credential}
          onChange={(e) => setCred(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          autoComplete='off'
          type='password'
          id='login-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type='submit' id='login-button'>
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
