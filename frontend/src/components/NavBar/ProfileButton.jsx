import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./NavBar.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(() => {
      navigate("/");
      setShowMenu(false);
    });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <div className="profile-button-container" ref={menuRef}>
      <button className="profile-button" onClick={toggleMenu}>
        {user ? (
          <img src="/iconSmall.jpg" alt="Profile" className="profileIcon" />
        ) : (
          <img src="/menus.png" alt="Menu" className="hamburger-icon" />
        )}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {user ? (
            <>
              <div className="profile-info">
                <div>Hello {user.firstName} !</div>
                <div> {user.username}</div>
                <div>
                  {" "}
                  {user.firstName} {user.lastName}
                </div>
                <div>{user.email}</div>
              </div>
              <hr />

              <NavLink
                to="/"
                className="profile-dropdown-item logout"
                onClick={() => setShowMenu(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/my-account"
                className="profile-dropdown-item logout"
                onClick={() => setShowMenu(false)}
              >
                My Account
              </NavLink>

              <NavLink
                to="/dashboard"
                className="profile-dropdown-item logout"
                onClick={() => setShowMenu(false)}
              >
                Owner Dashboard
              </NavLink>

              <button onClick={logout} className="profile-dropdown-item logout">
                Log Out
              </button>
            </>
          ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={() => setShowMenu(false)}
                modalComponent={<LoginFormModal />}
                className="profile-dropdown-item"
              />

              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={() => setShowMenu(false)}
                modalComponent={<SignupFormModal />}
                className="profile-dropdown-item"
              />
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
