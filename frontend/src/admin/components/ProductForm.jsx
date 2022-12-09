import React, { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { UseForm, Form } from "../components/UseForm";
import AddImage from "../components/AddImage";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import axios from "axios";

/* innital default value */
const initialFValues = {
  id: 0,
  productName: "",
  category: "",
  description: "",
  details: "",
  price: "",
  mainColor: "",
  image: "",
  size: "",
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

const Header = styled.h5`
  margin-top: 20px;
`;

const Line = styled.hr`
  color: white;
`;

const ImgContainer = styled.div`
  max-width: 80rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ul {
    margin-top: 10px;
    padding-left: 0;
  }
  ul li {
    display: inline;
    justify-content: flex-start;
  }
`;

const Imagethumbnail = styled.img`
  width: 30%;
  height: 30%;
  object-fit: cover;
  border-radius: 1rem;
  cursor: pointer;
  margin: 30px 70px;
`;

const Article = styled.article``;

const List = styled.ul``;

const ListItem = styled.li``;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginRight: "50px",
  },
};

const ProductForm = ({ recordForEdit, isMainColor, formType, setChanged }) => {

  const [validated, setValidated] = useState(false);
  const [colors, setColors] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [images, setImages] = useState([]);

  const { values, setValues, errors, setErrors, handleChange, resetForm } =
    UseForm(initialFValues, true);
  const classes = useStyles();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const checkQuantity = (color, size) => {
    const value = stocks
    .filter((stock) => stock.product_color_id === color.product_color_id && stock.size === size).length > 0? 
    stocks
    .filter((stock) => stock.product_color_id === color.product_color_id && stock.size === size).slice(0)[0].quantity
      : 0
    return value;
  }

    // update edit information
    useEffect(() => {
  
      const getColors = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/products/color/" + recordForEdit.product_id
          );
          setColors(res.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      const getImages = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/products/img/" + recordForEdit.product_id
          );
          setImages(res.data);
          // for (let i = 0; i < res.data.length; i++) {
          //   if (res.data[i].is_main_color) {
          //     setMainColor(res.data[i].product_color_id);
          //     setUrl(res.data[i].img_link);
          //     break;
          //   }
          // }
        } catch (error) {
          console.log(error);
        }
      };
  
      const getStocks = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/products/stock/" + recordForEdit.product_id
          );
          setStocks(res.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (recordForEdit != null) {
        setValues({
          ...recordForEdit,
        });
      setChanged(false);
      getColors();
      getImages();
      getStocks();
      }
        
    }, [recordForEdit, setValues, setChanged]);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
        {formType === "view" ? 
          <>
          <Paper className={classes.root} elevation={0}>
        <Header>Product Details</Header>
        <Grid container>
          <Grid item xs={6}>
                  <Controls.Input
                    name="product_name"
                    label="Product Name"
                    value={values.product_name}
                    readOnly
                  />
                  <Controls.Input
                    name="main_category"
                    label="Main Category"
                    value={values.main_category}
                    readOnly
                  />
                  <Controls.Input
                    name="created_at"
                    label="Date added"
                    value={values.created_at}
                    readOnly
                  />
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                    name="price"
                    label="Price"
                    value={values.price}
                    readOnly
                  />
                  
                  <Controls.Input
                    name="sub_category"
                    label="Sub Category"
                    value={values.sub_category}
                    readOnly
                  />
                  <Controls.Input
                    name="updated_at"
                    label="Latest Update"
                    value={values.updated_at}
                    readOnly
                  />
                </Grid>
                <Controls.Input
                  name="description"
                  label="Description"
                  value={values.description}
                  readOnly
                />
                <Controls.Input
                  name="details"
                  label="Details"
                  multiline={true}
                  value={values.details}
                  readOnly
                />
            </Grid>
          </Paper>
          <Paper className={classes.root} elevation={0}>
            <Header>Stock Details</Header>
            <Grid container>
              {
                colors.map((color) => (
                  <Fragment key={color.product_color_id}>
                  <Grid item xs={6}>
                  <Controls.Input
                  name="color"
                  label="Color"
                  value={color.color}
                  readOnly
              />
                    <Controls.Input name="XS" label="Size XS" value={checkQuantity(color,"XS")}/>
                    <Controls.Input name="M" label="Size M" value={checkQuantity(color,"M")}/>
                    <Controls.Input name="XL" label="Size XL" value={checkQuantity(color,"XL")}/>
                    <Line/>
                  </Grid>
                  <Grid item xs={6}>
                  <Controls.Input
                  name="color_group"
                  label="Color Group"
                  value={color.color_group}
                  readOnly
              />
                    <Controls.Input name="S" label="Size S" value={checkQuantity(color,"S")}/>
                    <Controls.Input name="L" label="Size L" value={checkQuantity(color,"L")}/>
                    
                  </Grid>
                <ImgContainer>
              <Article>

                <List>
                  {images
                    .filter((img) => img.product_color_id === color.product_color_id)
                    .map((img) => (
                      <ListItem
                        key={img.img_link}
                      >
                        <Imagethumbnail src={img.img_link} />
                      </ListItem>
                    ))}
                </List>

              </Article>
            </ImgContainer>
                  </Fragment>
                  
                ))
                
              }
              
            </Grid>
          </Paper>
          </>
           : 
          <>
          </>
          }
        
          {/* {isMainColor === true ? (
            <Paper className={classes.root} elevation={0}>
              <Header> Basic Infomation</Header>
              <Grid container>
                <Grid item xs={6}>
                  <Controls.Input
                    name="product_name"
                    label="Product Name"
                    value={values.product_name}
                  />
                  <Controls.Input
                    name="price"
                    label="Price"
                    value={values.price}
                  />
                </Grid>
                <Grid item xs={6}>
                  
                  <Controls.Input
                    name="price"
                    label="Price"
                    value={values.price}
                  />
                  <Controls.Input
                    name="sub_category"
                    label="Sub Category"
                    value={values.sub_category}
                  />
                </Grid>
                <Controls.Input
                  name="description"
                  label="Description"
                  value={values.description}
                />
                <Controls.Input
                  name="detail"
                  label="Detail"
                  fullWidth
                  value={values.detail}
                />
              </Grid>
            </Paper>
          ) : (
            <></>
          )} */}
          {/* <Paper className={classes.root} elevation={0}>
            <Header>Color Detail</Header>
            <Grid container>
              
              <Controls.Input
                name="color"
                label="Color"
                value={values.color}
              />
              <AddImage />
            </Grid>
          </Paper>

          <Paper className={classes.root} elevation={0}>
            <Header>Size Detail</Header>
            <Grid container>
              <Grid item xs={6}>
                <Controls.Input name="xs" label="Size XS" fullWidth />
                <Controls.Input name="M" label="Size M" fullWidth />
                <Controls.Input name="XL" label="Size XL" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input name="S" label="Size S" fullWidth />
                <Controls.Input name="L" label="Size L" fullWidth />

                <div style={{ marginTop: "80px" }}>
                  <Link to="/successadded" style={{ textDecoration: "none" }}>
                    <Controls.Button
                      // type="submit"
                      text="Submit"
                      startIcon={<SaveIcon />}
                      style={styles.customButton}
                    />
                  </Link>

                  <Controls.Button
                    text="Reset"
                    color="default"
                    startIcon={<DeleteIcon />}
                    onClick={resetForm}
                  />
                </div>
              </Grid>
            </Grid>
          </Paper> */}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ProductForm;
