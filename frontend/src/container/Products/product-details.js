import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions";
import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/UI/Breakcrumbs";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./product-details.scss";

export default function ProductDetails(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  console.log(product);
  if (product === null) {
    dispatch(getProductById(id));
  } else if (product._id !== id) {
    // dispatch(getProductById(id));
  }
  return (
    <>
      <Layout sidebar activeNav={"Products"}>
        <Breadcrumbs>
          Products <NavigationIcon className="navigation-icon" />{" "}
          <Col className="text-bold">Details</Col>
        </Breadcrumbs>
        {product !== null ? (
          renderProduct(product)
        ) : (
          <Row>Product Not Found.</Row>
        )}
      </Layout>
    </>
  );
}

function renderProduct(product) {
  return (
    <>
      <Container fluid className="product-details-container">
        <Container fluid className="Product-Image-Container">
          {renderProductImages(product.pictures)}
        </Container>
        <Container fluid className="product-details">
          <Row className="productDetailsBreadcrumbs">
            Products <NavigationIcon className="navigation-icon" /> Details{" "}
            <NavigationIcon className="navigation-icon" /> {product.slug}
          </Row>
          <Row className="product-name">{product.name}</Row>
          <Row className="product-price">Rs.{product.price}</Row>
          <Row className="product-category">{product.categoryId.name}</Row>
          <Row className="product-description-text">Description</Row>
          <Row className="product-description">{product.description}</Row>
        </Container>
      </Container>
    </>
  );
}

function renderProductImages(productImages) {
  console.log("\n\n\n product " + JSON.stringify(productImages));
  return productImages.map((image, index) => {
    const imageName = image.img;
    return (
      <Image
        key = {index}
        src={`http://localhost:3000/public/product-images/${imageName}`}
        alt="product image"
      />
    );
  });
}
