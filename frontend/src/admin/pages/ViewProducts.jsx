import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import AdNavbar from "../components/AdNavbar";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import NewNav from "../components/NewNav";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const Container = styled.div`
  margin-top: 10px;
  flex: 6;
`;
const ListContainer = styled.div`
  margin-top: 10px;
  flex: 6;
`;

const TableContainer = styled.div`
  margin-top: 10px;
  flex: 6;
`;
const Home = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  background-color: #fff8f9;
`;
const Title = styled.h2`
  width: 100%;
  color: black;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Top = styled.div`
  display: flex;
  margin: 30px;
`;
const rootElement = document.getElementById("root");
ReactDOM.render(<data />, rootElement);

const ViewProducts = ({ inputs, title }) => {
  return (
    <div>
      <Home>
        <NewNav />
        <Container>
          <MDBRow>
            <MDBCol md="1"></MDBCol>
            <MDBCol md="10">
              <ListContainer>
                <Top>
                  <Title>{title}s List</Title>
                  {title !== "Order" ? (
                    <Link to={title === "User" ? "/newuser" : "/newproduct"}>
                      <MDBBtn
                        color="dark"
                        style={{ marginRight: "30px", width: "200px" }}
                      >
                        + Add New {title}
                      </MDBBtn>
                    </Link>
                  ) : (
                    <></>
                  )}
                </Top>
                <TableContainer>
                  <MDBTable align="middle">
                    {/* {inputs?.map((input) => (
                      <MDBTableHead>
                        <tr>
                          <th scope="col">{input.name}</th>
                        </tr>
                      </MDBTableHead>
                    ))} */}

                    <MDBTableBody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">John Doe</p>
                              <p className="text-muted mb-0">
                                john.doe@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">Software engineer</p>
                          <p className="text-muted mb-0">IT department</p>
                        </td>
                        <td>
                          <MDBBadge color="success" pill>
                            Active
                          </MDBBadge>
                        </td>
                        <td>Senior</td>
                        <td>
                          <MDBBtn color="link" rounded size="sm">
                            View
                          </MDBBtn>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">Alex Ray</p>
                              <p className="text-muted mb-0">
                                alex.ray@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">Consultant</p>
                          <p className="text-muted mb-0">Finance</p>
                        </td>
                        <td>
                          <MDBBadge color="primary" pill>
                            Onboarding
                          </MDBBadge>
                        </td>
                        <td>Junior</td>
                        <td>
                          <MDBBtn color="link" rounded size="sm">
                            View
                          </MDBBtn>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">Kate Hunington</p>
                              <p className="text-muted mb-0">
                                kate.hunington@gmail.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">Designer</p>
                          <p className="text-muted mb-0">UI/UX</p>
                        </td>
                        <td>
                          <MDBBadge color="warning" pill>
                            Awaiting
                          </MDBBadge>
                        </td>
                        <td>Senior</td>
                        <td>
                          <MDBBtn color="link" rounded size="sm">
                            View
                          </MDBBtn>
                        </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </TableContainer>
              </ListContainer>
            </MDBCol>
            <MDBCol md="1"></MDBCol>
          </MDBRow>
     
        </Container>
      </Home>
    </div>
  );
};

export default ViewProducts;
