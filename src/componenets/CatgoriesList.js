import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

const CatgoriesList = (props) => {
  return (
    <div class="container" style={styles.container}>
      <MDBTable style={styles.table} hover>
        <MDBTableHead style={{ backgroundColor: "#0C56D0", color: "white" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Edit</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {props.data.map((element) => (
            <tr>
              <td>{element.name}</td>
              <td>
                <img
                  width="80px"
                  height="80px"
                  style={{ objectFit: "cover" }}
                  src={element.image_url}
                  alt={element.name}
                />
              </td>
              <td>
                <Link to="editarticles" state={{ category: element }}>
                  <MDBIcon
                    style={{ marginRight: "20px", color: "grey" }}
                    fas
                    icon="edit"
                    size="lg"
                  />
                </Link>
                <MDBIcon
                  style={{ color: "grey" }}
                  fas
                  icon="trash  "
                  size="lg"
                  type="submit"
                  onClick={() => props.deleteCategory(element._id)}
                />
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    width: "80%",
    margin: "auto",
    marginTop: "20px",
    textAlign: "center",
    verticalAlign: "middle",
  },
};

export default CatgoriesList;
