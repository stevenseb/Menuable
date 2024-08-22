import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import ProfileButton from './ProfileButton';
import CartIcon from './CartIcon';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import './NavBar.css';

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setMenuOpen(false);
//     }
//   };


  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    navigate('/');
  };


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" onClick={handleLogoClick}>
          <img src='ComideriaRussa.png' alt="La Comederia Russa" className="navbar-logo" />
        </NavLink>
      </div>
      <CartIcon />
      <div className="navbar-links">
        <div className="menu-button" ref={menuRef}>
          {!sessionUser && (
            <button className="hamburger-button" onClick={handleMenuToggle}>
              {/* <img src={hamburger} alt="Menu" className="hamburger-icon" /> */}
            </button>
          )}
          {sessionUser && <ProfileButton user={sessionUser} className="profile-icon" />}
        </div>
        {!sessionUser && menuOpen && (
          <div className="dropdown-menu" ref={menuRef}>
            <ul>
              <li className="profile-dropdown-item" onClick={() => setMenuOpen(false)}>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                  className="text-link"
                />
              </li>
              <li className="profile-dropdown-item" onClick={() => setMenuOpen(false)}>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                  className="text-link"
                />
              </li>
              {isLoaded}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
