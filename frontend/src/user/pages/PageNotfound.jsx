import React from "react";
import styled from "styled-components";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;
const Image = styled.img`
  height: 40%;
  width: 40%;
`;

const Text = styled.h4`
  height: 40%;
  width: 40%;
  b {
    color: #eda3b5;
    font-size: 40px;
  }
`;
const PageNotfound = () => {
  return (
    <Container>
      <Wrapper>
        <Image src={process.env.PUBLIC_URL + "img/404Error-amico.png"} />
        <Text>
          <b>Page Not Found! </b>
          <br /> We’re sorry, the page you requested could not be found <br />{" "}
          Please go back to homepage
          <br />
          <Link to="/">
            <MDBBtn className="mx-2" color="primary" style={{ margin: "10%" }}>
              Go Home
            </MDBBtn>
          </Link>
        </Text>
      </Wrapper>
    </Container>
  );
};

export default PageNotfound;
