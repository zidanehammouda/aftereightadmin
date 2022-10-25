import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PopUpMessage from "../componenets/PopUpMessage/PopUpMessage";
import Input from "../componenets/input/Input";
import { handleSubmit } from "../api";
import EditPopUp from "../componenets/EditPopUp/EditPopUp";
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

  useEffect(() => {
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

  // const MoveArticleUp = (index) => {
  //   if (index !== 0) {
  //     let newArticles = Articles;
  //     let aux = newArticles[index - 1];
  //     newArticles[index - 1] = newArticles[index];
  //     newArticles[index] = aux;
  //     setArticles(() => [...newArticles]);
  //   }
  // };

  // const MoveArticleDown = (index) => {
  //   if (index !== Articles.length - 1) {
  //     let newArticles = Articles;
  //     let aux = newArticles[index + 1];
  //     newArticles[index + 1] = newArticles[index];
  //     newArticles[index] = aux;
  //     setArticles(() => [...newArticles]);
  //   }
  // };

  const UpdateSingleArticle = (newArticle) => {
    const newArticles = Articles;
    newArticles[ShowPopUp] = newArticle;
    setArticles(newArticles);
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDrag = () => {
    let _Articles = [...Articles];
    const DraggedItemContent = _Articles.splice(dragItem.current, 1)[0];

    _Articles.splice(dragOverItem.current, 0, DraggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setArticles(_Articles);
  };

  return (
    <div className="editCategory">
      {PopUp && <PopUpMessage />}
      {ShowPopUp !== -1 && (
        <EditPopUp
          element={Articles[ShowPopUp]}
          UpdateSingleArticle={UpdateSingleArticle}
          setShowPopUp={setShowPopUp}
          scrollPosition={window.pageYOffset}
        />
      )}

      <div className="editCategory_container">
        <div className="editCategory_left">
          <img
            className="img-fluid shadow-2-strong"
            src={category.image_url}
            alt={category.name}
            style={{ width: "60%", marginBottom: "40px" }}
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
              className="btn btn-blue"
              type="submit"
              onClick={() => navigate("/")}
            >
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button
              className="btn btn-blue"
              type="submit"
              onClick={AddNewArticle}
            >
              Add
            </button>
            <button className="btn btn-dark" type="submit" onClick={handleSort}>
              <i class="fa-solid fa-arrow-up-wide-short"></i>
            </button>
          </div>

          <table className="articles_table">
            <thead>
              <tr>
                <th style={{ width: "5%" }}></th>
                <th style={{ width: "55%" }}>Article</th>
                {/* <th onClick={() => setDisabledDesc((prev) => !prev)}>
                Description
              </th> */}
                <th style={{ width: "20%" }}>Price</th>
                {/* <th onClick={() => setDisabledImg((prev) => !prev)}>Image</th> */}
                <th style={{ width: "10%" }}></th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>

            <tbody>
              {Articles.map((element, index) => (
                <tr
                  key={index}
                  draggable
                  onDragStart={() => (dragItem.current = index)}
                  onDragEnter={() => (dragOverItem.current = index)}
                  onDragEnd={handleDrag}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <td className="Movebuttons">
                    <i className="fa-solid fa-bars"></i>
                  </td>

                  <td>
                    <input
                      className="articles_table_input"
                      type="text"
                      id="name"
                      name="name"
                      value={element.name || ""}
                      onChange={updateFieldChanged(index)}
                    />
                  </td>
                  <td>
                    <input
                      className="noscroll articles_table_input"
                      type="number"
                      id="price"
                      name="price"
                      value={element.price || ""}
                      onChange={updateFieldChanged(index)}
                    />
                  </td>
                  <td>
                    <i
                      class="fa-regular fa-pen-to-square fa-lg"
                      style={{ color: "#018a19" }}
                      onClick={() => setShowPopUp(index)}
                    ></i>
                  </td>
                  <td>
                    <i
                      class="fa-solid fa-trash fa-lg"
                      onClick={() => deleteArticle(index)}
                      style={{ color: "#454545" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="editCategory_right_footer">
            <button
              className="btn btn-blue"
              type="submit"
              onClick={AddNewArticle}
            >
              Add
            </button>
            <button
              className="btn btn-green"
              type="submit"
              onClick={() =>
                handleSubmit(
                  category._id,
                  Articles,
                  name,
                  image_url,
                  isAllowed
                ).then((response) => {
                  if (response === "AuthenticationError") {
                    setPopUp(true);
                    setTimeout(() => setPopUp(false), 2000);
                  } else {
                    setTimeout(() => navigate("/"), 1000);
                  }
                })
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
