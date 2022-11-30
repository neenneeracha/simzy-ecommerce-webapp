import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    margin: "30px",
  },
};

const Container = styled.div`
  min-height: 68vh;
  padding: 3%;
`;

const OrderHistory = () => {
  return (
    <Container>
      <Table striped bordered hover style={{ width: "80%", margin: "auto" }}>
      <thead>
        <tr>
          <th>ORDER REFERENCE</th>
          <th>ORDER DATE</th>
          <th>STATUS</th>
          <th>TOTAL</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>26 Sep 2022</td>
          <td>PROCESSING</td>
          <td>THB 1,750</td>
          <td>
            <Link style={{ textDecoration: "none" }} to="/Summary">
              <Button
                className="d-block mx-auto w-75"
                style={styles.customButton}
              >
                VIEW ORDER
              </Button>
            </Link>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>26 Sep 2022</td>
          <td>PROCESSING</td>
          <td>THB 1,750</td>
          <td>
            <Link style={{ textDecoration: "none" }} to="/Summary">
              <Button
                className="d-block mx-auto w-75"
                style={styles.customButton}
              >
                VIEW ORDER
              </Button>
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
    </Container>
    
  );
};

export default OrderHistory;
