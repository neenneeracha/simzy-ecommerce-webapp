import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavbarAd from "../components/NavbarAd";
import OrderForm from "../components/OrderForm";
import Controls from "./../components/controls/Controls";
import UseTable from "../components/UseTable";
import * as userService from "../redux/User";
import { toast } from "react-toastify";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PopUp from "../components/PopUp";

// style the input form container
const useStylesPaper = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  background-color: #fff8f9;
`;
const Wrapper = styled.div``;

const Top = styled.div`
  display: flex;
  margin: 30px;
`;
const Title = styled.h2`
  width: 100%;
  color: black;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// array object for head cell
const headCells = [
  { id: "name", label: "User name" },
  { id: "status", label: "status" },
  { id: "phone_number", label: "Phone Number" },
  { id: "zip_code", label: "Zip Code" },
  { id: "province", label: "Province" },
  { id: "created_at", label: "Order Date" },
  { id: "actions", label: "Actions" },
];

const ViewOrders = () => {
  const paperClasses = useStylesPaper();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderedProducts, setorderedProducts] = useState([]);
  //get return value from UseTable.jsx
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(orders, headCells);

  // open popup with selected record
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  useEffect(() => {
    const getAllOrderInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/order/");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllOrderInfo();
  }, []);

  return (
    <Container>
      <NavbarAd />
      <Wrapper>
        <Top>
          <Title>Orders List</Title>
        </Top>
        <Paper className={paperClasses.pageContent}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.phone_number}</TableCell>
                  <TableCell>{order.zip_code}</TableCell>
                  <TableCell>{order.province}</TableCell>
                  <TableCell>{order.created_at}</TableCell>

                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(order);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
        <PopUp
          title="Order Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <OrderForm recordForEdit={recordForEdit} />
        </PopUp>
      </Wrapper>
    </Container>
  );
};

export default ViewOrders;
