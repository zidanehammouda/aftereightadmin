import React from "react";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../api";

import "./CategoriesList.css";

const CatgoriesList = (props) => {
  return (
    <div class="categoriesList-container">
      <table className="categoriesList-table">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Edit</th>
        </tr>
        {props.data.map((element) => (
          <tr>
            <td>{element.name}</td>
            <td>
              <img
                width="80px"
                height="80px"
                style={{ objectFit: "cover", overflow: "hidden" }}
                src={element.image_url}
                alt={element.name}
              />
            </td>
            <td>
              <Link
                to="/editcategory"
                state={{ category: element, isAllowed: props.isAllowed }}
              >
                <i
                  class="fa-regular fa-pen-to-square fa-xl light_icon"
                  color="#808080"
                  style={{ marginRight: "10px", color: "#808080" }}
                ></i>
              </Link>

              <i
                class="fa-solid fa-trash fa-xl light_icon"
                onClick={() => deleteCategory(element._id, props.isAllowed)}
                style={{ color: "#808080" }}
              ></i>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CatgoriesList;
