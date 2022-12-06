import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../UserContext";
import axios from "axios";

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    margin: "30px",
  },
};

const Container = styled.div`
min-height: 68vh;
padding: 4% 5%;
`;

const Thread = styled.thead`
`;

const TableRow = styled.tr`
`;

const TableHeader = styled.th`
`;

const TableBody = styled.tbody`
`;

const TableData = styled.td`
vertical-align: middle;
`;

const OrderHistory = () => {
  const headers = ["ORDER REFERENCE", "ORDER DATE", "STATUS", "TOTAL", "DETAILS"];
  const [orders, setOrders] = useState([]);
  const user = useUser()

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/order/" + user.user_id
        );
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data.length > 0) {
              var date = new window.Date(res.data[i].created_at)
                  .toISOString().replace(/T.*/,'')
                  .split('-').reverse().join('/')
              var time = new window.Date(res.data[i].created_at)
              .toISOString().slice(11,19)
              res.data[i].created_at = date.concat(" " + time)
            }
          }          
        }
        setOrders(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [user.user_id]);

  return (
    <Container>
      { orders.length === 0 ?
        <>
        You have no order history
        </>
        :
        <>
        <Table striped bordered hover>
      <Thread>
        <TableRow>
        {headers.map((header, index) => (
                <TableHeader key={index} style={{ padding: "20px", fontSize: "16px" }}>{header}</TableHeader>
        ))}
        </TableRow>
      </Thread>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.order_id}>
          <TableData style={{ padding: "20px", fontSize: "16px" }}>{order.order_id}</TableData>
          <TableData style={{ padding: "20px", fontSize: "16px" }}>{order.created_at}</TableData>
          <TableData style={{ padding: "20px", fontSize: "16px" }}>{order.description}</TableData>
          <TableData style={{ padding: "20px", fontSize: "16px" }}>THB {order.total_price}</TableData>
          <TableData>
            <Link style={{ textDecoration: "none" }} to="/Summary">
              <Button
                className="d-block mx-auto w-75"
                style={styles.customButton}
              >
                VIEW DETAILS
              </Button>
            </Link>
          </TableData>
        </TableRow>
        ))}
      </TableBody>
    </Table>
        </>
      }
      
    </Container>
    
  );
};

export default OrderHistory;
