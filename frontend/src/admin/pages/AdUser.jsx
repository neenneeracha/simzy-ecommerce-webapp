import React from "react";
import styled from "styled-components";
import AdSidebar from "../components/AdSidebar";
import AdNavbar from "../components/AdNavbar";
import AdDataTable from "../components/AdDataTable";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;
const ListContainer = styled.div`
  margin-top: 10px;
  flex: 6;
`;
const Title = styled.h2`
  width: 100%;
  color: black;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Top = styled.div`
  display: flex;
  margin: 30px;
`;

const AdUser = () => {
  return (
    <Container>
      <AdSidebar />
      <ListContainer>
        <AdNavbar />
        <Top>
          <Title>User List</Title>
          <Link to="/">
            <MDBBtn
              color="pink"
              style={{ marginRight: "30px", width: "200px" }}
            >
              + Add new User
            </MDBBtn>
          </Link>
        </Top>
        <AdDataTable />
      </ListContainer>
    </Container>
  );
};

export default AdUser;
