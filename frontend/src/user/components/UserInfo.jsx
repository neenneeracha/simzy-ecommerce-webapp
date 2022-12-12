/********************************************************************
 *
 * UserInfo.jsx
 *
 *    This file represents the user information in the user
 *    profile page
 *
 ********************************************************************
 */

import React from "react";
import styled from "styled-components";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";

const Line = styled.hr``;

const UserInfo = ({ userInfo }) => {
  return (
    <MDBCard className="p-4">
      <MDBCardBody>
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Name</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">{userInfo.name}</MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Surname</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">{userInfo.surname}</MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Gender</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">
              {userInfo.gender === "M"
                ? "Man"
                : userInfo.gender === "W"
                ? "Woman"
                : "Other"}
            </MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Email</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">{userInfo.email}</MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Phone Number</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">
              {userInfo.phone_number}
            </MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Address</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">{userInfo.address}</MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>District</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">
              {userInfo.district}
            </MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Province</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">
              {userInfo.province}
            </MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
        <MDBRow>
          <MDBCol sm="3">
            <MDBCardText>Zipcode</MDBCardText>
          </MDBCol>
          <MDBCol sm="9">
            <MDBCardText className="text-muted">
              {userInfo.zip_code}
            </MDBCardText>
          </MDBCol>
        </MDBRow>
        <Line />
      </MDBCardBody>
    </MDBCard>
  );
};

export default UserInfo;
