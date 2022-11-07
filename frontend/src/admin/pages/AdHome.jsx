import React from "react";
import AdSidebar from "../components/AdSidebar";
import AdNavbar from "../components/AdNavbar";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 10px;
  flex: 6;
`;
const Home = styled.div`
  display: flex;
  margin-top: 10px;
`;
const AdHome = () => {
  return (
    <div>
      <Home>
        <AdSidebar />
        <Container>
          <AdNavbar />
          HomeContainer
        </Container>
      </Home>
    </div>
  );
};

export default AdHome;
