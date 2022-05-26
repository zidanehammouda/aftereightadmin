import React, { useState, useEffect } from "react";
import Navbar from "../componenets/Navbar";

import axios from "axios";

import CatgoriesList from "../componenets/CatgoriesList";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";

export default function Categories() {
  const [data, setData] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  const fetchData = async () => {
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(url);
      });
  };

  const deleteCategory = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then((response) => console.log(response))
      .then(window.location.reload(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <CatgoriesList data={data} deleteCategory={deleteCategory} />;
    </>
  );
}
