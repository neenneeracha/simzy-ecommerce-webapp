import React from "react";
import styled from "styled-components";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import AdSidebar from "../components/AdSidebar";
import AdNavbar from "../components/AdNavbar";
import AdDataTable from "../components/AdDataTable";
const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;
const ListContainer = styled.div`
  margin-top: 10px;
  flex: 6;
`;

const AdOrder = () => {
  return (
    <Container>
      <AdSidebar />
      <ListContainer>
        <AdNavbar />
        <AdDataTable />
      </ListContainer>
    </Container>
  );
};

export default AdOrder;
