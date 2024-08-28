import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CartIcon from './CartIcon';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

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
      <div></div>
      <div></div>
        <div></div>
      <CartIcon />
        <div className="navbar-links"></div>
        <img src='Vera-Andrei-Wide-2.jpg' alt="Vera and Andrei" className="owners" />
      <div className="navbar-links">
        <ProfileButton user={sessionUser} />
      </div>
    </nav>
  );
};

export default NavBar;
