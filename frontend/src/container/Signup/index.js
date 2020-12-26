import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

function Signup() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (auth.authenticate) {
    return <Redirect to={'/'} />
  }

  const registerUser = (e) => {
    e.preventDefault();
    let user = { firstName, lastName, email, password }

    dispatch(register(user));

  }
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
              <Input
                controlId="firstNameInput"
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                errorMessage=""
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                controlId="lastNameInput"
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                errorMessage=""
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                controlId="emailInput"
                label="Email"
                type="email"
                placeholder="Enter Email"
                value={email}
                errorMessage=""
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                controlId="passwordInput"
                label="Password"
                type="password"
                placeholder="XXXXXXX"
                value={password}
                errorMessage=""
                onChange={(e) => setPassword(e.target.value)}
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
