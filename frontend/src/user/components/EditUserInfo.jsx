/********************************************************************
 *
 * EditUserInfo.jsx
 *
 *    This file represents the component of the profile page
 *    for users to edit their personal information.
 *
 ********************************************************************
 */

 import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import axios from "axios";
import { toast } from "react-toastify";

import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody
  } from "mdb-react-ui-kit";

  const Line = styled.hr`
`;

const Radio = styled.div`
  color: ${(props) => props.color};
`;

const EditUserInfo = ({ userInfo, reset, submit, setReset, setSubmit, setChanged }) => {
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
      const [errors, setErrors] = useState({});

      // set a new state for the input
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setChanged(true)

        if (!!errors[e.target.name]) {
          setErrors((prev) => ({ ...prev, [e.target.name]: null }));
        }
      };

      // reset input information
      useEffect(() => {
        const resetInfo = () => {
          if (reset) {
            setInputs((prev) => ({ ...prev, firstname: userInfo.name }));
            if (!!errors.firstname) {
              setErrors((prev) => ({ ...prev, firstname: null }));
            }
            setInputs((prev) => ({ ...prev, lastname: userInfo.surname }));
            if (!!errors.lastname) {
              setErrors((prev) => ({ ...prev, lastname: null }));
            }
            setInputs((prev) => ({ ...prev, email: userInfo.email }));
            if (!!errors.email) {
              setErrors((prev) => ({ ...prev, email: null }));
            }
            setInputs((prev) => ({ ...prev, gender: userInfo.gender }));
            if (!!errors.gender) {
              setErrors((prev) => ({ ...prev, gender: null }));
            }
            setInputs((prev) => ({ ...prev, address: userInfo.address }));
            if (!!errors.address) {
              setErrors((prev) => ({ ...prev, address: null }));
            }
            setInputs((prev) => ({ ...prev, district: userInfo.district }));
            if (!!errors.district) {
              setErrors((prev) => ({ ...prev, district: null }));
            }
            setInputs((prev) => ({ ...prev, province: userInfo.province }));
            if (!!errors.province) {
              setErrors((prev) => ({ ...prev, province: null }));
            }
            setInputs((prev) => ({ ...prev, zipCode: userInfo.zip_code }));
            if (!!errors.zipCode) {
              setErrors((prev) => ({ ...prev, zipCode: null }));
            }
            setInputs((prev) => ({ ...prev, phoneNumber: userInfo.phone_number }));
            if (!!errors.phoneNumber) {
              setErrors((prev) => ({ ...prev, phoneNumber: null }));
            }
            setReset(false)
          }
          
        };
        resetInfo()
        
      }, [reset, setReset, setInputs, userInfo, errors]);

      // update user new information
      useEffect(() => {
        const validateForm = () => {
          const newErrors = {};
          if (inputs.firstname.split(" ").join("").length < 1) {
            newErrors.firstname = "Please provide firstname";
          } else if (
            !Boolean(
              inputs.firstname
                .split(" ")
                .join("")
                .match(/^[A-Za-z]*$/)
            )
          ) {
            newErrors.firstname = "Firstname should contain only letters";
          }
          if (inputs.lastname.split(" ").join("").length < 1) {
            newErrors.lastname = "Please provide lastname";
          } else if (
            !Boolean(
              inputs.lastname
                .split(" ")
                .join("")
                .match(/^[A-Za-z]*$/)
            )
          ) {
            newErrors.lastname = "Lastname should contain only letters";
          }
          if (inputs.email.split(" ").join("").length < 1) {
            newErrors.email = "Please provide email";
          } else if (
            !Boolean(
              inputs.email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
            )
          ) {
            newErrors.email = "Please enter a valid email";
          }
      
          if (inputs.phoneNumber.split(" ").join("").length < 1) {
            newErrors.phoneNumber = "Please provide phone number";
          } else if (
            !Boolean(
              inputs.phoneNumber
                .split(" ")
                .join("")
                .match(/^[0-9]*$/)
            )
          ) {
            newErrors.phoneNumber = "Phone number should contain only numbers";
          } else if (inputs.phoneNumber.split(" ").join("").length > 10) {
            newErrors.phoneNumber = "Phone number should not exceed 10 digits";
          } else if (inputs.phoneNumber.split(" ").join("").length < 10) {
            newErrors.phoneNumber = "Phone number should be 10 digits";
          }
          if (inputs.gender.split(" ").join("").length < 1) {
            newErrors.gender = "Please provide gender";
          }
          if (inputs.address.split(" ").join("").length < 1) {
            newErrors.address = "Please provide address";
          }
          if (inputs.district.split(" ").join("").length < 1) {
            newErrors.district = "Please provide district";
          } else if (
            !Boolean(
              inputs.district
                .split(" ")
                .join("")
                .match(/^[A-Za-z]*$/)
            )
          ) {
            newErrors.district = "District should contain only letters";
          }
          if (inputs.province.split(" ").join("").length < 1) {
            newErrors.province = "Please provide province";
          } else if (
            !Boolean(
              inputs.province
                .split(" ")
                .join("")
                .match(/^[A-Za-z]*$/)
            )
          ) {
            newErrors.province = "Province should contain only letters";
          }
          if (inputs.zipCode.split(" ").join("").length < 1) {
            newErrors.zipCode = "Please provide zipcode";
          }
      
          return newErrors;
        };

        
        const updateProfile = async () => {
          if (submit) {
            const formErrors = validateForm();

          if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setSubmit(false)
          } else {
            setSubmit(false)
            try {
              const res = await axios.patch("http://localhost:8080/api/v1/user/update-info/" + user.user_id, inputs);
        
              if (res.status === 200) {
                toast.success(res.data.msg, {
                  position: "top-center",
                });
                setTimeout(function () {
                  window.location.reload();
                }, 3000);
              }
            } catch (err) {
              if (err.request.status === 409) {
                toast.error(err.response.data.msg, {
                  position: "top-center",
                });
              } else {
                toast.error("Something went wrong, please try again !!", {
                  position: "top-center",
                });
              }
              console.log(err);
            }
          }
          }
            
          
        };

        updateProfile()
        
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
                  style={{width: "580px"}}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.firstname}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.lastname}
                </Form.Control.Feedback>
        </MDBCol>
      </MDBRow>
      <Line />
      <MDBRow>
        <MDBCol sm="3">
          <MDBCardText>Gender</MDBCardText>
        </MDBCol>
        <MDBCol sm="9">
        {["radio"].map((type) => (
              <Radio key={`inline-${type}`} className="m-1" 
              >
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
              </Radio>
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
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.email}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.phoneNumber}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.address}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.district}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.district}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.province}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.province}
                </Form.Control.Feedback>
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
                  isInvalid={!!errors.zipCode}
                />
                <Form.Control.Feedback
                  style={{ maxWidth: "400px", marginTop: "-12px" }}
                  type="invalid"
                >
                  {errors.zipCode}
                </Form.Control.Feedback>
        </MDBCol>
      </MDBRow>
      <Line />
        </Form>
      
    </MDBCardBody>
  </MDBCard>
  )
}

export default EditUserInfo