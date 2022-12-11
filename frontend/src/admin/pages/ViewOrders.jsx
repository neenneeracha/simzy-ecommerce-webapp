/********************************************************************
 *
 * ViewOrders.jsx
 *
 *   This file represents the SIMZY orders details page and 
 *   allow administrators to view and edit order
 *
 ********************************************************************
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import NavbarAd from "../components/NavbarAd";
import OrderForm from "../components/OrderForm";
import Controls from "./../components/controls/Controls";
import UseTable from "../components/UseTable";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PopUp from "../components/PopUp";
import SearchIcon from "@material-ui/icons/Search";
import EmptyList from "../components/EmptyList";

// style the input form container
const useStylesPaper = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    borderRadius: 10,
  },
}));

const Container = styled.div`
  max-width: 100%;
  height: 100vh;
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
  { id: "order_id", label: "Order ID" },
  { id: "user_id", label: "User ID" },
  { id: "created_at", label: "Order Date" },
  { id: "shipping_area", label: "Shipping Area" },
  { id: "payment", label: "Payment" },
  { id: "status", label: "Order Status" },
  { id: "actions", label: "Actions" },
];

const ViewOrders = () => {
  const paperClasses = useStylesPaper();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [formType, setFormType] = useState("view");
  const [searchParams] = useSearchParams();
  const status_id = searchParams.get("status_id");
  const [orderStatus, setOrderStatus] = useState([]);
  const navigate = useNavigate();

  //get return value from UseTable.jsx
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(orders, headCells);

  // open popup with selected record
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  useEffect(() => {
    if (parseInt(status_id) > 6 || parseInt(status_id) < 1) navigate("/*");

    const getAllOrderInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/order?status_id=${status_id}`
        );
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            var createdDate = new window.Date(res.data[i].created_at)
              .toISOString()
              .replace(/T.*/, "")
              .split("-")
              .reverse()
              .join("/");
            var createdTime = new window.Date(res.data[i].created_at)
              .toISOString()
              .slice(11, 19);
            res.data[i].created_at = createdDate.concat(" " + createdTime);

            var updatedDate = new window.Date(res.data[i].updated_at)
              .toISOString()
              .replace(/T.*/, "")
              .split("-")
              .reverse()
              .join("/");
            var updatedTime = new window.Date(res.data[i].updated_at)
              .toISOString()
              .slice(11, 19);
            res.data[i].updated_at = updatedDate.concat(" " + updatedTime);
          }
        }
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/order/status"
        );
        setOrderStatus(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStatus();
    getAllOrderInfo();
  }, [status_id, navigate]);

  // reset popup variables
  const resetPopup = (resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setSelectedID(0);
  };

  const handleEdit = async (order, resetForm) => {
    if (order.status_id === recordForEdit.status_id) {
      toast.error("No new changes made, submission ignored!", {
        position: "top-center",
      });
    } else {
      try {
        const res = await axios.patch(
          "http://localhost:8080/api/v1/order/" + selectedID,
          { status: order.status_id }
        );
        if (res.status === 200) {
          toast.success(res.data.msg, {
            position: "top-center",
          });
          resetPopup(resetForm);
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        }
      } catch (err) {
        toast.error("Something went wrong, please try again !!", {
          position: "top-center",
        });
        console.log(err);
      }
    }
    resetPopup(resetForm);
  };

  return (
    <Container>
      <NavbarAd />
      <Wrapper>
        <Top>
          <Title>
            Orders List{" "}
            {typeof status_id === "string" && orderStatus.length > 0
              ? `- ${
                  parseInt(status_id) === 6
                    ? "All orders"
                    : orderStatus
                        .filter(
                          (order) => order.status_id === parseInt(status_id)
                        )
                        .slice(0)[0].description
                }`
              : undefined}
          </Title>
        </Top>
        {orders.length > 0 ? (
          <>
            <Paper className={paperClasses.pageContent}>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {recordsAfterPagingAndSorting().map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell>{order.order_id}</TableCell>
                      <TableCell>{order.user_id}</TableCell>
                      <TableCell>{order.created_at}</TableCell>
                      <TableCell>
                        {order.zip_code} - {order.province}
                      </TableCell>
                      <TableCell>
                        {order.payment_type === 1
                          ? "Cash on Delivery"
                          : "Card Payment"}{" "}
                        ({order.status === 1 ? "Paid" : "Pending"})
                      </TableCell>
                      <TableCell>{order.description}</TableCell>

                      <TableCell>
                        <Controls.ActionButton
                          color="success"
                          onClick={() => {
                            setFormType("view");
                            setSelectedID(order.order_id);
                            openInPopup(order);
                          }}
                        >
                          <SearchIcon fontSize="small" />
                        </Controls.ActionButton>
                        <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            setFormType("edit");
                            setSelectedID(order.order_id);
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
              title={
                formType === "view"
                  ? `View Details of Order ID #${selectedID}`
                  : formType === "edit"
                  ? `Edit Details of Order ID #${selectedID}`
                  : ""
              }
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <OrderForm
                recordForEdit={recordForEdit}
                formType={formType}
                orderStatus={orderStatus}
                handleEdit={handleEdit}
              />
            </PopUp>
          </>
        ) : (
          <EmptyList message="order with this status" />
        )}
      </Wrapper>
    </Container>
  );
};

export default ViewOrders;
