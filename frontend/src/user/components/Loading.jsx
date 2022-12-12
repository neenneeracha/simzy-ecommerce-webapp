/********************************************************************
 *
 * Loading.jsx
 *
 *   This file represents loading component of SIMZY
 *   which will be called use when wait for the server response
 *
 ********************************************************************
 */

import React from "react";
import styled from "styled-components";
import { HashLoader } from "react-spinners";

// style the components
const Container = styled.div`
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Loading = ({ loading }) => {
  return (
    <Container>
      <HashLoader color="#eda3b5" loading={loading} size={150} />
    </Container>
  );
};

export default Loading;
