import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import OrderHistory from "../components/OrderHistory";
import ProfileSection from "../components/ProfileSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  position: relative;  
`;

const Title = styled.h3`
margin: 40px 20px;
text-align: center;
color: #eda3b5;
font-weight: bold;
font-size: 40px;
`;

const Tabs = styled.div`
  margin: 3%;
`;

const Header = styled.h6`
text-align: center;
color: ${props => props.color};
font-weight: ${props => props.weight};
margin: auto;

&:hover {
    color: #eda3b5;
  }
`;

const Profile = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  return (
    <Container>
      <Navbar />
      <Title>Profile</Title>
      <Tabs>
      <MDBTabs justify>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            <Header 
            color={justifyActive === "tab1" ? "black" : "silver"}
            weight={justifyActive === "tab1" ? "bold" : undefined}
            >
              Profile
            </Header>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            <Header 
            color={justifyActive === "tab2" ? "black" : "silver"}
            weight={justifyActive === "tab2" ? "bold" : undefined}
            >
              Order History
            </Header>
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane className="border border-top-0 " show={justifyActive === "tab1"}>
          <ProfileSection />
        </MDBTabsPane>
        <MDBTabsPane className="border border-top-0" show={justifyActive === "tab2"}>
          <OrderHistory />
        </MDBTabsPane>
      </MDBTabsContent>
      </Tabs>
      
      <Footer/>
    </Container>
  );
};

export default Profile;
