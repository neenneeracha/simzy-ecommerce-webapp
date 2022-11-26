import React from "react";
import { ArrowBack } from "@material-ui/icons";

import styled from "styled-components";
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  margin-top: 25px;
  display: flex;
  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const Backbtn = () => {
  const handleClick = () => {
    window.history.back();
  };
  return (
    <MenuItem onClick={handleClick}>
      <ArrowBack style={{ fontSize: 18, marginRight: 4 }} /> BACK
    </MenuItem>
  );
};

export default Backbtn;
