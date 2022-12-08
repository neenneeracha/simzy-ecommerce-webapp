import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import BackNavBar from "../components/BackNavBar";
import { Link, useNavigate } from "react-router-dom";
import { useUserUpdate } from "../../UserContext";
import axios from "axios";
import Alert from "../components/Alert";

const Container = styled.div `
  position: fixed;
  padding: 0px 15px;
  margin: 0px auto;
`;

const Title = styled.h3 `
  color: #eda3b5;
  text-align: center;
  font-weight: bold;
`;

const Text = styled.div `
  text-align: center;
`;

const LinkItem = styled.span `
  color: #eda3b5;
  text-decoration: underline;

  &:hover {
    font-weight: bold;
    color: black;
  }
`;

const FieldName = styled.b `
  
`

const styles = {
    customButton: {
        backgroundColor: "#eda3b5",
        borderColor: "#eda3b5",
        color: "white",
        borderRadius: "5px",
        marginTop: "6%",
    },
};

const Login = () => {
    const { setToken } = useUserUpdate();
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        title: "",
        message: "",
        type: "",
        link: ""
    });

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async() => {
        const checkEmail = inputs.email.split(' ').join('').length < 1
        const checkPassword = inputs.password.split(' ').join('').length < 1

        if (checkEmail && checkPassword) {
            setError((prev) => ({...prev, title: "Invalid Input", message: "Email and Password cannot be blank, please try again!", type: "error" }));
            setShow(true);
        } else if (checkEmail) {
            setError((prev) => ({...prev, title: "Invalid Input", message: "Email cannot be blank, please try again!", type: "error" }));
            setShow(true);
        } else if (checkPassword) {
            setError((prev) => ({...prev, title: "Invalid Input", message: "Password cannot be blank, please try again!", type: "error" }));
            setShow(true);
        } else {
            try {
                const res = await axios.post(
                    "http://localhost:8080/api/v1/auth/login",
                    inputs
                );
                setToken(res.data);
                navigate("/");
                window.location.reload();
            } catch (err) {
                console.log(err);
                if (err.response.status === 500) {
                    setError((prev) => ({...prev, title: "Something went wrong", message: err.response.data.msg, type: "error" }));
                    setShow(true);
                } else {
                    setError((prev) => ({...prev, title: "Invalid Credentials", message: err.response.data.msg, type: "error" }));
                    setShow(true);
                }
            }
        }

    };

    return ( <
        Container >
        <
        BackNavBar / > {
            show ? < ErrorAlert show = { show }
            setShow = { setShow }
            error = { error }
            setError = { setError }
            /> :
                undefined
        } <
        Row >
        <
        Col xs = { 12 }
        md = { 6 } >
        <
        Image src = { process.env.PUBLIC_URL + "img/login.png" }
        height = "80%"
        width = "80%"
        style = {
            { marginLeft: "10%", marginTop: "10%", objectFit: "cover" } }
        /> <
        /Col> <
        Col style = {
            { marginRight: "5%", marginTop: "5%" } } >
        <
        Title style = {
            { width: "80%", marginLeft: "10%", marginTop: "10%" } }
        className = "center" >
        WELCOME TO SIMZY <
        /Title> <
        Form style = {
            { margin: "30px 100px" } } >
        <
        Form.Group controlId = "emailInput"
        style = {
            { marginTop: "30px" } } >
        <
        Form.Label >
        <
        FieldName > Email: < /FieldName> <
        /Form.Label> <
        Form.Control type = "text"
        placeholder = "Enter your email"
        name = "email"
        required onChange = { handleChange }
        /> <
        /Form.Group>

        <
        Form.Group controlId = "passwordInput"
        style = {
            { marginTop: "30px" } } >
        <
        Form.Label >
        <
        FieldName > Password: < /FieldName> <
        /Form.Label> <
        Form.Control type = "password"
        placeholder = "Enter your password"
        name = "password"
        required onChange = { handleChange }
        /> <
        /Form.Group> <
        Button className = "d-block mx-auto w-75"
        style = { styles.customButton }
        onClick = { handleSubmit } >
        Submit <
        /Button> <
        Text style = {
            { marginTop: "2%", marginBottom: "5%" } } >
        Need an account ? & nbsp; <
        Link style = {
            { textDecoration: "none" } }
        to = "/register" >
        <
        LinkItem > CREATE NOW < /LinkItem> <
        /Link> <
        /Text> <
        /Form> <
        /Col> <
        /Row> <
        /Container>
    );
};

export default Login;