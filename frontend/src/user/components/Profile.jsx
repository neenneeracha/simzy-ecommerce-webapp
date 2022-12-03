import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useUser } from "../../UserContext";
import PasswordModal from "./PasswordModal";
import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";
import axios from "axios";

import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";


const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    margin: "30px",
    height: "45px"
  },
};

const Container = styled.div`
  min-height: 68vh;
  padding: 4% 5%;
`;

const Text = styled.p`
  color: gray;
  font-size: 24px;
  font-family: garamond;
  margin-top: 10px;
`;

const Date = styled.p`
color: silver;
font-size: 18px;
font-family: garamond;
margin-top: -14px;
`;

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [show, setShow] = useState(false);
  const user = useUser();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/" + user.user_id
        );
        
        if (res.data.length > 0) {
          var date = new window.Date(res.data[0].created_at)
              .toISOString().replace(/T.*/,'')
              .split('-').reverse().join('/')
          res.data[0].created_at = date
        }
        setUserInfo(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [user.user_id]);

  const handleChange = (show) => {
    setShow(show)
  }

  return (
   <Container>
    <PasswordModal show={show} handleChange={handleChange}/>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={process.env.PUBLIC_URL + 
                    userInfo.gender === "M"? "img/man-profile.jpg" : 
                    userInfo.gender === "W"? "img/woman-profile.jpg" :
                    "img/other-profile.jpg"
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '225px',  height: '225px', objectFit: 'cover' }}
                  fluid />
                <Text>Personal Information : User #{user.user_id}</Text>
                <Date>Created on {userInfo.created_at}</Date>
                <div className="d-flex justify-content-center mb-2">
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-3">
              <Button
                className="d-block mx-auto w-75"
                style={styles.customButton}
                onClick={() => setEditProfile(!editProfile)}
              >
                {editProfile === true? 
            "VIEW MY INFORMATION"
            :
            "EDIT INFORMATION"
           
          }
                
              </Button>
              <Button
                className="d-block mx-auto w-75"
                style={styles.customButton}
                onClick={() => setShow(true)}
              >
                CHANGE PASSWORD
              </Button>
             </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            {editProfile === true? 
            <EditUserInfo userInfo={userInfo} />
            :
            <UserInfo userInfo={userInfo} />
           
          }
          
          </MDBCol>
        </MDBRow>
          
   </Container>
      
   
  );
};

export default Profile;
