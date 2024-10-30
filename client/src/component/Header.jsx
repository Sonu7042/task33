import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const Header = () => {
  const navigate = useNavigate();

  const LogoutToken = () => {
    Cookies.remove("token");
    navigate('/login')
  };

  return (
    <header>
      <div className="btns">
        {!Cookies.get("token") ? (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        ) : (
          <button onClick={LogoutToken}>Logout</button>
        )}
      </div>
    </header>
  );
};

export default Header;
