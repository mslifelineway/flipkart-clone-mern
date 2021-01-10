import { Container } from "react-bootstrap";
import "./index.scss";
import { getAllCategories } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MenuHeader(props) {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <Container className="menuHeader">MenuHeader</Container>
    </>
  );
}

export default MenuHeader;
