import { Container, Image, Row } from "react-bootstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./index.scss";
import { generateProductImagePublicUrl } from "../../redux/Axios/urlConfig";
/**
 * showing a single product with image, name, ratings, price, favorite icon
 * @param {props} props
 */
function ProductDetailsItem(product) {
  return (
    <>
      <Container className="item">
        <Row className="image">
          <Image
            src={generateProductImagePublicUrl(
              product.pictures[0] ? product.pictures[0].img : ""
            )}
            alt="product image"
          />
          <FavoriteIcon className="favoriteIcon" />
        </Row>
        <Row className="name">{product.name}</Row>
        <Row className="ratings">5.4, (3000)</Row>
        <Row className="price">₹{product.price}</Row>
      </Container>
    </>
  );
}

export default ProductDetailsItem;
