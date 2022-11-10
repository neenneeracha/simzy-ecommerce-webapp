import React from "react";
import styled from "styled-components";
import AdSidebar from "../components/AdSidebar";
import AdNavbar from "../components/AdNavbar";
import AdDataTable from "../components/AdDataTable";
import Product from "../../user/pages/Product";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const Container = styled.div`
  margin-top: 10px;
  flex: 6;
`;
const ListContainer = styled.div`
  margin-top: 10px;
  flex: 6;
`;
const Home = styled.div`
  display: flex;
  margin-top: 10px;
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
const rootElement = document.getElementById("root");
ReactDOM.render(<data />, rootElement);

const AdProducts = () => {
  return (
    <div>
      <Home>
        <AdSidebar />
        <Container>
          <AdNavbar />
          <ListContainer>
            <Top>
              <Title>Product List</Title>
              <Link to="/ProductInfo">
                <MDBBtn
                  color="pink"
                  style={{ marginRight: "30px", width: "200px" }}
                >
                  + Add New product
                </MDBBtn>
              </Link>
            </Top>
            <AdDataTable />
          </ListContainer>
        </Container>
      </Home>
    </div>
  );
};

export default AdProducts;
