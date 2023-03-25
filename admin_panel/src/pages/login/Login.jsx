import React, { useState } from "react";
import axios from "axios";
// import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import loginIcon from "../../Images/user.svg";
import Icon from "../../Images/login.svg";
import "./login.scss";

const Login = () => {
  const [EmployeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [token, setToken] = useState("");

  // const getToken = localStorage.getItem("token");
  // const getUsername = localStorage.getItem("username");

  const navigate = useNavigate();

  let loginuser = async (e) => {
    e.preventDefault();
    const user = { EmployeeID, password };
    axios
      .post("/api/auth/login", user, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("hiiiiiii")
          console.log(response.data.data.Access_token);
          window.localStorage.setItem("token", response.data.data.Access_token);
          window.localStorage.setItem(
            "username",
            response.data.data.details.username
          );
          console.log(response.data);
          console.log(
            response.data.details.username + "============================="
          );
          console.log("=-------------------------------")
          navigate({
            pathname: "/",
          });
//           navigate("/")
          console.log("=-------------------------------")
        }
      })
      .catch((error) => error);
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12} className="text-center p-5 mt-5">
            <img className="icon-img" src={loginIcon} alt="icon" />
            <Form method="POST">
              <Form.Group className="mb-3 mt-2" controlId="formBasicMobile">
                <Form.Control
                  type="text"
                  placeholder="Enter Employee ID"
                  value={EmployeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary btn-block btn"
                type="submit"
                onClick={loginuser}
              >
                Login
              </Button>
              {/* 
              <div className="text-left mt-3">
                <a>
                  <small className="reset">password Reset</small>
                </a>
              </div> */}
            </Form>
          </Col>
          {/* <Col lg={8} md={6} sm={12}> */}

          <Col>
            <h1 className="title">
              {/* <span style={{ color: "#8490ff" }}>
                Location{" "} */}
              <span style={{ color: "tomato", alignItems: "center" }}>
                {" "}
                ADMIN{" "}
              </span>{" "}
              {/* Attenda
              </span> */}
            </h1>
            <img className="w-100" src={Icon} alt="icon" />
          </Col>

          {/* </Col> */}
        </Row>
      </Container>
    </>
  );
};

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

export default Login;
