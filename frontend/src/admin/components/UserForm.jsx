import React, { useEffect } from "react";
import styled from "styled-components";
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";

/* initial default form values */
const initialFValues = {
  is_admin: "",
  email: "",
  name: "",
  surname: "",
  password: "",
  gender: "",
  phone_number: "",
  address: "",
  district: "",
  province: "",
  zip_code: "",
  updated_at: "",
};

const LinkItem = styled.span`
  color: #eda3b5;
  text-decoration: underline;

  &:hover {
    font-weight: bold;
    color: black;
  }
`;

const Text = styled.div`
  text-align: center;
`;

// Array contain gender item
const genderItems = [
  { id: "M", title: "Male" },
  { id: "W", title: "Female" },
  { id: "O", title: "Other" },
];

const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
`;
const Wrapper = styled.div``;
const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
  },
};

const UserForm = ({ addOrEdit, recordForEdit, formType, setChanged }) => {
  // form validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "First name is required";
    if ("surname" in fieldValues)
      temp.surname = fieldValues.surname ? "" : "Surname is required";
    if ("email" in fieldValues)
      temp.email = !fieldValues.email
        ? "Email is required"
        : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fieldValues.email)
        ? "Email is not valid"
        : "";

    if ("password" in fieldValues) {
      if (formType !== "edit") {
        temp.password = fieldValues.password ? "" : "Password is required";
      }
      if (temp.password === "" || formType === "edit") {
        const checkPassword = fieldValues.password.split(" ").join("").length;
        if (checkPassword > 0 && checkPassword < 6) {
          temp.password = "Password should be at least 6 characters long";
        } else {
          temp.password = "";
        }
      }
    }

    if ("phone_number" in fieldValues)
      temp.phone_number = !fieldValues.phone_number
        ? "Phone Number is required"
        : fieldValues.phone_number.length < 9 ||
          fieldValues.phone_number.length > 10
        ? "Phone Number is invalid"
        : "";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Address is required";
    if ("district" in fieldValues)
      temp.district = fieldValues.district ? "" : "District is required";
    if ("province" in fieldValues)
      temp.province = fieldValues.province ? "" : "Province is required";
    if ("zip_code" in fieldValues)
      temp.zip_code = fieldValues.zip_code ? "" : "Zip Code is required";

    // save error value into "errors"
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      // return boolean value if the validation is valid or not
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleChange, resetForm } =
    UseForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  const handleInput = (e) => {
    setChanged(true);
    if (e.target.name === "is_admin") {
      e.target.value = !values.is_admin;
    }
    handleChange(e);
  };

  // update edit information
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
    setChanged(false);
  }, [recordForEdit, setValues, setChanged]);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            {formType === "view" ? (
              <>
                <Grid item xs={6}>
                  <Controls.Input
                    name="name"
                    label="First Name"
                    value={values.name}
                    readOnly
                  />
                  <Controls.Input
                    name="email"
                    label="Email"
                    value={values.email}
                    readOnly
                  />
                  <Controls.Input
                    name="address"
                    label="Address"
                    value={values.address}
                    readOnly
                  />
                  <Controls.Input
                    name="province"
                    label="province"
                    value={values.province}
                    readOnly
                  />
                  <Controls.Input
                    name="update"
                    label="Latest Update"
                    value={values.updated_at}
                    readOnly
                  />
                  <Controls.CheckBox
                    name="is_admin"
                    label="Admin"
                    value={values.is_admin}
                    readOnly
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.Input
                    name="surname"
                    label="Last Name"
                    value={values.surname}
                    readOnly
                  />
                  <Controls.Input
                    name="phone_number"
                    label="Phone Number"
                    value={values.phone_number}
                    readOnly
                  />
                  <Controls.Input
                    name="district"
                    label="District"
                    value={values.district}
                    readOnly
                  />
                  <Controls.Input
                    name="zip_code"
                    label="Zip Code"
                    value={values.zip_code}
                    readOnly
                  />
                  <Controls.RadioGroup
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    items={genderItems}
                    readOnly
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Controls.Input
                    name="name"
                    label="First Name"
                    value={values.name}
                    onChange={handleInput}
                    error={errors.name}
                  />
                  <Controls.Input
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInput}
                    error={errors.email}
                  />
                  <Controls.Input
                    name="phone_number"
                    label="Phone Number"
                    value={values.phone_number}
                    onChange={handleInput}
                    error={errors.phone_number}
                  />
                  <Controls.Input
                    name="district"
                    label="District"
                    value={values.district}
                    onChange={handleInput}
                    error={errors.district}
                  />
                  <Controls.Input
                    name="zip_code"
                    label="Zip Code"
                    value={values.zip_code}
                    onChange={handleInput}
                    error={errors.zip_code}
                  />
                  <Controls.CheckBox
                    name="is_admin"
                    label="Admin"
                    value={values.is_admin}
                    onChange={handleInput}
                    checked={values.is_admin === 1}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.Input
                    name="surname"
                    label="Last Name"
                    value={values.surname}
                    onChange={handleInput}
                    error={errors.surname}
                  />
                  {formType === "edit" ? (
                    <Controls.Input
                      name="password"
                      label="New Password (optional)"
                      value={values.password}
                      onChange={handleInput}
                      error={errors.password}
                      type="password"
                    />
                  ) : (
                    <Controls.Input
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleInput}
                      error={errors.password}
                      type="password"
                    />
                  )}

                  <Controls.Input
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={handleInput}
                    error={errors.address}
                  />
                  <Controls.Input
                    name="province"
                    label="province"
                    value={values.province}
                    onChange={handleInput}
                    error={errors.province}
                  />
                  <Controls.RadioGroup
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={handleInput}
                    items={genderItems}
                  />
                  {formType === "edit" ? (
                    <>
                      <Controls.Button
                        type="submit"
                        text="Submit"
                        startIcon={<SaveIcon />}
                        style={styles.customButton}
                      />
                      <Controls.Button
                        text="Clear From"
                        color="default"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          resetForm();
                          setChanged(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Controls.Button
                        className="d-block mx-auto w-75"
                        type="submit"
                        text="Submit"
                        style={styles.customButton}
                      />
                    </>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default UserForm;
