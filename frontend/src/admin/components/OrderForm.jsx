/********************************************************************
 *
 * OrderForm.jsx
 *
 *   This file represents the components of the order form
 *
 ********************************************************************
 */

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
  status_id: "",
  description: "",
  name: "",
  surname: "",
  phone_number: "",
  address: "",
  district: "",
  province: "",
  zip_code: "",
  created_at: "",
  updated_at: "",
  total_price: "",
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

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginLeft: "50%",
    marginTop: "28px",
  },
};

const Header = styled.h5`
  margin-top: 20px;
`;

const Index = styled.h6`
  margin-left: 20px;
  margin-top: 20px;
  color: #eda3b5;
`;

const Imagethumbnail = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 30px;
`;

const Line = styled.hr`
  margin-top: 20px;
`;

const LineBreak = styled.p`
  height: 10px;
`;

const OrderForm = ({ recordForEdit, formType, orderStatus, handleEdit }) => {
  const classes = useStyles();
  const { values, setValues, handleChange, resetForm } =
    UseForm(initialFValues);
  const [orderedItems, setOrderedItems] = useState([]);

  //update edit information
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  // get the items ordered in the order
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

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(values, resetForm);
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Paper className={classes.root} elevation={0}>
            <Header> Order Information </Header>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input
                  name="order_id"
                  label="Order ID"
                  value={values.order_id}
                  readOnly
                />
                <Controls.Input
                  name="created_at"
                  label="Ordered Date"
                  value={values.created_at}
                  readOnly
                />
              </Grid>

              <Grid item xs={6}>
                {formType === "view" ? (
                  <Controls.Input
                    name="order_status"
                    label="Order Status"
                    value={values.description}
                    readOnly
                  />
                ) : (
                  <Controls.Select
                    name="status_id"
                    label="Order Status"
                    value={values.status_id}
                    onChange={handleChange}
                    options={orderStatus}
                  />
                )}

                <Controls.Input
                  name="created_at"
                  label="Latest Update"
                  value={values.updated_at}
                  readOnly
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.root} elevation={0}>
            <Header> Payment Information </Header>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input
                  name="payment_id"
                  label="Payment ID"
                  value={values.payment_id}
                  readOnly
                />
                <Controls.Input
                  name="payment_type"
                  label="Payment Type"
                  value={
                    values.payment_type === 1
                      ? "Cash on Delivery"
                      : "Card Payment"
                  }
                  readOnly
                />
              </Grid>

              <Grid item xs={6}>
                <Controls.Input
                  name="user_id"
                  label="User ID"
                  value={values.user_id}
                  readOnly
                />
                <Controls.Input
                  name="payment_status"
                  label="Payment Status"
                  value={values.status === 0 ? "Pending" : "Paid"}
                  readOnly
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.root} elevation={0}>
            <Header> Shipping Details </Header>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input
                  name="name"
                  label="Recipient Name"
                  value={values.name}
                  readOnly
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  name="surname"
                  label="Recipient Surname"
                  value={values.surname}
                  readOnly
                />
              </Grid>

              <Controls.Input
                name="address"
                label="Address"
                value={values.address}
                readOnly
              />
              <Grid item xs={6}>
                <Controls.Input
                  name="district"
                  label="District"
                  value={values.district}
                  readOnly
                />
                <Controls.Input
                  name="zip_code"
                  label="ZIP code"
                  value={values.zip_code}
                  readOnly
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  name="province"
                  label="Province"
                  value={values.province}
                  readOnly
                />
                <Controls.Input
                  name="phone_number"
                  label="Phone Number"
                  value={values.phone_number}
                  readOnly
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.root} elevation={0}>
            <Header>Items Ordered</Header>
            {orderedItems.map((orderedItem, index) => (
              <>
                <Grid container>
                  <Grid item xs={6} style={{ marginTop: "50px" }}>
                    <Imagethumbnail src={orderedItem.img_link} />
                  </Grid>
                  <Grid item xs={6}>
                    {" "}
                    <Index>Item #{index + 1}</Index>
                    <Controls.Input
                      name="product_id"
                      label="Product ID"
                      value={orderedItem.product_id}
                      readOnly
                    />
                    <Controls.Input
                      name="product_name"
                      label="Product Name"
                      multiline={true}
                      value={orderedItem.product_name}
                      readOnly
                    />
                    <Controls.Input
                      name="quantity"
                      label="Ordered Quantity"
                      value={orderedItem.quantity}
                      readOnly
                    />
                    <Controls.Input
                      name="price"
                      label="Price per unit"
                      value={orderedItem.price}
                      readOnly
                    />
                  </Grid>
                </Grid>
                <LineBreak />
                <Line />
              </>
            ))}
            <Header style={{ marginTop: "48px" }}>Total Price</Header>
            <Grid container>
              <Grid xs={8}>
                <Controls.Input
                  name="total"
                  label="Total Amount (excluding THB 90 shipping fee)"
                  value={`THB ${orderedItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toFixed(2)}`}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.root} elevation={0}>
            <Grid container>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                {formType === "edit" ? (
                  <>
                    <Controls.Button
                      type="submit"
                      text="Submit"
                      startIcon={<SaveIcon />}
                      style={styles.customButton}
                    />
                  </>
                ) : undefined}
              </Grid>
            </Grid>
          </Paper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default OrderForm;
