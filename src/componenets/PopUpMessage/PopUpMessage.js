import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

export default function PopUpMessage() {
  return (
    <div style={styles.main}>
      <MDBCard style={styles.card} color="warning">
        <MDBCardBody>
          <MDBCardTitle style={{ textAlign: "center" }}>
            Not allowed
          </MDBCardTitle>
          <MDBCardText>You are not allowed to perform this action</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

const styles = {
  main: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "99",
    backdropFilter: "blur(4px)",
  },
  card: {
    top: "50%",
    margin: "auto",
    width: "300px",
    height: "fit-content",
    zIndex: "99",
    backgroundColor: "#FFA900",
  },
};
