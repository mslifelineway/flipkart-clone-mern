import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";

function Signin() {
  const dispatch = useDispatch();

  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  if (auth.authenticate) {
    return <Redirect to={'/'} />
  }

  const loginUser = (e) => {
    e.preventDefault();
    let user = { email, password }

    dispatch(login(user));

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
            <Form onSubmit={loginUser}>

              <Input
                controlId="emailInput"
                label="Email"
                type="email"
                placeholder="Enter Email"
                value={email}
                errorMessage=""
                onChange={e => setEmail(e.target.value)}
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

export default Signin;
