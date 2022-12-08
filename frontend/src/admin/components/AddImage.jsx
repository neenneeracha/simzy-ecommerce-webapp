import React, { useState } from "react";
import styled from "styled-components";
import Controls from "../components/controls/Controls";
import DeleteIcon from "@material-ui/icons/Delete";

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
const LebelGroup = styled.div`
  display: flex;
`;
const LebelText = styled.h6`
  margin-top: 30px;
`;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
  },
};
const AddImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);

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

  return (
    <Container>
      <Wrapper>
        <Text>+ Add Images</Text>
        <TextDetail>up to 5 images</TextDetail>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </Wrapper>
      <br />

      {selectedImages.length > 0 &&
        (selectedImages.length > 5 ? (
          <Error>
            You can't upload more than 5 images! <br />
            <ErrorDetail>
              please delete <b> {selectedImages.length - 5} </b> of them{" "}
            </ErrorDetail>
          </Error>
        ) : (
          <></>
        ))}

      <Images>
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <Image key={image}>
                <img src={image} height="150" weight="150" alt="upload" />

                <LebelGroup>
                  <LebelText>
                    <b>Image: {index + 1}</b>
                  </LebelText>
                  <Controls.Button
                    text="delete image"
                    onClick={() => deleteHandler(image)}
                    startIcon={<DeleteIcon />}
                    style={styles.customButton}
                  />
                </LebelGroup>
              </Image>
            );
          })}
      </Images>
    </Container>
  );
};

export default AddImage;
