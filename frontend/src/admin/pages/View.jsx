import React, { useState } from "react";
import styled from "styled-components";
import NavbarAd from "../components/NavbarAd";
import { Link } from "react-router-dom";
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
import * as users from "../redux/User";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import PopUp from "../components/PopUp";
import NewUser from "./NewUser";

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
  { id: "firstname", label: "User name" },
  { id: "email", label: "Email Addres" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "actions", label: "Actions" },
];

const View = ({ inputs, title }) => {
  const paperClasses = useStylesPaper();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(users.getAllUsers());
  const [openPopup, setOpenPopup] = useState(false);

  //get return value from UseTable.jsx
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(records, headCells);

  // update new user or edit user
  const addOrEdit = (user, resetForm) => {
    if (recordForEdit === null) {
      userService.insertNewUser(user);
    } else {
      userService.updateUser(user);
    }

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(userService.getAllUsers());
    toast.success("Successfully submitted user information.", {
      position: "top-center",
    });
  };

  // open popup with selected record
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  //delete user
  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record? ")) {
      userService.deleteUser(id);
      setRecords(userService.getAllUsers());
      toast.success("Successfully deleted user information.", {
        position: "top-center",
      });
    }
  };

  return (
    <Container>
      <NavbarAd />
      <Wrapper>
        <Top>
          <Title>{title}s List</Title>
          {title !== "Order" ? (
            // <Link to={title === "User" ? "/newuser" : "/newproduct"}>
            <Controls.Button
              style={{
                marginRight: "30px",
                width: "200px",
                textDecoration: "none",
                backgroundColor: "#FFD0DC",
                color: "black",
              }}
              text="+ Add New "
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          ) : (
            // </Link>
            <></>
          )}
        </Top>
        <Paper className={paperClasses.pageContent}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.firstname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => onDelete(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
        <PopUp
          title="User Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <NewUser recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </PopUp>
      </Wrapper>
    </Container>
  );
};

export default View;
