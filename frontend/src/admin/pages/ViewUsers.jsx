import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NavbarAd from "../components/NavbarAd";
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
import DeleteIcon from "@material-ui/icons/Delete";
import PopUp from "../components/PopUp";
import UserForm from "../components/UserForm";
import Confirmation from "../components/Confirmation";

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
  { id: "email", label: "Email Addres" },
  { id: "phone_number", label: "Phone Number" },
  { id: "actions", label: "Actions" },
];

const ViewUsers = () => {
  const paperClasses = useStylesPaper();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(userService.getAllUsers());
  const [openPopup, setOpenPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  //get return value from UseTable.jsx
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(users, headCells);

  // update new user or edit user
  const addOrEdit = (user, resetForm, insertData) => {
    if (recordForEdit === null) {
      console.log(user);
      insertData(user);
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
  // const onDelete = (id) => {
  //   if (window.confirm("Are you sure to delete this record? ")) {
  //     userService.deleteUser(id);
  //     setRecords(userService.getAllUsers());
  //     toast.success("Successfully deleted user information.", {
  //       position: "top-center",
  //     });
  //   }
  // };

  //deleted selected
  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    try {
      await axios.delete(`http://localhost:8080/api/v1/user/${id}`);
      window.location.reload();
      window.alert("Deleting");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUserInfo();
  }, []);

  return (
    <Container>
      <NavbarAd />
      <Wrapper>
        <Top>
          <Title>Users List</Title>

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
        </Top>
        <Paper className={paperClasses.pageContent}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(user);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(user.user_id);
                          },
                        });
                      }}
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
          <UserForm
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
            isUserRegister={false}
          />
        </PopUp>
        <Confirmation
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Wrapper>
    </Container>
  );
};

export default ViewUsers;
