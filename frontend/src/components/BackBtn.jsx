import React from "react";
import Button from "react-bootstrap/Button";

const BackBtn = () => {
  return (
    <Button
      className="d-block mx-auto w-75"
      type="submit"
      variant="outline-dark"
      style={{ marginTop: "30px" }}
    >
      Back
    </Button>
  );
};

export default BackBtn;
