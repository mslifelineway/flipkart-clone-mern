import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategories } from '../../actions';
import Layout from '../../components/Layout';
import "./product.scss";
import { Input } from '@material-ui/core';
import MaterialSelect from '../../components/UI/MaterialUI/Select';

const ProductsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategories())
    }, [])
    const categoryReducer = useSelector(state => state.category);
    //add category modal vars
    const [show, setShow] = useState('hide-modal');
    const handleClose = () => setShow('hide-modal');
    const handleShow = () => setShow('show-modal');

    //category form fields
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");
    const [categoryImage, setCategoryImage] = useState(null);//this categoryImage (file) will store 

    const addNewCategory = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("name", name);
        fd.append("parentId", parentId);
        fd.append("categoryImage", categoryImage);
        console.log(fd)
        dispatch(addCategory(fd))
        handleClose();
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <Container key={category._id} fluid>{renderCategoryItem(category)}</Container>
            );
        }
        return myCategories;
    };

    const renderCategoryItem = (category) => {
        return <>
            <Row>
                <Col>{category.name}</Col>
            </Row>
            {category.children.length > 0 ? <Row><Col className="child">{renderCategories(category.children)}</Col></Row> : null}
        </>
    }

    //get category list in normal json format for select option
    const createCategoryList = (categories, options = []) => {
        for (let cat of categories) {
            options.push({ value: cat._id, name: cat.name });
            if (cat.children.length > 0) {
                createCategoryList(cat.children, options)
            }
        }
        return options;
    }

    const handleCateogryImage = (e) => {
        let file = e.target.files[0];
        console.log(file)
        setCategoryImage(file);
    }
    //modal to add the category
    const addCategoryModal = () => {

        return (
            <Container fluid className={`appModal ${show}`}>
                <Container className="modal-body category-form">
                    <Form onSubmit={addNewCategory} className="category-form" encType="multipart/form-data">
                        <Container fluid className="body-header">
                            <Col className="title">Add Product</Col>
                        </Container>
                        <Input
                            label="Product Name"
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <Input
                            label="Quantity"
                            type="text"
                            placeholder="Quantity"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <Input
                            label="Price"
                            type="text"
                            placeholder="Price"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <Input
                            label="Description"
                            type="text"
                            placeholder="Description"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <MaterialSelect
                            labelId="categoryOption"
                            id="categoryList"
                            value={parentId}
                            onChange={(e) => { setParentId(e.target.value) }}
                            options={createCategoryList(categoryReducer.categories)}
                            defaultSelect="Select Parent Category"
                            defaultSelectValue=""
                        />

                        <Input
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            onChange={e => handleCateogryImage(e)}
                        />

                        <Container className="buttonGroups">
                            <Button size="small" className="addCategoryButton" variant="contained" color="secondary" disableElevation onClick={handleClose}>
                                Cancel
                        </Button>
                            <Button type="submit" size="small" className="addCategoryButton" variant="contained" color="primary" disableElevation>
                                Add
                        </Button>
                        </Container>
                    </Form>
                </Container>
            </Container>
        );
    }

    return (
        <><Layout sidebar>
            <Container fluid className="products_page">
                <Container fluid className="body-header">
                    <Col className="title">Products</Col>
                    <Button size="small" className="addCategoryButton" variant="contained" color="default" onClick={handleShow}>
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
}

export default ProductsPage;