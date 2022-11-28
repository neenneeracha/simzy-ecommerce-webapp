import React from "react";
import NavbarAd from "../components/NavbarAd";
import styled from "styled-components";

const Container = styled.div``;
const Home = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  background-color: #fff8f9;
`;
const Admin = () => {
  return (
    <div>
      <Home>
        <Container>
          <NavbarAd />
          adHomepage
        </Container>
      </Home>
    </div>
  );
};

export default Admin;
