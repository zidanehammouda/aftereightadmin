import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <MDBNavbar
        light
        bgColor="light"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "none",
        }}
      >
        <MDBContainer>
          <MDBNavbarBrand style={{ margin: "auto" }}>
            <img
              src="https://i.imgur.com/iIb4ZfB.png"
              height="30"
              alt="After Eight"
              loading="lazy"
            />
          </MDBNavbarBrand>
        </MDBContainer>
        {user && (
          <MDBBtn
            color="danger"
            style={{ marginRight: "20px" }}
            onClick={logout}
          >
            Logout
          </MDBBtn>
        )}
      </MDBNavbar>
    </>
  );
};

export default Navbar;
