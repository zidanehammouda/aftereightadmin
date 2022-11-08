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
      <div
        className="EditPopUp_container"
        ref={myRef}
        style={{ top: scrollPosition !== 0 ? scrollPosition : "150px" }}
      >
        <i
          class="fa-solid fa-xmark icon EditPopUp_iconX fa-lg"
          onClick={() => {
            UpdateSingleArticle(BakcUpArticle);
            setShowPopUp(-1);
            window.scrollTo(0, scrollPosition);
          }}
        ></i>

        <div className="EditPopUp_NamePriceInputContainer">
          <Input
            InputName="name"
            value={article.name || ""}
            LabelText="Name"
            type="text"
            handleChange={updateFieldChanged()}
          />
          <Input
            style={{ width: "30%" }}
            InputName="price"
            value={article.price || ""}
            LabelText="Price"
            type="number"
            handleChange={updateFieldChanged()}
          />
        </div>
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
            onClick={() => {
              UpdateSingleArticle(article);
              setShowPopUp(-1);
            }}
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
