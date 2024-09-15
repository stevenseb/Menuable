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
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const [isDisabled, setIsDisabled] = useState(true);
  const modalRef = useRef();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(String(email).toLowerCase());
    setEmailValid(isValid);
    return isValid;
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    const isValid = digits.length === 10;
    setPhoneValid(isValid);
    return isValid;
  };

  useEffect(() => {
    const conditions = {
      phone: !phoneValid,
      address: address.length === 0,
      email: !emailValid,
      username: username.length < 4,
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      passwordLength: password.length < 6,
      passwordsMatch: password !== confirmPassword
    };

    const shouldBeDisabled = Object.values(conditions).some(condition => condition);
    setIsDisabled(shouldBeDisabled);
  }, [phoneValid, address, emailValid, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!validateEmail(email)) {
    newErrors.email = "Invalid email entered!";
  }
  if (!validatePhone(phone)) {
    newErrors.phone = "Phone number must contain 10 digits.";
  }
  if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters long.";
  }
  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Confirm Password field must be the same as the Password field";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const response = await dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password,
        address,
        phone,
      })
    );
    if (response.ok) {
      closeModal();
    } else {
      const data = await response.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data && data.message) {
        setErrors({ general: data.message });
      } else {
        setErrors({ general: 'An error occurred during signup' });
      }
    }
  } catch (error) {
    console.error('Signup error:', error);
    if (error.message) {
      setErrors({ general: error.message });
    } else {
      setErrors({ general: 'An unexpected error occurred' });
    }
  }
};

  const switchToLogin = () => {
    setModalContent(<LoginFormModal />);
  };

  return (
        <div className="signup-box" ref={modalRef}>
          <h5 className="centered-text">Sign Up</h5>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="form-column">
                <label>
                  Email
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    required
                  />
                </label>
                {email && !emailValid && <p className="warning">Please enter a valid email address</p>}
                {errors.email && <p className="error">{errors.email}</p>}
                
                <label>
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                {errors.username && <p className="error">{errors.username}</p>}
                
                <label>
                  First Name
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>
                {errors.firstName && <p className="error">{errors.firstName}</p>}
                
                <label>
                  Last Name
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </div>
              <div className="form-column">
                <label>
                  Phone
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      validatePhone(e.target.value);
                    }}
                    required
                  />
                </label>
                {phone && !phoneValid && <p className="warning">Please enter a valid 10-digit phone number</p>}
                {errors.phone && <p className="error">{errors.phone}</p>}
                
                <label>
                  Address
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </label>
                {errors.address && <p className="error">{errors.address}</p>}
                
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.password && <p className="error">{errors.password}</p>}
                
                <label>
                  Confirm Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </div>
            </div>
            {errors.general && <p className="error general-error">{errors.general}</p>}
            <button type="submit" disabled={isDisabled}>Sign Up</button>
            <button type="button" onClick={switchToLogin}>Already Registered? -Log In</button>
          </form>
        </div>
  );
}

export default SignupFormModal;
