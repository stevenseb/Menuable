// frontend/src/components/SignupFormModal/SignupFormModal.jsx
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import { useModal } from '../../context/Modal';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const [isDisabled, setIsDisabled] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    setIsDisabled(
      !phone ||
      !address ||
      !email ||
      username.length < 4 ||
      !firstName ||
      !lastName ||
      password.length < 6 ||
      password !== confirmPassword
    );
  }, [phone, address, email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
          address,
          phone,
        })
      )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }

    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const switchToLogin = () => {
    setModalContent(<LoginFormModal />);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the modal opens

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setAddress("");
      setPhone("");
      setEmail("");
      setUsername("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      setIsDisabled(true);
    };
  }, [closeModal]);

  return (
    <div className="modal-backdrop">
      <div className="modal-container-signup" ref={modalRef}>
        <div className="signup-box">
          <h5 className="centered-text">Sign Up</h5>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {errors.email && <p>{errors.email}</p>}
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            {errors.username && <p>{errors.username}</p>}
            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            {errors.firstName && <p>{errors.firstName}</p>}
            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            {errors.lastName && <p>{errors.lastName}</p>}
            <label>
              Phone
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
            {errors.phone && <p>{errors.phone}</p>}
            <label>
              Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
            {errors.address && <p>{errors.address}</p>}
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <p>{errors.password}</p>}
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <button type="submit" disabled={isDisabled}>Sign Up</button>
          </form>
          <button type="button" onClick={switchToLogin}>Already Registered? -Log In</button>
        </div>
      </div>
    </div>
  );
}

export default SignupFormModal;
