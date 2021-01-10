import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import Layout from "../../components/Layout";
import "./product.scss";
import { Input } from "@material-ui/core";
import MaterialSelect from "../../components/UI/MaterialUI/Select";
import { createCategoriesToArray } from "../../utils/helper";
import {
  PRODUCT,
  QUANTITY_NUMBER,
  PRICE_NUMBER,
  CATEGORY,
} from "../../utils/constants";
import MaterialInput from "../../components/UI/MaterialUI/Input";
import {
  validateText,
  validateNumber,
  validateSelect,
} from "../../validations";
import CustomModal from "../../components/UI/CustomModal";
import DataTable from "../../components/UI/MaterialUI/MaterializedDataTable";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const categoryReducer = useSelector((state) => state.category);
  const productReducer = useSelector((state) => state.product);

  //add category modal vars
  const [show, setShow] = useState("hide-modal");
  const handleClose = () => {
    setShow("hide-modal");
    clearFormData();
  };
  const handleShow = () => setShow("show-modal");

  //category form fields
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState("");
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [productImages, setProductImages] = useState([]);

  const addNewProduct = (e) => {
    e.preventDefault();
    if (isProductFormValidated()) {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("quantity", quantity);
      fd.append("price", price);
      fd.append("description", description);
      fd.append("categoryId", categoryId);
      productImages.map((file) => {
        return fd.append("productImages", file);
      });
      dispatch(addProduct(fd));
      handleClose();
    }
  };

  const isProductFormValidated = () => {
    if (
      name !== "" &&
      Number(quantity) > 0 &&
      Number(price) > 0 &&
      description !== "" &&
      categoryId !== ""
    ) {
      return true;
    }
    return false;
  };

  const clearFormData = () => {
    setName("");
    setQuantity(0);
    setPrice(0);
    setDescription("");
    setCategoryId("");
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <Container key={category._id} fluid>
          {renderCategoryItem(category)}
        </Container>
      );
    }
    return myCategories;
  };

  const renderCategoryItem = (category) => {
    return (
      <>
        <Row>
          <Col>{category.name}</Col>
        </Row>
        {category.children.length > 0 ? (
          <Row>
            <Col className="child">{renderCategories(category.children)}</Col>
          </Row>
        ) : null}
      </>
    );
  };

  const handleProductImages = (e) => {
    setProductImages([...e.target.files]);
  };

  //modal to add the category
  const addFormModal = () => {
    return (
      <CustomModal show={show} modalTitle="Add Product">
        <Form
          onSubmit={addNewProduct}
          className="form"
          encType="multipart/form-data"
        >
          <MaterialInput
            labelName="Product Name"
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              validateText(e.target.value, setName, setNameError, PRODUCT)
            }
            errorMessage={nameError}
            showError={true}
          />

          <MaterialInput
            labelName="Quantity"
            type="number"
            placeholder="0"
            value={quantity}
            onChange={(e) =>
              validateNumber(
                e.target.value,
                setQuantity,
                setQuantityError,
                QUANTITY_NUMBER
              )
            }
            errorMessage={quantityError}
            showError={true}
          />

          <MaterialInput
            labelName="Price"
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) =>
              validateNumber(
                e.target.value,
                setPrice,
                setPriceError,
                PRICE_NUMBER
              )
            }
            errorMessage={priceError}
            showError={true}
          />

          <MaterialInput
            labelName="Description"
            type="text"
            placeholder="desciption"
            value={description}
            onChange={(e) =>
              validateText(
                e.target.value,
                setDescription,
                setDescriptionError,
                PRODUCT
              )
            }
            errorMessage={descriptionError}
            showError={true}
          />

          <MaterialSelect
            labelId="categoryOption"
            id="categoryList"
            value={categoryId}
            onChange={(e) => {
              validateSelect(
                e.target.value,
                setCategoryId,
                setCategoryError,
                CATEGORY
              );
            }}
            options={createCategoriesToArray(categoryReducer.categories)}
            defaultSelect="Select Category"
            defaultSelectValue=""
            errorMessage={categoryError}
            showError={true}
          />

          <Input
            type="file"
            inputProps={({ accept: "image/*" }, { multiple: "multiple" })}
            onChange={(e) => handleProductImages(e)}
            className="multipleImageSelectInput"
          />

          <Container>
            {productImages.length > 0
              ? productImages.map((pic, index) => (
                  <Col key={index}> {pic.name}</Col>
                ))
              : null}
          </Container>

          <Container className="buttonGroups">
            <Button
              size="small"
              className="addCategoryButton"
              variant="contained"
              color="secondary"
              disableElevation
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              className="addCategoryButton"
              variant="contained"
              color="primary"
              disableElevation
            >
              Add
            </Button>
          </Container>
        </Form>
      </CustomModal>
    );
  };

  //product details
  const columns = [
    { field: "id", headerName: "Sl.No", width: 100 }, //key of eack row, this must be unique
    { field: "_id", headerName: "Product Id", width: 200 }, //product id
    { field: "name", headerName: "Name", width: 250 },
    { field: "quantity", headerName: "Quantity", type: "number", width: 130 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 130,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 250,
    },
  ];

  let productListRows = productReducer.products.map((p, index) => {
    return {
      id: index + 1,
      ...p,
    };
  });
  // let history = useHistory();
  const productDetailsPage = (id) => {
    // console.log("---id " + id);
    // history.push(`/product/${id}`);
    window.open(`/product/${id}/details`);
  };
  return (
    <>
      <Layout sidebar activeNav={"Products"}>
        <Container
          fluid
          className="products_page custom-modal-parent-container"
        >
          <Container fluid className="body-header">
            <Col className="title">Products</Col>
            <Button
              size="small"
              className="addCategoryButton"
              variant="contained"
              color="default"
              onClick={handleShow}
            >
              +Add
            </Button>
          </Container>
          <Container fluid>
            <DataTable
              columns={columns}
              rows={productListRows}
              perPage={10}
              onRowClick={productDetailsPage}
            />
            {/* <CustomReactTable /> */}
          </Container>
          {addFormModal()}
        </Container>
      </Layout>
    </>
  );
};

export default ProductsPage;
