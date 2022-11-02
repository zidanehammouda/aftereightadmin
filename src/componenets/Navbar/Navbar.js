import React from "react";
import "./NavBar.css";

import { logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  return (
    <nav>
      <div class="logo">
        <img
          src="https://i.imgur.com/iIb4ZfB.png"
          height="50"
          width="auto"
          alt="After Eight"
          loading="lazy"
        />
      </div>

      {user && (
        <i
          class="fa-solid fa-right-from-bracket"
          onClick={() => {
            logout();
            setTimeout(() => navigate("/"), 1000);
          }}
        ></i>
      )}
    </nav>
  );
};

export default Navbar;
