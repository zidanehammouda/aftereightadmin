import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Login.css";

import Input from "../../componenets/input/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(-1);
  const [user, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <>
      <div className="login">
        <div className="login_container">
          <span className="login_container_text">Login</span>
          <div className="error_container">
            {err !== -1 && (
              <span className="error">
                {err === 0
                  ? "Wrong credentials!"
                  : "Failed to connect. Please try again later"}
              </span>
            )}
          </div>

          <form>
            <Input
              id="Email"
              InputName={email}
              handleChange={(e) => setEmail(e.target.value)}
              LabelText="Email"
              type="email"
              value={email}
            />
            <Input
              id="Password"
              InputName={password}
              handleChange={(e) => setPassword(e.target.value)}
              LabelText="Password"
              type="password"
              value={password}
            />
          </form>

          <button
            className="btn btn-primary"
            onClick={() => {
              setLoading(true);
              // setTimeout(() => setLoading(false), 1000);
              logInWithEmailAndPassword(email, password).then((result) => {
                if (
                  Object.values(result)[0] === "auth/user-not-found" ||
                  Object.values(result)[0] === "auth/wrong-password"
                ) {
                  setErr(-1);
                  setErr(0);
                } else {
                  setErr(1);
                }
                setLoading(false);
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
