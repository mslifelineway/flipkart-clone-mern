import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getProductsByCategorySlug } from "../../redux/actions";
import Button from "@material-ui/core/Button";
import "./index.scss";
import ProductDetailsItem from "../../components/ProductDetailsItem";
import { capatilaizeText } from "../../redux/utils/helper";

function ProductListPage(props) {
  const dispatch = useDispatch();
  const { match } = props;
  useEffect(() => {
    dispatch(getProductsByCategorySlug(match.params.slug));
  }, []);

  const productReducer = useSelector((state) => state.product);
  const products = productReducer.products;
  const productsByPrice = productReducer.productsByPrice;
  const productsTitleByPriceRange = {
    under5K: "Mobile Budget Phones Below ₹5000",
    under10K: "Mobile under ₹10K",
    under15K: "Mobile under ₹15K",
    under20K: "Mobile under ₹20K",
    under25K: "Mobile under ₹25K",
    under30K: "Mobile under ₹30K",
  };
  const renderProductCard = (key, index) => {
    return (
      <Container key={index} className="product-details-card">
        <Container className="card-title">
          <Row>{capatilaizeText(match.params.slug) + " " + productsTitleByPriceRange[key]}</Row>
          <Button variant="contained" color="primary">
            View All
          </Button>
        </Container>
        <Container className="product-items">
          {productsByPrice[key].map((product) => {
            return <ProductDetailsItem {...product} />;
          })}
        </Container>
      </Container>
    );
  };

  return (
    <>
      <Layout>
        <Container className="product-list-page">
          {Object.keys(productsByPrice).map((key, index) => {
            return renderProductCard(key, index);
          })}
        </Container>
      </Layout>
    </>
  );
}

export default ProductListPage;
