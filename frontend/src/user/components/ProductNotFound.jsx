import React from 'react'
import styled from "styled-components";
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

const ProductNotFound = ({filtered}) => {
  return (
<Container>
      <Wrapper>
        {/* <Image src={process.env.PUBLIC_URL + "img/404Error-amico.png"} />
        <Text>
          <b>Page Not Found! </b>
          <br /> We’re sorry, the page you requested could not be found <br />{" "}
          Please go back to homepage
          <br />
          <Link to = "/">
            Go back
          </Link>
        </Text> */}
      </Wrapper>
    </Container>
  )
}

export default ProductNotFound