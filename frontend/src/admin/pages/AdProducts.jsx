import React from "react";
import styled from "styled-components";
import AdSidebar from "../components/AdSidebar";
import AdNavbar from "../components/AdNavbar";


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

const AdProducts = () => {
  return (
    <div>
    <Home>
      <AdSidebar />
      <Container>
        <AdNavbar />
        <ListContainer>


        </ListContainer>
        
      </Container>
    </Home>
  </div>
  );
};

export default AdProducts;
