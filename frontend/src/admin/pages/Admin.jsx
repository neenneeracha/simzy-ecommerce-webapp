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
const Admin = () => {
  return (
    <div>
      <Home>
        <AdSidebar />
        <Container>
          <AdNavbar />
         adHomepage
        </Container>
      </Home>
    </div>
  );
};

export default Admin;