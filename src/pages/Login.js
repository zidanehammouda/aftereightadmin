import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { MDBSpinner } from "mdb-react-ui-kit";
import Navbar from "../componenets/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      <MDBSpinner role="status" />;
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <>
      <Navbar />
      <div class="Container" style={styles.Container}>
        <div style={styles.form}>
          {err && <p class="error">Can't log in</p>}
          <MDBInput
            className="mb-4"
            type="email"
            id="form1Example1"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="form1Example2"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBBtn
            block
            onClick={() => {
              logInWithEmailAndPassword(email, password).then((result) => {
                if (result) setErr(true);
              });
            }}
          >
            Sign in
          </MDBBtn>
        </div>
      </div>
    </>
  );
};
const styles = {
  Container: {
    marginTop: "100px",
    width: "100%",
    justifyContent: "center",
    display: "flex",
  },
  form: {
    width: "300px",
  },
};

export default Login;
