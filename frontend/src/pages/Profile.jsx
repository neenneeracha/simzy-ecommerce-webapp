import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from "styled-components";
const Container = styled.div``;
const Content = styled.div`
 
`;

const Profile = () => {
  return (
    <Container>
      <Content>
        <Navbar />
      </Content>

      <Footer />
    </Container>
  );
};

export default Profile;
