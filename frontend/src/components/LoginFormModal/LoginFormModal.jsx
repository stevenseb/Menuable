import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [isDisabled, setIsDisabled] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    setIsDisabled(credential.length < 4 || password.length < 6);
  }, [credential, password]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  try {
    const response = await dispatch(sessionActions.login({ credential, password }));
    if (response.ok) {
      closeModal();
    } else {
      const data = await response.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data && data.message) {
        setErrors({ credential: data.message });
      } else {
        setErrors({ credential: 'Invalid username or password' });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    setErrors({ credential: 'Invalid username or password' });
  }
};

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sessionActions.login({ credential: 'demo', password: 'demo' }));
      closeModal();
    } catch (error) {
      console.error('Demo login error:', error);
      if (error && error.errors) {
        setErrors(error.errors);
      } else if (error && error.message) {
        setErrors({ credential: error.message });
      } else {
        setErrors({ credential: 'An error occurred during demo login' });
      }
    }
  };

  return (
    <div className="login-box" ref={modalRef}>
      <h3 className="centered-text">Log In</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error-login">{errors.credential}</p>}
        <button type="submit" disabled={isDisabled}>Log In</button>
        <br />
        <button type="button" onClick={handleDemoLogin}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
