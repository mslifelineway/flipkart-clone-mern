import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions";
import Layout from "../../components/Layout";
import MaterialInput from "../../components/UI/MaterialUI/Input";
import { USER } from "../../utils/constants";
import { validateEmail, validatePassword } from "../../validations";

function Signin() {
  const dispatch = useDispatch();

  //states
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const auth = useSelector((state) => state.auth);

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  const loginUser = (e) => {
    e.preventDefault();
    let user = { email, password };

    dispatch(login(user));
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
            <Form onSubmit={loginUser}>
              <MaterialInput
                // key="email"
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
                // key="password"
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

export default Signin;
