import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { MDBSpinner } from "mdb-react-ui-kit";

import "./Login.css";

import Input from "../../componenets/input/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [user, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <>
      <div className="login">
        <div className="login_container">
          {err && <p class="error">Can't log in</p>}

          <Input
            id={email}
            InputName={email}
            handleChange={(e) => setEmail(e.target.value)}
            LabelText="Email"
            type="email"
            value={email}
          />
          <Input
            id={password}
            InputName={password}
            handleChange={(e) => setPassword(e.target.value)}
            LabelText="Password"
            type="password"
            value={password}
          />

          <button
            className="btn btn-primary"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
              logInWithEmailAndPassword(email, password).then((result) => {
                if (result) setErr(true);
              });
            }}
          >
            {!loading ? (
              "Sign in"
            ) : (
              <i class="fa-solid fa-circle-notch fa-lg"></i>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
