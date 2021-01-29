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
import CheckboxTree from "react-checkbox-tree";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { ArrowRight, ArrowDropDown } from "@material-ui/icons";
import { GrCheckboxSelected } from "react-icons/gr";

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
      myCategories.push({
        value: category._id,
        label: category.name,
        parentId: category.parentId,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
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

  //update category functionality
  //checked and expanded stores only ids of checked and expanded categories
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  //checkedArray and expandedArray -> stores the categories which has stored in check and expanded array
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  //handle update category modal
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(
    "hide-modal"
  );
  const openUpdateCategoryModal = () => {
    setShowUpdateCategoryModal("show-modal");
  };

  const closeUpdateCategoryModal = () => {
    setShowUpdateCategoryModal("hide-modal");
  };
  const [categoryType, setCategoryType] = useState("");

  const categoryTypesArray = [
    // { value: "", name: "Select Type" },
    { value: "store", name: "Store" },
    { value: "product", name: "Product" },
    { value: "page", name: "Page" },
  ];

  const handleCategoriesEdit = () => {
    //find the categories (by id stored in checked ) from the categories and store in checkedArray
    //NOTE: checked and expanded stored only _ids
    checked.map((_id) => {
      const cat = categoryReducer.categories.find((c1) => _id === c1._id);
      return checkedArray.push(cat);
    });

    //same for expanded
    expanded.map((_id) => {
      const cat = categoryReducer.categories.find((c1) => _id === c1._id);
      return expandedArray.push(cat);
    });
    console.log(JSON.stringify(checkedArray));
    console.log(JSON.stringify(expandedArray));

    openUpdateCategoryModal();
  };

  const handleCloseEditCategoryModal = () => {
    setExpandedArray([]);
    setCheckedArray([]);
    closeUpdateCategoryModal();
  };

  const renderCategoriesToEdit = (categories) => {
    return categories.map((cat, index) => (
      <Row key={`CategoryInputRow${index}`}>
        <MaterialInput
          labelName="Category name"
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
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          options={categoryTypesArray}
          defaultSelect="Select Category Type"
          defaultSelectValue=""
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
      </Row>
    ));
  };

  //update category modal
  const updateCategoryModal = () => {
    return (
      <CustomModal
        show={showUpdateCategoryModal}
        modalTitle="Manage Categories"
        className="update-category-modal"
      >
        <Form
          className="form update-category-modal-form"
          encType="multipart/form-data"
        >
          {renderCategoriesToEdit(expandedArray)}
          {renderCategoriesToEdit(checkedArray)}
          <Container className="buttonGroups">
            <Button
              size="small"
              className="button"
              variant="contained"
              color="secondary"
              disableElevation
              onClick={handleCloseEditCategoryModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              className="button"
              variant="contained"
              color="primary"
              disableElevation
            >
              Save Changes
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
            {/* {renderCategories(categoryReducer.categories)} */}
            <CheckboxTree
              nodes={renderCategories(categoryReducer.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                uncheck: <ImCheckboxUnchecked />,
                check: <ImCheckboxChecked />,
                halfCheck: <GrCheckboxSelected />,
                expandClose: <ArrowRight />,
                expandOpen: <ArrowDropDown />,
                expandAll: <ArrowRight />,
                collapseAll: <ArrowRight />,
                parentClose: (
                  <span className="rct-icon rct-icon-parent-close" />
                ),
                parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                leaf: <span className="rct-icon rct-icon-leaf" />,
              }}
            />
          </Container>
          {addCategoryModal()}
          {updateCategoryModal()}
          <Container fluid className="buttonGroups update-buttons">
            <Button
              size="small"
              className="button deleteCategoryButton"
              variant="contained"
              color="secondary"
              disableElevation
              onClick={() => {}}
            >
              Delete
            </Button>
            <Button
              type="submit"
              size="small"
              className="button deleteCategoryButton"
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleCategoriesEdit}
            >
              Edit
            </Button>
          </Container>
        </Container>
      </Layout>
    </>
  );
};

export default CategoryPage;
