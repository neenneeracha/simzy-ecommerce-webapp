import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";
import AddImage from "../components/AddImage";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";

/* innital default value */
const initialFValues = {
  id: 0,
  productName: "",
  category: "",
  description: "",
  details: "",
  price: "",
  mainColor: "",
  image: "",
  size: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div``;

const Header = styled.h5`
  margin-top: 20px;
`;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginRight: "50px",
  },
};

const ProductForm = (props) => {
  const [validated, setValidated] = useState(false);
  const { recordForEdit, isMainColor } = props;
  const { values, setValues, errors, setErrors, handleChange, resetForm } =
    UseForm(initialFValues, true);
  const classes = useStyles();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          {isMainColor === true ? (
            <Paper className={classes.root} elevation={0}>
              <Header> Basic Infomation</Header>
              <Grid container>
                <Grid item xs={6}>
                  <Controls.Input
                    name="product_name"
                    label="Product Name"
                    value={values.product_name}
                  />{" "}
                  <Controls.Input
                    name="price"
                    label="Price"
                    value={values.price}
                  />
                </Grid>
                <Grid item xs={6}>
                  {" "}
                  <Controls.Input
                    name="price"
                    label="Price"
                    value={values.price}
                  />{" "}
                  <Controls.Input
                    name="sub_category"
                    label="Sub Category"
                    value={values.sub_category}
                  />{" "}
                </Grid>
                <Controls.Input
                  name="description"
                  label="Description"
                  value={values.description}
                />{" "}
                <Controls.Input
                  name="detail"
                  label="Detail"
                  fullWidth
                  value={values.detail}
                />
              </Grid>
            </Paper>
          ) : (
            <></>
          )}
          <Paper className={classes.root} elevation={0}>
            <Header>Color Detail</Header>
            <Grid container>
              {" "}
              <Controls.Input
                name="color"
                label="Color"
                value={values.color}
              />{" "}
              <AddImage />
            </Grid>
          </Paper>

          <Paper className={classes.root} elevation={0}>
            <Header>Size Detail</Header>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input name="xs" label="Size XS" fullWidth />
                <Controls.Input name="M" label="Size M" fullWidth />
                <Controls.Input name="XL" label="Size XL" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input name="S" label="Size S" fullWidth />
                <Controls.Input name="L" label="Size L" fullWidth />

                <div style={{ marginTop: "80px" }}>
                  <Link to="/successadded" style={{ textDecoration: "none" }}>
                    <Controls.Button
                      // type="submit"
                      text="Submit"
                      startIcon={<SaveIcon />}
                      style={styles.customButton}
                    />
                  </Link>

                  <Controls.Button
                    text="Reset"
                    color="default"
                    startIcon={<DeleteIcon />}
                    onClick={resetForm}
                  />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ProductForm;
