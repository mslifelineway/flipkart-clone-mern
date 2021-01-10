import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions";
import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/UI/Breakcrumbs";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./product-details.scss";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { generateProductImagePublicUrl } from "../../Axios/urlConfig";

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

  const [productImage, setProductImage] = useState(undefined);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  useEffect(() => {
    if (product !== null && product.pictures.length > 0) {
      setProductImage(product.pictures[0].img);
      setSelectedImageIndex(0);
    }
  }, []);

  const onProductImageClick = (imageName, index) => {
    setProductImage(imageName);
    setSelectedImageIndex(index);
  };

  function renderProduct() {
    return (
      <>
        <Container fluid className="product-details-container">
          <Container fluid className="left-section">
            <Container fluid className="Product-Image-Container">
              <Container fluid className="product-image-lists">
                {renderProductImages()}
              </Container>
              <Container fluid className="product-image-view">
                {productImage ? (
                  <Image
                    key={0}
                    src={generateProductImagePublicUrl(productImage)}
                    alt="product image"
                  />
                ) : null}
              </Container>
            </Container>
            <Container fluid className="buttons-container">
              <Button variant="contained" style={{ outline: "none" }}>
                <ShoppingCartIcon />
                Add to cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ outline: "none" }}
              >
                <TrendingUpIcon />
                Buy Now
              </Button>
            </Container>
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

  function renderProductImages() {
    const productImages = product.pictures;
    return productImages.map((image, index) => {
      const imageName = image.img;
      return (
        <Image
          key={index}
          src={`http://localhost:3000/public/product-images/${imageName}`}
          alt="product image"
          onMouseOver={() => {
            onProductImageClick(
              imageName != null ? imageName : undefined,
              index
            );
          }}
          className={selectedImageIndex === index ? "has-image-selected" : ""}
        />
      );
    });
  }

  return (
    <>
      <Layout sidebar activeNav={"Products"}>
        <Breadcrumbs>
          Products <NavigationIcon className="navigation-icon" />{" "}
          <Col className="text-bold">Details</Col>
        </Breadcrumbs>
        {product !== null ? renderProduct() : <Row>Product Not Found.</Row>}
      </Layout>
    </>
  );
}
