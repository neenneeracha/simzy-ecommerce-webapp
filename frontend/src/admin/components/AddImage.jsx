import React, { useState, Fragment } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/firebase"
import Controls from "../components/controls/Controls";
import DeleteIcon from "@material-ui/icons/Delete";
import { colors } from "@material-ui/core";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Container = styled.div`
  margin-top: 30px;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #c3c3c3;
  border-radius: 20px;
  width: 50rem;
  height: 15rem;
  cursor: pointer;
  background-color: #fff8f9;
  font-size: large;
  /* border-style: dotted; */
`;
const Text = styled.h4`
  margin-top: 20px;
`;

const TextDetail = styled.h6`
  font-weight: lighter;
  padding-top: 0.5rem;
`;

const Images = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: right;
  align-items: right;
`;

const Image = styled.div`
  margin: 1rem 0.5rem;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;
const Error = styled.h5`
  text-align: center;
`;
const ErrorDetail = styled.h5`
  color: red;
`;
const LabelGroup = styled.div`
  display: flex;
`;
const LabelText = styled.h6`
  margin-top: 30px;
`;

const InputWrapper = styled.div`
[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  color: black;
  cursor: pointer;
  padding: 0.5rem 50px;
  font-size: 22px;  
`

const Detail = styled.h6`
  font-weight: lighter;
  color: black;
  cursor: pointer;
  padding-left: 68px;
`;

const DetailAdd = styled.h6`
  font-weight: lighter;
  color: black;
  cursor: pointer;
  padding-left: 0px;
`;

const Input = styled.input`
`;

const Label = styled.label`
`;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
  },
};
const AddImage = ({color, editedImages, setEditedImages, setImgChanged, formType}) => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [file, setFile] = useState(null)
  const [id, setId] = useState(null)
  const [imgCount, setImgCount] = useState(0)

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const handleDelete = (img) => {
    let newArr = [...editedImages]

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].img.length; j++) {
        if (newArr[i].img[j].link === img.link) {
          newArr[i].img[j].link = ""
          break;
        }
      }
    }
    setEditedImages(newArr)
  }

useEffect(() => {
  const storeImgLink = (link) => {
    let newArr = [...editedImages]
    if (formType === "edit") {
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].product_color_id === parseInt(id)) {
          newArr[i] = {...newArr[i], new_link: link}
        }
      }
    } else {
      for (let i = 0; i < newArr.length; i++) {
        if (parseInt(newArr[i].index) === parseInt(id)) {
          if (parseInt(newArr[i].is_main_color) === 1) {
            // 5 images
            let count = 0;
            let set = false;
            
            for (let j = 0; j < newArr[i].img.length; j++) {
               if (newArr[i].img[j].link !== "") {
                count++;
              } else {
                newArr[i].img[j].link = link;
                set = true;
                break;
              }
            }

            if (count > 4) {
              toast.error("Cannot upload more than 5 images !!", {
              position: "top-center",
            })
            } else if (!set) {
              newArr[i].img.push({link: link})
            } 
            // if (newArr[i].img[0].link !== "") {
            //   newArr[i].img.push({link: link})
            // } else {
            //   newArr[i].img[0].link = link;
            // }
          } else {
            // 1 image
            newArr[i].img[0].link = link;
          }
        }
      }
      
    }
    setEditedImages(newArr)
    setId(null)
    // setInputs(prev => ({...prev, image: link}))
    // console.log("ok")
}

  const handleChange = () => {
    
    if (file != null)
    {
    const fileName = new Date().getTime() + file.name
    
    const storage = getStorage(app)

      let storageRef = ref(storage, fileName);
      let uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
      },
      (error) => {
        console.log(error.toString)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
          setFile(null)
          storeImgLink(downloadURL)
        });
      }
    );
  }
}
  if (file !== null && id !== null) {
    handleChange();
    if (formType === "edit") {
      setImgChanged(true)
    }
  }
}, [file, editedImages, setEditedImages, setImgChanged, formType, id])

  return (
    <Container>
      <Wrapper>
        {
          formType === "edit" ? 
          <>
          <InputWrapper>
          <Input type="file"
          name={`img-${color.product_color_id}`}
          id={color.product_color_id}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setId(e.target.id)
          }}
          accept="image/png , image/jpeg, image/webp"/>
          <Label htmlFor={color.product_color_id}>+ Click Here to Update Image</Label>
          <Detail>replace this image with a new image</Detail>
          </InputWrapper>
          </>
          : 
          parseInt(color.is_main_color) === 1?
          <>
          <InputWrapper>
          <Input type="file"
          name={`img-${color.index}`}
          id={color.index}
          multiple
          onChange={(e) => {
            setFile(e.target.files[0]);
            setId(e.target.id)
          }}
          accept="image/png , image/jpeg, image/webp"/>
          <Label htmlFor={color.index}>+ Add Images</Label>
          <DetailAdd>please upload 5 images for main color</DetailAdd>
          </InputWrapper>
          
        {/* <Text>+ Add Images</Text>
        <TextDetail>up to 5 images</TextDetail>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        /> */}
          </>
          :
          <>
          <InputWrapper>
          <Input type="file"
          name={`img-${color.index}`}
          id={color.index}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setId(e.target.id)
          }}
          accept="image/png , image/jpeg, image/webp"/>
          <Label htmlFor={color.index}>+ Add Image</Label>
          <DetailAdd>please upload one image for other color</DetailAdd>
          </InputWrapper>
          </>
        }
      </Wrapper>
      <br />

      {/* {selectedImages.length > 0 &&
        (selectedImages.length > 5 ? (
          <Error>
            You can't upload more than 5 images! <br />
            <ErrorDetail>
              please delete <b> {selectedImages.length - 5} </b> of them{" "}
            </ErrorDetail>
          </Error>
        ) : (
          <></>
        ))} */}
      {
        formType === "add" ?
        <>
              <Images>
      {editedImages.filter((img) => parseInt(img.index) === parseInt(color.index)).map((img) => (
      <Fragment key={img.index}>
        {
          img.img.filter((img) => img.link !== "").map((img, index) => (
            <Fragment key={index}>
            <Image key={index}>
                <img src={img.link} height="150" weight="150" alt="upload" />

                <LabelGroup>
                  <LabelText>
                    <b>Image: {index + 1}</b>
                  </LabelText>
                  <Controls.Button
                    text="delete image"
                    onClick={() => handleDelete(img)}
                    startIcon={<DeleteIcon />}
                    style={styles.customButton}
                  />
                </LabelGroup>
              </Image>
            </Fragment>
          ))
        }
      </Fragment>

      ))}
        {/* {editedImages &&
          editedImages.img.map((image, index) => {
            return (
              <Image key={index}>
                <img src={image.link} height="150" weight="150" alt="upload" />

                <LabelGroup>
                  <LabelText>
                    <b>Image: {index + 1}</b>
                  </LabelText>
                  <Controls.Button
                    text="delete image"
                    onClick={() => deleteHandler(image)}
                    startIcon={<DeleteIcon />}
                    style={styles.customButton}
                  />
                </LabelGroup>
              </Image>
            );
          })} */}
      </Images>
      </>
      : undefined
      }

    </Container>
  );
};

export default AddImage;
