import React from "react";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const styles = {
  gradientCustom: {
    borderTopLeftRadius: "1rem",
    borderBottomLeftRadius: " 1rem",
    background: "#eda3b5",
  },
};

const Profile = () => {
  return (
    <section >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={styles.gradientCustom}
                >
                  <MDBIcon
                    icon="user fa-3x"
                    className="my-5"
                    style = {{color: "black"}}
                  />
                  <MDBTypography  style={{ color: "black"}}tag="h5"><b>Name: JiaJia</b></MDBTypography>
                  <Link style={{ textDecoration: "none", color: "black"}}>
                  <MDBIcon far icon="edit mb-5" />{" "}Edit
                  </Link>
                  
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6"><b>Information</b></MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><b>Email</b></MDBTypography>
                        <MDBCardText className="text-muted">
                          info@example.com
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><b>Phone</b></MDBTypography>
                        <MDBCardText className="text-muted">
                          0934567894
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><b>Gender</b></MDBTypography>
                        <MDBCardText className="text-muted">
                          Women
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><b>Birthday</b></MDBTypography>
                        <MDBCardText className="text-muted">
                          29 April 2022
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6"><b>Default Address</b></MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><b>Name: </b></MDBTypography>
                        <MDBCardText className="text-muted">
                        SoftJai
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><b>Phone: </b></MDBTypography>
                        <MDBCardText className="text-muted">
                          0934567894
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"><b>Address: </b></MDBTypography>
                        <MDBCardText className="text-muted">
                        Thailand, Bangkok, Bang Rak 10120
                        </MDBCardText>
                      </MDBCol>
                     
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Profile;
