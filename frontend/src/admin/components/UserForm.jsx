import React, { useEffect } from "react";
import styled from "styled-components";
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { Link} from "react-router-dom";
/* innital default value */
const initialFValues = {
  is_admin: "",
  email: "",
  name: "",
  surname: "",
  password: "",
  gender: "O",
  phone_number: "",
  address: "",
  district: "",
  province: "",
  zip_code: "",
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

const UserForm = (props) => {
  const { addOrEdit, recordForEdit, isUserRegister } = props;

  // form validation
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "First name is reauired";
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

    if ("phone_number" in fieldValues)
      temp.phone_number = !fieldValues.phone_number
        ? "Phone Number is reauired"
        : fieldValues.phone_number.length < 9 ||
          fieldValues.phone_number.length > 10
        ? "Phone Number is invalid"
        : "";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "Address is reauired";
    if ("district" in fieldValues)
      temp.district = fieldValues.district ? "" : "District is reauired";
    if ("province" in fieldValues)
      temp.province = fieldValues.province ? "" : "Province is reauired";
    if ("zip_code" in fieldValues)
      temp.zip_code = fieldValues.zip_code ? "" : "Zip Code is reauired";

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
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="name"
                label="First Name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Controls.Input
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Controls.Input
                name="phone_number"
                label="Phone Number"
                value={values.phone_number}
                onChange={handleChange}
                error={errors.phone_number}
              />
              <Controls.Input
                name="district"
                label="District"
                value={values.district}
                onChange={handleChange}
                error={errors.district}
              />
              <Controls.Input
                name="zip_code"
                label="Zip Code"
                value={values.zip_code}
                onChange={handleChange}
                error={errors.zip_code}
              />
              {isUserRegister === false ? (
                <Controls.CheckBox
                  name="is_admin"
                  label="Admin"
                  value={values.is_admin}
                  onChange={handleChange}
                />
              ) : (
                <></>
              )}
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
                type="password"
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
              {isUserRegister === false ? (
                <div>
                  <Controls.Button
                    type="submit"
                    text="Submit"
                    startIcon={<SaveIcon />}
                    style={styles.customButton}
                  />
                  <Controls.Button
                    text="Reset"
                    color="default"
                    startIcon={<DeleteIcon />}
                    onClick={resetForm}
                  />
                </div>
              ) : (
                <div>
                  <Controls.Button
                    className="d-block mx-auto w-75"
                    type="submit"
                    text="Submit"
                    style={styles.customButton}
                  />
                  <Text style={{ marginTop: "2%" }} type="submit">
                    Already have an account? &nbsp;
                    <Link style={{ textDecoration: "none" }} to="/login">
                      <LinkItem>SIGN IN</LinkItem>
                    </Link>
                  </Text>
                </div>
              )}
            </Grid>
          </Grid>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default UserForm;
