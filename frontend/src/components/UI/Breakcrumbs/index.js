import { Container } from "react-bootstrap";
import "./breadcrumbs.scss";
function Breadcrumbs(props) {
  return (
    <>
      <Container fluid className="breadcrumbs-container">
        {props.children}
      </Container>
    </>
  );
}

export default Breadcrumbs;
