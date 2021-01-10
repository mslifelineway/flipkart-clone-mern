import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Layout from "../../components/Layout";
import "./category.scss";
import { Input } from "@material-ui/core";
import MaterialSelect from "../../components/UI/MaterialUI/Select";
import { createCategoriesToArray } from "../../utils/helper";
import { validateText } from "../../validations";
import MaterialInput from "../../components/UI/MaterialUI/Input";
import { CATEGORY } from "../../utils/constants";
import CustomModal from "../../components/UI/CustomModal";

const CategoryPage = () => {
  const dispatch = useDispatch();

  const categoryReducer = useSelector((state) => state.category);
  const [show, setShow] = useState("hide-modal");
  const handleClose = () => {
    setShow("hide-modal");
    clearFormData();
  };
  const handleShow = () => setShow("show-modal");

  //category form fields
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryImage, setCategoryImage] = useState(undefined); //this categoryImage (file) will store

  const addNewCategory = (e) => {
    e.preventDefault();
    //validate category form data
    if (isCategoryFormValidated()) {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("parentId", parentId);
      fd.append("categoryImage", categoryImage);
      console.log(fd);
      dispatch(addCategory(fd));
      handleClose();
    }
  };

  const isCategoryFormValidated = () => {
    if (name !== "") {
      return true;
    }
    return false;
  };

  const clearFormData = () => {
    setName("");
    setParentId("");
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

  const handleCategoryImage = (e) => {
    let file = e.target.files[0];
    setCategoryImage(file);
  };
  //modal to add the category
  const addCategoryModal = () => {
    return (
      <CustomModal show={show} modalTitle="Add Category">
        <Form
          onSubmit={addNewCategory}
          className="form"
          encType="multipart/form-data"
        >
          <MaterialInput
            labelName="Category Name"
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              validateText(e.target.value, setName, setNameError, CATEGORY)
            }
            errorMessage={nameError}
            showError={true}
          />

          <MaterialSelect
            labelId="categoryOption"
            id="categoryList"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            options={createCategoriesToArray(categoryReducer.categories)}
            defaultSelect="Select Parent Category"
            defaultSelectValue=""
          />

          <Input
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => handleCategoryImage(e)}
          />

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

  return (
    <>
      <Layout sidebar activeNav={"Categories"}>
        <Container
          fluid
          className="categories_page custom-modal-parent-container"
        >
          <Container fluid className="body-header">
            <Col className="title">Category</Col>
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
            {renderCategories(categoryReducer.categories)}
          </Container>
          {addCategoryModal()}
        </Container>
      </Layout>
    </>
  );
};

export default CategoryPage;
