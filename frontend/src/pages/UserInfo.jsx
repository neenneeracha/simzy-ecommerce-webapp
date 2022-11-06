import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import History from "../components/History";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Header = styled.h3`
  margin: 40px 20px 20px;
  text-align: center;
  color: #eda3b5;
  font-weight: bold;
`;

const Test = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value: string) => {
      if (value === justifyActive) {
        return;
      }
  
      setJustifyActive(value);
    };
  
    return (
      <>
        <Navbar/>
        <Header> Membership</Header>
        <MDBTabs justify className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              <h6>Profile</h6>
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            <h6>Orders History</h6>
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
  
        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === 'tab1'}><Profile/></MDBTabsPane>
          <MDBTabsPane show={justifyActive === 'tab2'}><History/></MDBTabsPane>
        </MDBTabsContent>
      </>
    );
}

export default Test