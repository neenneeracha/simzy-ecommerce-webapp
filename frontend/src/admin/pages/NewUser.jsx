import React, { useEffect } from "react";
import styled from "styled-components";
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

/* innital default value */
const initialFValues = {
  isAdmin: false,
  email: "",
  firstname: "",
  surname: "",
  password: "",
  gender: "o",
  phoneNumber: "",
  address: "",
  district: "",
  province: "",
  zipCode: "",
};

// Array contain gender item
const genderItems = [
  { id: "m", title: "Male" },
  { id: "f", title: "Female" },
  { id: "o", title: "Other" },
];
const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
`;
const Wrapper = styled.div``;

const NewUser = (props) => {
  const { addOrEdit, recordForEdit } = props;

  // form validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstname" in fieldValues)
      temp.firstname = fieldValues.firstname ? "" : "First name is reauired";
    if ("surname" in fieldValues)
      temp.surname = fieldValues.surname ? "" : "Surname is reauired";
    if ("email" in fieldValues)
      temp.email = !fieldValues.email
        ? "Email is required"
        : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fieldValues.email)
        ? "Email is not valid"
        : "";

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Password is reauired";

    if ("phoneNumber" in fieldValues)
      temp.phoneNumber = !fieldValues.phoneNumber
        ? "Phone Number is reauired"
        : fieldValues.phoneNumber.length !== 10
        ? "Phone Number is invalid"
        : "";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Address is reauired";
    if ("district" in fieldValues)
      temp.district = fieldValues.district ? "" : "District is reauired";
    if ("province" in fieldValues)
      temp.province = fieldValues.province ? "" : "Province is reauired";
    if ("zipCode" in fieldValues)
      temp.zipCode = fieldValues.zipCode ? "" : "Zip Code is reauired";

    // save error value into "errors"
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      // retrun boolean value if the validation is valite or not
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleChange, resetForm } =
    UseForm(initialFValues, true, validate);
  //

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  //update edit information
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Container>
      {/* <NavbarAd /> */}
      <Wrapper>
        {/* <Top>
          <Backbtn />
          <Title>Add New User</Title>
        </Top> */}
        {/* <Paper className={paperClasses.pageContent}> */}
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="firstname"
                label="First Name"
                value={values.firstname}
                onChange={handleChange}
                error={errors.firstname}
              />
              <Controls.Input
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Controls.Input
                name="phoneNumber"
                label="Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                error={errors.phoneNumber}
              />
              <Controls.Input
                name="district"
                label="District"
                value={values.district}
                onChange={handleChange}
                error={errors.district}
              />
              <Controls.Input
                name="zipCode"
                label="Zip Code"
                value={values.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                name="surname"
                label="Last Name"
                value={values.surname}
                onChange={handleChange}
                error={errors.surname}
              />
              <Controls.Input
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Controls.Input
                name="address"
                label="Address"
                value={values.address}
                onChange={handleChange}
                error={errors.address}
              />
              <Controls.Input
                name="province"
                label="province"
                value={values.province}
                onChange={handleChange}
                error={errors.province}
              />
              <Controls.RadioGroup
                name="gender"
                label="Gender"
                value={values.gender}
                onChange={handleChange}
                items={genderItems}
              />{" "}
              <Controls.CheckBox
                name="isAdmin"
                label="Admin"
                value={values.isAdmin}
                onChange={handleChange}
              />
              <div>
                <Controls.Button
                  type="submit"
                  text="Submit"
                  startIcon={<SaveIcon />}
                />
                <Controls.Button
                  text="Reset"
                  color="default"
                  startIcon={<DeleteIcon />}
                  onClick={resetForm}
                />
              </div>
            </Grid>
          </Grid>
        </Form>
        {/* </Paper> */}
      </Wrapper>
    </Container>
  );
};

export default NewUser;
