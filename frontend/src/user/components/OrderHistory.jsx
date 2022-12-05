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
padding: 4% 5%;
`;

const Thread = styled.thead`
`;

const TableRow = styled.tr`
`;

const TableHeader = styled.th`
`;

const TableBody = styled.tbody`
`;

const TableData = styled.td`
`;

const OrderHistory = () => {
  const headers = ["ORDER REFERENCE", "ORDER DATE", "STATUS", "TOTAL"];
  return (
    <Container>
      <Table striped bordered hover>
      <Thread>
        <TableRow>
        {headers.map((header, index) => (
                <TableHeader key={index} style={{ padding: "20px", fontSize: "16px" }}>{header}</TableHeader>
        ))}
        </TableRow>
      </Thread>
      <TableBody>
        <TableRow>
          <TableData>1</TableData>
          <TableData>26 Sep 2022</TableData>
          <TableData>PROCESSING</TableData>
          <TableData>THB 1,750</TableData>
          <TableData>
            <Link style={{ textDecoration: "none" }} to="/Summary">
              <Button
                className="d-block mx-auto w-75"
                style={styles.customButton}
              >
                VIEW ORDER
              </Button>
            </Link>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>2</TableData>
          <TableData>26 Sep 2022</TableData>
          <TableData>PROCESSING</TableData>
          <TableData>THB 1,750</TableData>
          <TableData>
            <Link style={{ textDecoration: "none" }} to="/Summary">
              <Button
                className="d-block mx-auto w-75"
                style={styles.customButton}
              >
                VIEW ORDER
              </Button>
            </Link>
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
    </Container>
    
  );
};

export default OrderHistory;
