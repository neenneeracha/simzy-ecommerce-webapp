import styled from "styled-components";
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";
import { Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from "react";

/* innital default value */
const initialFValues = {
  order_id: "",
  payment_type: "",
  status: "",
  user_id: "",
  po_status: "",
  name: "",
  surname: "",
  phone_number: "",
  address: "",
  district: "",
  province: "",
  zip_code: "",
  created_at: "",
  updated_at: "",
  quantity: "",
  product_name: "",
  price: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

// Array contain order Status
const orderStatus = [
  { id: "0", title: "Prepared" },
  { id: "1", title: "In progress" },
  { id: "2", title: "Completed" },
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
    marginLeft: "50%",
    marginTop: "80px",
  },
};

const Header = styled.h5`
  margin-top: 20px;
`;
const Index = styled.h6`
  margin-left: 20px;
  margin-top: 20px;
`;

const OrderForm = (props) => {
  const { addOrEdit, recordForEdit } = props;
  const classes = useStyles();
  const { values, setValues, errors, setErrors, handleChange } =
    UseForm(initialFValues);
  const [orderedItems, setOrderedItems] = useState([]);

  //update edit information
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  useEffect(() => {
    const getOrderedItems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/order/products/" + values.order_id
        );
        setOrderedItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrderedItems();
  }, [values.order_id]);

  return (
    <Container>
      <Wrapper>
        <Form>
          <Paper className={classes.root} elevation={0}>
            <Header> Ordered product information </Header>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input
                  name="order_id"
                  label="Order ID"
                  value={values.order_id}
                  onChange={handleChange}
                  error={errors.order_id}
                />
                <Controls.Input
                  name="name"
                  label="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
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
                  label="Province"
                  value={values.province}
                  onChange={handleChange}
                  error={errors.province}
                />
                <Controls.Input
                  name="created_at"
                  label="Created At"
                  value={values.created_at}
                  onChange={handleChange}
                  error={errors.created_at}
                />
                <Controls.Select
                  name="status"
                  label="Order Status"
                  value={values.status}
                  onChange={handleChange}
                  options={orderStatus}
                  error={errors.status}
                />
              </Grid>

              <Grid item xs={6}>
                <Controls.Input
                  name="phone_number"
                  label="Phone Number"
                  value={values.phone_number}
                  onChange={handleChange}
                  error={errors.phone_number}
                />
                <Controls.Input
                  name="surname"
                  label="Surname"
                  value={values.surname}
                  onChange={handleChange}
                  error={errors.surname}
                />
                <Controls.Input
                  name="district"
                  label="district"
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
                <Controls.Input
                  name="updated_at"
                  label="Updated At"
                  value={values.updated_at}
                  onChange={handleChange}
                  error={errors.updated_at}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.root} elevation={0}>
            <Header> Product information </Header>
            {orderedItems.map((orderedItem, index) => (
              <Grid container>
                <Grid item xs={6}>
                  {" "}
                  <Index>Product: {index + 1}</Index>
                  <Controls.Input
                    name="product_id"
                    label="Product ID"
                    value={orderedItem.product_id}
                    onChange={handleChange}
                  />
                  <Controls.Input
                    name="quantity"
                    label="Ordered Quantity"
                    value={orderedItem.quantity}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                </Grid>

                <Grid item xs={6} style={{ marginTop: "50px" }}>
                  <Controls.Input
                    name="product_name"
                    label="Product Name"
                    value={orderedItem.product_name}
                    onChange={handleChange}
                  />

                  <Controls.Input
                    name="price"
                    label="Price/Piece"
                    value={orderedItem.price}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            ))}
            <Controls.Input
              name="total"
              label="Total Amount ( Thai Baht )"
              value={orderedItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
              onChange={handleChange}
            />
          </Paper>

          <Paper className={classes.root} elevation={0}>
            <Header> Payment information </Header>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input
                  name="payment_id"
                  label="Payment ID"
                  value={values.payment_id}
                  onChange={handleChange}
                />

                <Controls.Input
                  name="status"
                  label="Status"
                  value={values.status}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  name="payment_type"
                  label="Payment Type"
                  value={values.payment_type}
                  onChange={handleChange}
                />

                <Controls.Button
                  type="submit"
                  text="Submit"
                  startIcon={<SaveIcon />}
                  style={styles.customButton}
                />
              </Grid>
            </Grid>
          </Paper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default OrderForm;
