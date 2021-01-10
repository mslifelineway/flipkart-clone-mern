import React from "react";
import { Form } from "react-bootstrap";

function ErrorMessageElement({ controlId, errorMessage }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Text className="text-muted">{errorMessage}</Form.Text>
    </Form.Group>
  );
}

export default ErrorMessageElement;
