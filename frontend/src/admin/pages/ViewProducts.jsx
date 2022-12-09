import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NavbarAd from "../components/NavbarAd";
import Controls from "./../components/controls/Controls";
import UseTable from "../components/UseTable";
import { toast } from "react-toastify";
import {
  makeStyles,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from "@material-ui/icons/Delete";
import PopUp from "../components/PopUp";
import ProductForm from "../components/ProductForm";
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
  { id: "product_id", label: "Product ID" },
  { id: "product_name", label: "Product Name" },
  { id: "category", label: "Category" },
  { id: "price", label: "Price (THB)" },
  { id: "actions", label: "Actions" },
];

const ViewProducts = () => {
  const paperClasses = useStylesPaper();
  const [formType, setFormType] = useState("view");
  const [changed, setChanged] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  // get return value from UseTable.jsx
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseTable(products, headCells);

  // reset popup variables
  const resetPopup = (resetForm) => {
    setChanged(false);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setSelectedID(0)
  }

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  // deleted selected product
  const handleDelete = async (product_id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    // try {
    //   const res = await axios.delete("http://localhost:8080/api/v1/user/" + user_id);
    //   if (res.status === 202) {
    //     toast.success(res.data.msg, {
    //       position: "top-center",
    //     })
    //     setTimeout(function () {
    //       window.location.reload();
    //     }, 3000);
    //   }
    // } catch (err) {
    //   if (err.request.status === 409) {
    //     toast.error(err.response.data.msg, {
    //       position: "top-center",
    //     })
    //   } else {
    //     toast.error("Something went wrong, please try again !!", {
    //       position: "top-center",
    //     })
    //   }
    //   console.log(err);
    // }
  };

  useEffect(() => {
    const getAllProductInfo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/products/allproducts"
        );
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
              var createdDate = new window.Date(res.data[i].created_at)
                  .toISOString().replace(/T.*/,'')
                  .split('-').reverse().join('/')
              var createdTime = new window.Date(res.data[i].created_at)
              .toISOString().slice(11,19)
              res.data[i].created_at = createdDate.concat(" " + createdTime)

              var updatedDate = new window.Date(res.data[i].updated_at)
                  .toISOString().replace(/T.*/,'')
                  .split('-').reverse().join('/')
              var updatedTime = new window.Date(res.data[i].updated_at)
              .toISOString().slice(11,19)
              res.data[i].updated_at = updatedDate.concat(" " + updatedTime) 
            
          }          
        }
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProductInfo();
  }, []);

  return (
    <Container>
      <NavbarAd />
      <Wrapper>
        <Top>
          <Title>Products List</Title>
          <Controls.Button
            style={{
              marginRight: "30px",
              width: "225px",
              textDecoration: "none",
              backgroundColor: "#FFD0DC",
              color: "black",
            }}
            text="+ Add New Product"
            onClick={() => {
              setFormType("add");
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Top>
        <Paper className={paperClasses.pageContent}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell>{product.product_id}</TableCell>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.main_category} - {product.sub_category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                  <Controls.ActionButton
                      color="success"
                      onClick={() => {
                        setFormType("view");
                        setSelectedID(product.product_id)
                        openInPopup(product);
                      }}
                    >
                      <SearchIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        setFormType("edit");
                        setSelectedID(product.product_id)
                        openInPopup(product);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: `Are you sure that you want to delete product #${product.product_id}?`,
                          subTitle: "You won't be able to undo this operation",
                          onConfirm: () => {
                            handleDelete(product.product_id);
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
          title={formType === "view"? `View Details of Product ID #${selectedID}` : 
          formType === "edit"? `Edit Details of Product ID #${selectedID}` 
          : `Add New Product`
        }
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <ProductForm 
          recordForEdit={recordForEdit}
          formType={formType}
          setChanged={setChanged}
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

export default ViewProducts;
