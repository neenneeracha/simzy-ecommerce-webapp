/********************************************************************
 *
 * AddImage.jsx
 *
 *    This file is used for SIMZY administrator to add product images
 *
 ********************************************************************
 */

import React, { useState, Fragment } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/firebase";
import Controls from "../components/controls/Controls";
import DeleteIcon from "@material-ui/icons/Delete";
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
  }
`;

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

const Input = styled.input``;

const Label = styled.label``;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
  },
};

const AddImage = ({
  color,
  editedImages,
  setEditedImages,
  setImgChanged,
  formType,
}) => {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);

  // delete edited image
  const handleDelete = (img) => {
    let newArr = [...editedImages];

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].img.length; j++) {
        if (newArr[i].img[j].link === img.link) {
          newArr[i].img[j].link = "";
          break;
        }
      }
    }
    setEditedImages(newArr);
  };

  useEffect(() => {
    const storeImgLink = (link) => {
      let newArr = [...editedImages];
      if (formType === "edit") {
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].product_color_id === parseInt(id)) {
            newArr[i] = { ...newArr[i], new_link: link };
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
                });
              } else if (!set) {
                newArr[i].img.push({ link: link });
              }
            } else {
              // 1 image
              newArr[i].img[0].link = link;
            }
          }
        }
      }
      setEditedImages(newArr);
      setId(null);
    };

    const handleChange = () => {
      if (file != null) {
        const fileName = new Date().getTime() + file.name;

        const storage = getStorage(app);

        let storageRef = ref(storage, fileName);
        let uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error.toString);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              setFile(null);
              storeImgLink(downloadURL);
            });
          }
        );
      }
    };
    if (file !== null && id !== null) {
      handleChange();
      if (formType === "edit") {
        setImgChanged(true);
      }
    }
  }, [file, editedImages, setEditedImages, setImgChanged, formType, id]);

  return (
    <Container>
      <Wrapper>
        {formType === "edit" ? (
          <>
            <InputWrapper>
              <Input
                type="file"
                name={`img-${color.product_color_id}`}
                id={color.product_color_id}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setId(e.target.id);
                }}
                accept="image/png , image/jpeg, image/webp"
              />
              <Label htmlFor={color.product_color_id}>
                + Click Here to Update Image
              </Label>
              <Detail>replace this image with a new image</Detail>
            </InputWrapper>
          </>
        ) : parseInt(color.is_main_color) === 1 ? (
          <>
            <InputWrapper>
              <Input
                type="file"
                name={`img-${color.index}`}
                id={color.index}
                multiple
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setId(e.target.id);
                }}
                accept="image/png , image/jpeg, image/webp"
              />
              <Label htmlFor={color.index}>+ Add Images</Label>
              <DetailAdd>please upload 5 images for main color</DetailAdd>
            </InputWrapper>
          </>
        ) : (
          <>
            <InputWrapper>
              <Input
                type="file"
                name={`img-${color.index}`}
                id={color.index}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setId(e.target.id);
                }}
                accept="image/png , image/jpeg, image/webp"
              />
              <Label htmlFor={color.index}>+ Add Image</Label>
              <DetailAdd>please upload one image for other color</DetailAdd>
            </InputWrapper>
          </>
        )}
      </Wrapper>
      <br />
      {formType === "add" ? (
        <>
          <Images>
            {editedImages
              .filter((img) => parseInt(img.index) === parseInt(color.index))
              .map((img) => (
                <Fragment key={img.index}>
                  {img.img
                    .filter((img) => img.link !== "")
                    .map((img, index) => (
                      <Fragment key={index}>
                        <Image key={index}>
                          <img
                            src={img.link}
                            height="150"
                            weight="150"
                            alt="upload"
                          />

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
                    ))}
                </Fragment>
              ))}
          </Images>
        </>
      ) : undefined}
    </Container>
  );
};

export default AddImage;
