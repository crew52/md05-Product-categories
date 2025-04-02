import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import CategoryService from "../../services/category.service";
import ProductService from "../../services/product.service";

function ProductCreate() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.getAllCategories().then(res => {
            setCategories(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            categoryId: "",
            price: "",
            rating: "",
            stock: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required").min(2, "Must be at least 2 characters"),
            categoryId: Yup.string().required("Category is required"),
            price: Yup.number().required("Price is required").positive("Price must be positive"),
            rating: Yup.number().required("Rating is required").min(0, "Min: 0").max(5, "Max: 5"),
            stock: Yup.number().required("Stock is required").positive("Must be a positive number"),
        }),
        onSubmit: values => {
            const productData = { ...values, createdAt: new Date().toISOString() };
            ProductService.createProduct(productData).then(() => {
                toast.success("Product created successfully");
                navigate("/products");
            }).catch(() => {
                toast.error("Failed to create product");
            });
        }
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ width: 500, p: 3 }}>
                <CardHeader title="Create Product" sx={{ textAlign: "center" }} />
                <CardContent>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField label="Product Name" name="name" fullWidth required value={formik.values.name}
                                   onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)}
                                   helperText={formik.touched.name && formik.errors.name} />

                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select name="categoryId"
                                    value={formik.values.categoryId}
                                    onChange={(event) => formik.setFieldValue("categoryId", Number(event.target.value))}
                                    error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}>
                                <MenuItem value="">Select Category</MenuItem>
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField label="Price" name="price" type="number" fullWidth required value={formik.values.price} onChange={formik.handleChange} error={formik.touched.price && Boolean(formik.errors.price)} helperText={formik.touched.price && formik.errors.price} />
                        <TextField label="Rating" name="rating" type="number" fullWidth required value={formik.values.rating} onChange={formik.handleChange} error={formik.touched.rating && Boolean(formik.errors.rating)} helperText={formik.touched.rating && formik.errors.rating} />
                        <TextField label="Stock" name="stock" type="number" fullWidth required value={formik.values.stock} onChange={formik.handleChange} error={formik.touched.stock && Boolean(formik.errors.stock)} helperText={formik.touched.stock && formik.errors.stock} />

                        <Button type="submit" variant="contained" color="primary" fullWidth> Create Product </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ProductCreate;
