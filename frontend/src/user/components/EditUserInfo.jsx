/********************************************************************
 *
 * EditUserInfo.jsx
 *
 *    This file represents the component of the profile page
 *    for users to edit their personal information.
 *
 ********************************************************************
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import axios from "axios";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";

const Line = styled.hr``;

const EditUserInfo = ({
  userInfo,
  reset,
  submit,
  setReset,
  setSubmit,
  setChanged,
}) => {
  const [inputs, setInputs] = useState({
    firstname: userInfo.name,
    lastname: userInfo.surname,
    email: userInfo.email,
    gender: userInfo.gender,
    address: userInfo.address,
    district: userInfo.district,
    province: userInfo.province,
    zipCode: userInfo.zip_code,
    phoneNumber: userInfo.phone_number,
  });
  const navigate = useNavigate();
  const user = useUser();

  // set a new state for the input
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setChanged(true);
  };

  // reset input information
  useEffect(() => {
    const resetInfo = () => {
      if (reset) {
        setInputs((prev) => ({ ...prev, firstname: userInfo.name }));
        setInputs((prev) => ({ ...prev, lastname: userInfo.surname }));
        setInputs((prev) => ({ ...prev, email: userInfo.email }));
        setInputs((prev) => ({ ...prev, gender: userInfo.gender }));
        setInputs((prev) => ({ ...prev, address: userInfo.address }));
        setInputs((prev) => ({ ...prev, district: userInfo.district }));
        setInputs((prev) => ({ ...prev, province: userInfo.province }));
        setInputs((prev) => ({ ...prev, zipCode: userInfo.zip_code }));
        setInputs((prev) => ({ ...prev, phoneNumber: userInfo.phone_number }));
        setReset(false);
      }
    };
    resetInfo();
  }, [reset, setReset, setInputs, userInfo]);

  // update user new information
  useEffect(() => {
    const updateProfile = async () => {
      if (submit) {
        setSubmit(false);
        try {
          const res = await axios.patch(
            "http://localhost:8080/api/v1/user/update-info/" + user.user_id,
            inputs
          );

          if (res.status === 200) {
            alert(res.data.msg);
            window.location.reload();
          }
        } catch (err) {
          if (err.request.status === 409) {
            alert(err.response.data.msg);
          }
          console.log(err);
        }
      }
    };

    updateProfile();
  }, [submit, inputs, user, navigate, setSubmit, setChanged]);

  return (
    <MDBCard className="p-4">
      <MDBCardBody>
        <Form>
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Name</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstname"
                value={inputs.firstname}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Surname</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastname"
                value={inputs.lastname}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Gender</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="m-1">
                  <Form.Check
                    inline
                    label="Woman"
                    name="gender"
                    value="W"
                    type={type}
                    id={`inline-${type}-1`}
                    onChange={handleChange}
                    checked={inputs.gender === "W"}
                  />
                  <Form.Check
                    inline
                    label="Man"
                    name="gender"
                    value="M"
                    type={type}
                    id={`inline-${type}-2`}
                    onChange={handleChange}
                    checked={inputs.gender === "M"}
                  />
                  <Form.Check
                    inline
                    label="Other"
                    name="gender"
                    value="O"
                    type={type}
                    id={`inline-${type}-3`}
                    onChange={handleChange}
                    checked={inputs.gender === "O"}
                  />
                </div>
              ))}
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Email</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={inputs.email}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Phone Number</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={inputs.phoneNumber}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Address</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={inputs.address}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>District</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="text"
                placeholder="Enter your district"
                name="district"
                value={inputs.district}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Province</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="text"
                placeholder="Enter your province"
                name="province"
                value={inputs.province}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
          <MDBRow>
            <MDBCol sm="3">
              <MDBCardText>Zipcode</MDBCardText>
            </MDBCol>
            <MDBCol sm="9">
              <Form.Control
                type="text"
                placeholder="Enter your Zipcode"
                name="zipCode"
                value={inputs.zipCode}
                required
                onChange={handleChange}
                style={{ width: "580px" }}
              />
            </MDBCol>
          </MDBRow>
          <Line />
        </Form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default EditUserInfo;
