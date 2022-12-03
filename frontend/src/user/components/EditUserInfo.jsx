import React, { useState } from 'react'
import styled from "styled-components";
import Form from "react-bootstrap/Form";

import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody
  } from "mdb-react-ui-kit";

  const Line = styled.hr`
`;

const EditUserInfo = ({ userInfo }) => {
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

      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

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
                  style={{width: "580px"}}
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
                  style={{width: "580px"}}
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
                  defaultChecked={inputs.gender === "W"}
                />
                <Form.Check

                  inline
                  label="Man"
                  name="gender"
                  value="M"
                  type={type}
                  id={`inline-${type}-2`}
                  onChange={handleChange}
                  defaultChecked={inputs.gender === "M"}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="gender"
                  value="O"
                  type={type}
                  id={`inline-${type}-3`}
                  onChange={handleChange}
                  defaultChecked={inputs.gender === "O"}
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
                  style={{width: "580px"}}
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
                  style={{width: "580px"}}
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
                  style={{width: "580px"}}
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
                  style={{width: "580px"}}
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
                  style={{width: "580px"}}
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
                  style={{width: "580px"}}
                />
        </MDBCol>
      </MDBRow>
      <Line />
        </Form>
      
    </MDBCardBody>
  </MDBCard>
  )
}

export default EditUserInfo