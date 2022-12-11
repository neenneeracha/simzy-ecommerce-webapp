/********************************************************************
 *
 * ProfileSection.jsx
 *
 *    This file represents the profile component use in the
 *    user profile page whcih allow user to view and edit
 *    their personal information.
 *
 ********************************************************************
 */

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useUser } from "../../UserContext";
import PasswordModal from "./PasswordModal";
import UserInfo from "./UserInfo";
import EditUserInfo from "./EditUserInfo";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    margin: "30px",
    height: "45px",
  },
  secondaryButton: {
    backgroundColor: "#9e9e9e",
    borderColor: "#9e9e9e",
    color: "white",
    borderRadius: "5px",
    margin: "30px",
    height: "45px",
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

const NormalText = styled.div``;

const Date = styled.p`
  color: silver;
  font-size: 18px;
  font-family: garamond;
  margin-top: -14px;
`;

const ProfileSection = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(false);
  const [changed, setChanged] = useState(false);
  const [submit, setSubmit] = useState(false);
  const user = useUser();
  const fontSize = useSelector((state) => state.fontSize);

  // get user's information
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/" + user.user_id
        );

        if (res.data.length > 0) {
          var date = new window.Date(res.data[0].created_at)
            .toISOString()
            .replace(/T.*/, "")
            .split("-")
            .reverse()
            .join("/");
          res.data[0].created_at = date;
        }
        setUserInfo(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [user.user_id]);

  const handleChange = (show) => {
    setShow(show);
  };

  // reset input
  const handleReset = () => {
    setReset(true);
    setChanged(false);
  };

  // get back
  const handleBack = () => {
    setChanged(false);
    setEditProfile(false);
  };

  // handle with new user detail
  const handleSubmit = () => {
    setSubmit(true);
  };

  return (
    <Container>
      <PasswordModal show={show} handleChange={handleChange} />
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src={
                  process.env.PUBLIC_URL + userInfo.gender === "M"
                    ? "img/man-profile.jpg"
                    : userInfo.gender === "W"
                    ? "img/woman-profile.jpg"
                    : "img/other-profile.jpg"
                }
                alt="avatar"
                className="rounded-circle"
                style={{ width: "225px", height: "225px", objectFit: "cover" }}
                fluid
              />
              <Text style={{ fontSize: `${24 + fontSize.fontSize}px` }}>
                Personal Information : User #{user.user_id}
              </Text>
              <Date style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
                Created on {userInfo.created_at}
              </Date>
              <div className="d-flex justify-content-center mb-2"></div>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="mb-4 mb-lg-0">
            <MDBCardBody className="p-3">
              {editProfile === true ? (
                <>
                  <Button
                    className="d-block mx-auto w-75 mt-5"
                    style={styles.customButton}
                    onClick={handleSubmit}
                    disabled={!changed}
                  >
                    <NormalText
                      style={{
                        fontSize: `${18 + fontSize.fontSize}px`,
                      }}
                    >
                      SAVE CHANGES
                    </NormalText>
                  </Button>
                  <Button
                    className="d-block mx-auto w-75 h-45"
                    style={styles.secondaryButton}
                    onClick={handleReset}
                    disabled={!changed}
                  >
                    <NormalText
                      style={{
                        fontSize: `${18 + fontSize.fontSize}px`,
                      }}
                    >
                      {" "}
                      RESET MY INFORMATION{" "}
                    </NormalText>
                  </Button>
                  <Button
                    className="d-block mx-auto w-75 mb-6"
                    style={styles.secondaryButton}
                    onClick={handleBack}
                  >
                    <NormalText
                      style={{
                        fontSize: `${18 + fontSize.fontSize}px`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      BACK TO MY INFORMATION
                    </NormalText>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="d-block mx-auto w-75"
                    style={styles.customButton}
                    onClick={() => setEditProfile(true)}
                  >
                    <NormalText
                      style={{
                        fontSize: `${18 + fontSize.fontSize}px`,
                      }}
                    >
                      EDIT INFORMATION
                    </NormalText>
                  </Button>
                  <Button
                    className="d-block mx-auto w-75"
                    style={styles.customButton}
                    onClick={() => setShow(true)}
                  >
                    <NormalText
                      style={{
                        fontSize: `${18 + fontSize.fontSize}px`,
                      }}
                    >
                      CHANGE PASSWORD
                    </NormalText>
                  </Button>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol lg="8">
          {editProfile === true ? (
            <EditUserInfo
              userInfo={userInfo}
              reset={reset}
              submit={submit}
              setReset={setReset}
              setSubmit={setSubmit}
              setChanged={setChanged}
            />
          ) : (
            <UserInfo userInfo={userInfo} />
          )}
        </MDBCol>
      </MDBRow>
    </Container>
  );
};

export default ProfileSection;
