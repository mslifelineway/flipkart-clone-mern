import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions";
import Layout from "../../components/Layout";
import MaterialInput from "../../components/UI/MaterialUI/Input";
import { FIRST_NAME, LAST_NAME, USER } from "../../utils/constants";
import {
  validateEmail,
  validateText,
  validatePassword,
} from "../../validations";

function Signup() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //states
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  const registerUser = (e) => {
    e.preventDefault();
    let user = { firstName, lastName, email, password };

    dispatch(register(user));
  };
  return (
    <Layout>
      <Container>
        <Row
          style={{
            marginTop: "30px",
            background: "#f2f2f2",
            padding: "40px",
            borderRadius: "5px",
          }}
        >
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={registerUser}>
              <MaterialInput
                labelName="First Name"
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) =>
                  validateText(
                    e.target.value,
                    setFirstName,
                    setFirstNameError,
                    FIRST_NAME
                  )
                }
                errorMessage={firstNameError}
                showError={true}
              />
              <MaterialInput
                labelName="Last Name"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) =>
                  validateText(
                    e.target.value,
                    setLastName,
                    setLastNameError,
                    LAST_NAME
                  )
                }
                errorMessage={lastNameError}
                showError={true}
              />
              <MaterialInput
                labelName="Email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) =>
                  validateEmail(e.target.value, setEmail, setEmailError, USER)
                }
                errorMessage={emailError}
                showError={true}
              />

              <MaterialInput
                labelName="Password"
                type="password"
                placeholder="xxxxxx"
                value={password}
                onChange={(e) =>
                  validatePassword(
                    e.target.value,
                    setPassword,
                    setPasswordError,
                    USER
                  )
                }
                errorMessage={passwordError}
                showError={true}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup;
