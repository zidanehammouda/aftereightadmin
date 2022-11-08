import React, { useState, useEffect } from "react";
import { fetchData } from "../api";

import CatgoriesList from "../componenets/CategoriesList/CatgoriesList";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";

export default function Home() {
  const [data, setData] = useState([]);
  const [isAllowed, setAllowed] = useState(false);

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    if (user.email !== "after@eight.com") {
      // console.log(user.email);
      setAllowed(true);
    }
  }, [user, loading]);

  useEffect(() => {
    fetchData(setData);
  }, []);

  return <>{user && <CatgoriesList data={data} isAllowed={isAllowed} />};</>;
}
