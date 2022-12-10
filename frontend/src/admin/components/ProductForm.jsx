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

/* initial default value */
const initialFValues = {
  product_name: "",
  price: "",
  category_id: "",
  main_category: "",
  sub_category: "",
  description: "",
  details: "",
  // mainColor: "",
  // image: "",
  // size: "",
};

const stockFields = {
  color_group_id: "",
  stock: [
    {size: "XS", quantity: ""},
    {size: "S", quantity: ""},
    {size: "M", quantity: ""},
    {size: "L", quantity: ""},
    {size: "XL", quantity: ""},
  ]
}


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

const EditedImagethumbnail = styled.img`
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 1rem;
  cursor: pointer;
  margin: 30px 70px;
  border: 5px solid #eda3b5;
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
    marginLeft: "38%",
    width: "200px"
  },
};

const ProductForm = ({ recordForEdit, formType, setChanged, setStockChanged, setImgChanged, addOrEdit }) => {

  const [colors, setColors] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [images, setImages] = useState([]);
  const [newStock, setNewStock] = useState([{...stockFields, is_main_color: 1, index: 0}])
  const [categories, setCategories] = useState([]);
  const [colorGroups, setColorGroups] = useState([]);
  const [editedColors, setEditedColors] = useState([]);
  const [editedStocks, setEditedStocks] = useState([]);
  const [editedImages, setEditedImages] = useState([]);
  console.log(newStock)

  // form validation
  const validate = (fieldValues = values) => {

    let temp = { ...errors };
    if ("product_name" in fieldValues)
      temp.product_name = fieldValues.product_name ? "" : "Product name is required";
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "Price is required";
    if ("category_id" in fieldValues)
      temp.category_id = fieldValues.category_id ? "" : "Category is required";
   if ("description" in fieldValues)
      temp.description = fieldValues.description ? "" : "Description is required";
    if ("details" in fieldValues)
      temp.details = fieldValues.details ? "" : "Details is required";
    
    for (let i =0; i < editedStocks.length; i++) {
      if (isNaN(editedStocks[i].quantity) || editedStocks[i].quantity === "") {
        temp.stocks = "Quantity is required";
      }
    }
  
    // save error value into "errors"
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      // return boolean value if the validation is valid or not
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleChange, resetForm } =
    UseForm(initialFValues, true, validate);
  const classes = useStyles();

  const handleSubmit = (e) => {
     e.preventDefault();

    if (validate()) {
      addOrEdit(values, editedColors, editedStocks, editedImages, resetForm)
    }
  };

  const handleInput = (e) => {
    setChanged(true);
    handleChange(e);
  };

  const handleNewStock = (e, field) => {
    if (field === "Color Group") {
      let newArr = [...newStock]
      e.target.name = e.target.name.split('-')[1]

      for (let i = 0; i < newStock.length; i++) {
        
        if (newStock[i].index === parseInt(e.target.name)) {
          newArr[i].color_group_id = e.target.value;
          break;
        }
       }
       setNewStock(newArr)
    } else if (field === "Stock") {
      console.log(e.target)
      let newArr = [...newStock]
      let found = false
      const index = (e.target.name).split('-')[2]
      const size = (e.target.name).split('-')[1]

      for (let i = 0; i < newStock.length; i++) {
        
          if (newStock[i].index === parseInt(index)) {
            for (let j = 0; j < newStock[i].stock.length; j++) {
              if (newStock[i].stock[j].size === size) {
                if (isNaN(e.target.value)) {
                  newArr[i].stock[j].quantity = "";
                } else {
                  newArr[i].stock[j].quantity = parseInt(e.target.value);
                }
                found = true
                break;
              }
              if (found === true)
                break;
            }
          
        }
      }
      setNewStock(newArr)
    }
  }

  const handleStock = (e, field) => {
    setStockChanged(true)
     if (field === "Color Group") {
      let newArr = [...editedColors]
     for (let i = 0; i < editedColors.length; i++) {
      const product_color_id = (e.target.name).split('-')[1]
      if (editedColors[i].product_color_id === parseInt(product_color_id)) {
        newArr[i].color_group_id = e.target.value;
        break;
      }
     }
     setEditedColors(newArr)
     } else if (field === "Stock"){
      let newArr = [...editedStocks]
      let i
      let found = false;
      
      e.target.name = e.target.id.split('-')[1] === "color"? 
        e.target.id.split('-').slice(1).join('-') :
        e.target.id.split('-')[1]
      
      for (i = 0; i < editedStocks.length; i++) {
        if (editedStocks[i].stock_id == e.target.name) {
          if (isNaN(e.target.value)) {
            newArr[i].quantity = "";
          } else {
            newArr[i].quantity = parseInt(e.target.value);
          }
          found = true;
          break;
        }
       }
       if (!found) {
        const product_color_id = parseInt((e.target.name).split('-')[1])
        const size = (e.target.name).split('-')[2]
        
        let newStock = {stock_id: e.target.name, product_color_id: product_color_id, size: size}
        if (e.target.value === "") {
          newStock.quantity = "";
        } else {
          newStock.quantity = parseInt(e.target.value);
        }
        newArr.push(newStock)
       }
       setEditedStocks(newArr)
      
     }
    
  }

  const checkQuantity = (color, size) => {
    const value = stocks
    .filter((stock) => stock.product_color_id === color.product_color_id && stock.size === size).length > 0? 
    stocks
    .filter((stock) => stock.product_color_id === color.product_color_id && stock.size === size).slice(0)[0].quantity
      : 0
    return value;
  }

  const checkEditedQuantity = (color, size) => {
    let value = 0;
    for (let i = 0; i < editedStocks.length; i++) {
      if (editedStocks[i].product_color_id === color.product_color_id && editedStocks[i].size === size) {
        if (isNaN(editedStocks[i].quantity)) {
          value = ""
        } else {
          value = editedStocks[i].quantity
        }
      break;
      }
    }

    return value;
  }

  const checkNewQuantity = (color, size) => {
    let value = 0;
    let found = false
    
    for (let i = 0; i < newStock.length; i++) {
      if (newStock[i].index === color.index) {
        for (let j = 0; j < newStock[i].stock.length; j++) {
          if (newStock[i].stock[j].size === size) {
              if (isNaN(newStock[i].stock[j].quantity)) {
                value = ""
              } else {
                value = newStock[i].stock[j].quantity
              }
            found = true
            break;
          }
          if (found === true)
            break;
        }
      }
    }

    return value;
  }

  const getStockID = (color, size) => {
    const stock_id = stocks
    .filter((stock) => stock.product_color_id === color.product_color_id && stock.size === size).length > 0? 
    stocks
    .filter((stock) => stock.product_color_id === color.product_color_id && stock.size === size).slice(0)[0].stock_id
      : `color-${color.product_color_id}-${size}`

    return stock_id
  }

  const manageStockField = (type) => {
    let newArr = [...newStock]
    if (type === "add") {
      newArr.push(stockFields)
    } else {
      newArr.pop()
    }
    setNewStock(newArr)
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

      const getAllCats = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/category/all"
          );
          setCategories(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      const getAllColorGroups = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/color"
          );
          setColorGroups(res.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (recordForEdit != null) {
        setValues({
          ...recordForEdit,
        });
      setChanged(false);
      setStockChanged(false);
      setImgChanged(false);
      getColors();
      getImages();
      getStocks();
      }
      getAllCats();
      getAllColorGroups();
        
    }, [recordForEdit, setValues, setChanged, setStockChanged, setImgChanged]);

    useEffect(() => {
      if (formType === "edit") {
        setEditedColors(colors)
        setEditedImages(images)
        setEditedStocks(stocks)
      }
      
    }, [formType, colors, images, stocks])

    console.log(editedStocks)

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
                    <Controls.Input 
                    name="XS" label="Size XS" 
                    value={checkQuantity(color,"XS")}/>

                    <Controls.Input 
                    name="M" label="Size M" 
                    value={checkQuantity(color,"M")}/>

                    <Controls.Input name="XL" label="Size XL" 
                    value={checkQuantity(color,"XL")}/>

                    <Line/>

                  </Grid>
                  <Grid item xs={6}>

                  <Controls.Input
                  name="color_group"
                  label="Color Group"
                  value={color.color_group}
                  readOnly
              />
                    <Controls.Input name="S" label="Size S" 
                    value={checkQuantity(color,"S")}/>

                    <Controls.Input name="L" label="Size L" 
                    value={checkQuantity(color,"L")}/>
                    
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
           <Paper className={classes.root} elevation={0}>
         <Header>Product Details</Header>
         <Grid container>
           <Grid item xs={6}>
                   <Controls.Input
                     name="product_name"
                     label="Product Name"
                     value={values.product_name}
                     onChange={handleInput}
                     error={errors.product_name}
                   />
                   <Controls.Input
                     name="price"
                     label="Price"
                     value={values.price}
                     onChange={handleInput}
                     error={errors.price}
                   />
                 </Grid>
                 <Grid item xs={6}>
                 <Controls.Select
                  name="category_id"
                  label="Category"
                  value={values.category_id}
                  onChange={handleInput}
                  options={categories}
                  error={errors.category_id}
                />
                 </Grid>
                 <Controls.Input
                   name="description"
                   label="Description"
                   value={values.description}
                   onChange={handleInput}
                   error={errors.description}
                 />
                 <Controls.Input
                   name="details"
                   label="Details"
                   multiline={true}
                   value={values.details}
                   onChange={handleInput}
                   error={errors.details}
                 />
             </Grid>
           </Paper>
           <Paper className={classes.root} elevation={0}>
             <Header>Stock Details</Header>
             <Grid container>
               {
                 editedColors.map((color) => (
                   <Fragment key={color.product_color_id}>
                   <Grid item xs={6}>
                   <Controls.Select
                  name={`colorgroup-${color.product_color_id}-${color.color_group_id}`}
                  label="Color group - Color"
                  value={color.color_group_id}
                  onChange={(e) => handleStock(e, "Color Group")}
                  options={colorGroups}
                />
                     
                     <Controls.Input name={`stock-${getStockID(color,"S")}`} label="Size S" 
                     value={checkEditedQuantity(color,"S")}
                     onChange={(e) => handleStock(e,"Stock")}
                     error={checkEditedQuantity(color,"S") === ""? errors.stocks : undefined}
                     />

                     <Controls.Input name={`stock-${getStockID(color,"L")}`} label="Size L" 
                     value={checkEditedQuantity(color,"L")}
                     onChange={(e) => handleStock(e,"Stock")}
                     error={checkEditedQuantity(color,"L") === ""? errors.stocks : undefined}
                     />
                     

                     <Line/>
                   </Grid>
                   <Grid item xs={6}>
                   <Controls.Input name={`stock-${getStockID(color,"XS")}`} label="Size XS" 
                     value={checkEditedQuantity(color,"XS")}
                     onChange={(e) => handleStock(e,"Stock")}
                     error={checkEditedQuantity(color,"XS") === ""? errors.stocks : undefined}
                     />

                     <Controls.Input name={`stock-${getStockID(color,"M")}`} label="Size M" 
                     value={checkEditedQuantity(color,"M")}
                     onChange={(e) => handleStock(e,"Stock")}
                     error={checkEditedQuantity(color,"M") === ""? errors.stocks : undefined}
                     />

                     <Controls.Input name={`stock-${getStockID(color,"XL")}`} label="Size XL" 
                     value={checkEditedQuantity(color,"XL")}
                     onChange={(e) => handleStock(e,"Stock")}
                     error={checkEditedQuantity(color,"XL") === ""? errors.stocks : undefined}
                     />
                   </Grid>
                 <ImgContainer>
               <Article>
 
                 <List>
                   {editedImages
                     .filter((img) => img.product_color_id === color.product_color_id)
                     .map((img) => (
                       <ListItem
                         key={img.img_link}
                       >
                         <Imagethumbnail src={img.img_link} />
                       </ListItem>
                       
                     ))}
                     {editedImages
                     .filter((img) => img.product_color_id === color.product_color_id && img.new_link !== undefined).map((img) => (
                       <ListItem
                         key={img.new_link}
                       >
                         <EditedImagethumbnail src={img.new_link} />
                       </ListItem>
                       
                     ))
                    }
                 </List>
               </Article>
             </ImgContainer>
            {
              color.is_main_color === 0 ?
              <AddImage color={color} editedImages={editedImages} setEditedImages={setEditedImages} setImgChanged={setImgChanged} formType={formType}/>
              : undefined
            }
            
             </Fragment>
                   
             ))
                 
             }
             {
              formType === "add" ?
              <>
             {
                 newStock.map((color) => (
                   <Fragment key={color.color_group_id}>
                   <Grid item xs={6}>
                   <Controls.Select
                  name={`index-${color.index}`}
                  label="Color group - Color"
                  value={color.color_group_id}
                  onChange={(e) => handleNewStock(e, "Color Group")}
                  options={colorGroups}
                />
                     
                     <Controls.Input name={`stock-S-${color.index}`} label="Size S" 
                     value={checkNewQuantity(color,"S")}
                     onChange={(e) => handleNewStock(e,"Stock")}
                     error={checkNewQuantity(color,"S") === ""? errors.stocks : undefined}
                     />

                     <Controls.Input name={`stock-L-${color.index}`} label="Size L" 
                     value={checkNewQuantity(color,"L")}
                     onChange={(e) => handleNewStock(e,"Stock")}
                     error={checkNewQuantity(color,"L") === ""? errors.stocks : undefined}
                     />
                     

                     <Line/>
                   </Grid>
                   <Grid item xs={6}>
                   <Controls.Input name={`stock-XS-${color.index}`} label="Size XS" 
                     value={checkNewQuantity(color,"XS")}
                     onChange={(e) => handleNewStock(e,"Stock")}
                     error={checkNewQuantity(color,"XS") === ""? errors.stocks : undefined}
                     />

                     <Controls.Input name={`stock-M-${color.index}`} label="Size M" 
                     value={checkNewQuantity(color,"M")}
                     onChange={(e) => handleNewStock(e,"Stock")}
                     error={checkNewQuantity(color,"M") === ""? errors.stocks : undefined}
                     />

                     <Controls.Input name={`stock-XL-${color.index}`} label="Size XL" 
                     value={checkNewQuantity(color,"XL")}
                     onChange={(e) => handleNewStock(e,"Stock")}
                     error={checkNewQuantity(color,"XL") === ""? errors.stocks : undefined}
                     />
                   </Grid>
                 {/* <ImgContainer>
               <Article>
 
                 <List>
                   {editedImages
                     .filter((img) => img.product_color_id === color.product_color_id)
                     .map((img) => (
                       <ListItem
                         key={img.img_link}
                       >
                         <Imagethumbnail src={img.img_link} />
                       </ListItem>
                       
                     ))}
                     {editedImages
                     .filter((img) => img.product_color_id === color.product_color_id && img.new_link !== undefined).map((img) => (
                       <ListItem
                         key={img.new_link}
                       >
                         <EditedImagethumbnail src={img.new_link} />
                       </ListItem>
                       
                     ))
                    }
                 </List>
               </Article>
             </ImgContainer> */}
            
              <AddImage formType={formType}/>
             
            
             </Fragment>
                   
             ))
                 
             }
              </>
              :
              undefined
             }
               
             </Grid>
           </Paper>
           {formType === "edit" ? (
                <>
                  <Controls.Button
                    type="submit"
                    text="Submit"
                    startIcon={<SaveIcon />}
                    style={styles.customButton}
                  />
                </>
              ) :
              (
                <>
                  <Controls.Button
                    className="w-75"
                    type="submit"
                    text="Submit"
                    style={styles.customButton}
                  />
                </>
              ) 
            }
           </>
          }
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ProductForm;
