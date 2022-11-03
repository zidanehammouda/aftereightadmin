import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { handleSubmit as _handleSubmit } from "../../api";

import EditCategoryTable from "../../componenets/EditCategoryTable/EditCategoryTable";
import PopUpMessage from "../../componenets/PopUpMessage/PopUpMessage";
import Input from "../../componenets/input/Input";
import EditPopUp from "../../componenets/EditPopUp/EditPopUp";
import EditCategoryFooter from "../../componenets/EditCategoryFooter/EditCategoryFooter";

import "./EditCategory.css";

const EditCategory = () => {
  const location = useLocation();
  const { category, isAllowed } = location.state;
  const [Articles, setArticles] = useState(category.articles);
  const [name, setName] = useState(category.name);
  const [image_url, setImageUrl] = useState(category.image_url);
  const [ShowPopUp, setShowPopUp] = useState(-1);
  const [PopUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  console.log(Articles);

  useEffect(() => {
    document.addEventListener("wheel", function (event) {
      if (
        document.activeElement.type === "number" &&
        document.activeElement.classList.contains("noscroll")
      ) {
        document.activeElement.blur();
      }
    });

    return () => {};
  }, []);

  const handleSort = () => {
    const duplicateArticles = Articles;
    duplicateArticles.sort((a, b) => {
      return a.price - b.price;
    });
    setArticles(() => [...duplicateArticles]);
    console.log(Articles);
  };

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setName(value);
  };
  const handleChangeImageUrl = ({ target }) => {
    const { value } = target;
    setImageUrl(value);
  };

  const updateFieldChanged = (index) => (e) => {
    console.log("index: " + index);
    console.log("property name: " + e.target.name);
    const { name, value } = e.target;
    let newArr = [...Articles];
    newArr[index][name] = value;
    setArticles(newArr);
  };

  const AddNewArticle = () => {
    setArticles((prev) => [...prev, {}]);
    window.scrollTo(5000, 5000);
  };

  const deleteArticle = (index) => {
    let newArr = [...Articles];
    newArr.splice(index, 1);
    setArticles(newArr);
  };

  const UpdateSingleArticle = (newArticle) => {
    console.log("about to change one article");
    const newArticles = Articles;
    newArticles[ShowPopUp] = newArticle;
    setArticles(newArticles);
  };

  const onDragEnd = (params) => {
    if (!params.destination) {
      return;
    }
    const srcId = params.source.index;
    const destId = params.destination.index;
    let _articles = [...Articles];
    _articles.splice(destId, 0, _articles.splice(srcId, 1)[0]);
    setArticles(_articles);
  };

  const handleSubmit = () => {
    _handleSubmit(category._id, Articles, name, image_url, isAllowed).then(
      (response) => {
        if (response === "AuthenticationError") {
          setPopUp(true);
          setTimeout(() => setPopUp(false), 2000);
        } else {
          setTimeout(() => navigate("/"), 1000);
        }
      }
    );
  };

  return (
    <div className="editCategory_container">
      {PopUp && <PopUpMessage />}
      {ShowPopUp !== -1 && (
        <EditPopUp
          key={Articles[ShowPopUp]._id}
          element={Articles[ShowPopUp]}
          UpdateSingleArticle={UpdateSingleArticle}
          setShowPopUp={setShowPopUp}
          scrollPosition={window.pageYOffset}
        />
      )}

      <div className="editCategory_left">
        <img
          className="editCategory_left_img"
          src={category.image_url}
          alt={category.name}
        />
        <Input
          value={name}
          LabelText="Name"
          handleChange={handleChangeName}
          type="text"
        />
        <Input
          value={image_url}
          LabelText="URL"
          handleChange={handleChangeImageUrl}
          type="text"
        />
      </div>

      <div className="editCategory_right">
        <div className="editCategory_right_header">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={AddNewArticle}
          >
            Add
          </button>
          <button className="btn btn-dark" type="submit" onClick={handleSort}>
            <i class="fa-solid fa-arrow-up-wide-short"></i>
          </button>
        </div>

        <EditCategoryTable
          key={category.id}
          onDragEnd={onDragEnd}
          Articles={Articles}
          updateFieldChanged={updateFieldChanged}
          setShowPopUp={setShowPopUp}
          deleteArticle={deleteArticle}
        />

        <EditCategoryFooter
          AddNewArticle={AddNewArticle}
          handleSubmit={handleSubmit}
          setPopUp={setPopUp}
        />
      </div>
    </div>
  );
};

export default EditCategory;
