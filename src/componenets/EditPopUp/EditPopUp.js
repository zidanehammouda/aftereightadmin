import React, { useState, useRef, useEffect } from "react";
import Input from "../input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditPopUp.css";

const EditPopUp = ({
  element,
  UpdateSingleArticle,
  setShowPopUp,
  scrollPosition,
}) => {
  const [article, setArticle] = useState(element);
  const BakcUpArticle = element;
  const myRef = useRef(null);

  const updateFieldChanged = () => (e) => {
    const { name, value } = e.target;
    let newArticle = { ...article };
    newArticle[name] = value;
    setArticle(newArticle);
    // console.log(article);
  };

  useEffect(() => {
    myRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  }, []);

  return (
    <div class="EditPopUp">
      <div
        class="cancelPopUp"
        onClick={() => {
          UpdateSingleArticle(BakcUpArticle);
          setShowPopUp(-1);
          window.scrollTo(0, scrollPosition);
        }}
      ></div>
      <div className="EditPopUp_container" ref={myRef}>
        <FontAwesomeIcon
          className="icon EditPopUp_iconX"
          icon="fa-solid fa-xmark"
          // color="#808080"
          size="lg"
          // style={{ marginRight: "10px" }}
          onClick={() => {
            UpdateSingleArticle(BakcUpArticle);
            setShowPopUp(-1);
            window.scrollTo(0, scrollPosition);
          }}
        />
        <Input
          InputName="name"
          value={article.name || ""}
          LabelText="Name"
          type="text"
          handleChange={updateFieldChanged()}
        />
        <Input
          InputName="price"
          value={article.price || ""}
          LabelText="Price"
          type="number"
          handleChange={updateFieldChanged()}
        />
        <Input
          InputName="description"
          value={article.description || ""}
          LabelText="Description"
          type="textarea"
          handleChange={updateFieldChanged()}
        />
        <Input
          InputName="image"
          value={article.image || ""}
          LabelText="URL"
          type="text"
          handleChange={updateFieldChanged()}
        />
        <div class="EditPopUp_footer">
          <button
            className="btn btn-green"
            onClick={() => UpdateSingleArticle(article)}
          >
            Save
          </button>
          <button
            className="btn btn-red"
            onClick={() => {
              UpdateSingleArticle(BakcUpArticle);
              setShowPopUp(-1);
              window.scrollTo(0, scrollPosition);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditPopUp;