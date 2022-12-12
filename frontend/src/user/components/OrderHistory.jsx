/********************************************************************
 *
 * OrderHistory.jsx
 *
 *   This file represents the order history section and is displayed
 *   on the user profile page. Shows the customer's order history.
 *
 ********************************************************************
 */

import React, { useEffect, useState } from "react";
import OrderDetails from "./OrderDetails";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { useSelector } from "react-redux";

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    margin: "30px",
  },
  blueButton: {
    backgroundColor: "#0275d8",
    borderColor: "#0275d8",
    color: "white",
    borderRadius: "5px",
    marginTop: "30px",
  },
};

const Container = styled.div`
  min-height: 68vh;
  padding: 4% 5%;
`;

const Thread = styled.thead``;

const TableRow = styled.tr``;

const TableHeader = styled.th``;

const TableBody = styled.tbody``;

const TableData = styled.td`
  vertical-align: middle;
`;

const Image = styled.img`
  height: 35%;
  width: 35%;
  display: block;
  margin: 0px auto 20px;
`;

const Text = styled.p`
  color: gray;
  font-size: 18px;
  text-align: center;
`;
const NormalText = styled.div``;

const Title = styled.h2`
  color: black;
  font-size: 28px;
  text-align: center;
`;

const OrderHistory = () => {
  const headers = [
    "ORDER REFERENCE",
    "ORDER DATE",
    "STATUS",
    "TOTAL",
    "DETAILS",
  ];
  const [orders, setOrders] = useState([]);
  const [viewOrder, setViewOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const fontSize = useSelector((state) => state.fontSize);
  const user = useUser();

  // get the user's order details
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/order/" + user.user_id
        );
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            var date = new window.Date(res.data[i].created_at)
              .toISOString()
              .replace(/T.*/, "")
              .split("-")
              .reverse()
              .join("/");
            var time = new window.Date(res.data[i].created_at)
              .toISOString()
              .slice(11, 19);
            res.data[i].created_at = date.concat(" " + time);
          }
        }
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [user.user_id]);

  return (
    <Container>
      {orders.length === 0 ? (
        <>
          <Image src={process.env.PUBLIC_URL + "img/no-order.png"} />
          <Title style={{ fontSize: `${30 + fontSize.fontSize}px` }}>
            No order history available
          </Title>
          <Text style={{ fontSize: `${20 + fontSize.fontSize}px` }}>
            you haven't placed any orders yet
          </Text>
          <Button
            className="d-block mx-auto w-25 p-2"
            style={styles.blueButton}
          >
            <NormalText
              style={{
                fontSize: `${18 + fontSize.fontSize}px`,
              }}
            >
              CONTINUE SHOPPING
            </NormalText>
          </Button>
        </>
      ) : viewOrder === null ? (
        <>
          <Table striped bordered hover>
            <Thread>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHeader
                    key={index}
                    style={{
                      padding: "20px",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                  >
                    {header}
                  </TableHeader>
                ))}
              </TableRow>
            </Thread>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableData
                    style={{
                      padding: "20px",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                  >
                    {order.order_id}
                  </TableData>
                  <TableData
                    style={{
                      padding: "20px",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                  >
                    {order.created_at}
                  </TableData>
                  <TableData
                    style={{
                      padding: "20px",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                  >
                    {order.description}
                  </TableData>
                  <TableData
                    style={{
                      padding: "20px",
                      fontSize: `${16 + fontSize.fontSize}px`,
                    }}
                  >
                    THB {order.total_price + 90}
                  </TableData>
                  <TableData>
                    <Button
                      className="d-block mx-auto w-75"
                      style={styles.customButton}
                      onClick={() => {
                        setViewOrder(order.order_id);
                        setTotalPrice(order.total_price);
                      }}
                    >
                      <NormalText
                        style={{
                          fontSize: `${18 + fontSize.fontSize}px`,
                        }}
                      >
                        VIEW DETAILS
                      </NormalText>
                    </Button>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <OrderDetails
          order_id={viewOrder}
          setViewOrder={setViewOrder}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      )}
    </Container>
  );
};

export default OrderHistory;
