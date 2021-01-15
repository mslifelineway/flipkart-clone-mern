import { Container, Row } from "react-bootstrap";
import "./index.scss";
import { getAllCategories } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MenuHeader(props) {
  const dispatch = useDispatch();

  const categoryReducer = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const renderCategories = (categories) => {
    return categories.map((cat, index) => {
      const categorySlug = cat.slug;
      return cat.parentId === undefined ? (
        <Container
          key={`parentContainer${categorySlug + index}`}
          className="parentContainer"
        >
          <Row>{cat.name}</Row>
          {cat.children.length > 0 ? (
            <Container
              key={`parentChildContainer${categorySlug + index}`}
              className="parentChildContainer"
            >
              {renderCategories(cat.children)}
            </Container>
          ) : null}
        </Container>
      ) : (
        <>
          <a key={`ahref${categorySlug + index}`} href={categorySlug}>
            {cat.name}
          </a>
          {cat.children.length > 0 ? (
            <Container
              key={`childContainer${categorySlug + index}`}
              className="childContainer"
            >
              {renderCategories(cat.children)}
            </Container>
          ) : null}
        </>
      );
    });
  };

  return (
    <>
      <Container className="menuHeader">
        {/* <Container className="menuHeaderItems"> */}
        {renderCategories(categoryReducer.categories)}
        {/* </Container> */}
      </Container>
    </>
  );
}

export default MenuHeader;
