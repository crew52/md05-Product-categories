import { useNavigate, useParams } from "react-router";
import {
    Box, Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel, Grid, Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import CategoryService from "../../services/category.service.js";
import ProductService from "../../services/product.service.js";

function ProductEdit() {
    const { pid } = useParams();
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(1);
    const [createdAt, setCreatedAt] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        CategoryService.getAllCategories().then(res => {
            setCategories(res.data)
        });

        ProductService.getProductById(pid).then(res => {
            updateProductForm.setValues({
                name: res.data.name,
                categoryId: res.data.categoryId,
                price: res.data.price,
                rating: res.data.rating,
                stock: res.data.stock,
            });
            setCurrentCategory(res.data.categoryId);
            setCreatedAt(res.data.createdAt);
        })
    }, [pid]);

    const updateProductForm = useFormik({
        initialValues: {
            name: "",
            categoryId: "",
            price: "",
            rating: "",
            stock: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required").min(2, "Must be at least 2 characters"),
            categoryId: Yup.string().required("Category is required"),
            price: Yup.number().required("Price is required").positive("Price must be positive"),
            rating: Yup.number().required("Rating is required").min(0, "Min: 0").max(5, "Max: 5"),
            stock: Yup.number().required("Stock is required").positive("Must be a positive number"),
        }),
        onSubmit: values => {
            const updatedValues = { ...values, createdAt };
            console.log(values);
            ProductService.updateProduct(updatedValues, pid).then(() => {
                toast.success("Update product successfully");
                navigate("/products");
            }).catch(error => {
                toast.error("Failed to update product");
            })
        }
    });

    const handleChangeCategory = (e) => {
        setCurrentCategory(e.target.value);
        updateProductForm.setFieldValue("categoryId", +e.target.value);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
            <Grid item xs={12} sm={8} md={6} lg={5}>
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                    <CardHeader title="Update Product" sx={{ textAlign: "center", fontWeight: "bold" }} />
                    <CardContent>
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, display: "flex", flexDirection: "column", gap: 2 }}
                            noValidate
                            autoComplete="off"
                            onSubmit={updateProductForm.handleSubmit}
                        >
                            <TextField
                                required
                                label="Name"
                                name="name"
                                type="text"
                                value={updateProductForm.values.name}
                                error={Boolean(updateProductForm.errors.name && updateProductForm.touched.name)}
                                helperText={updateProductForm.errors.name && updateProductForm.touched.name && updateProductForm.errors.name}
                                onChange={updateProductForm.handleChange}
                            />

                            <TextField
                                required
                                label="Price"
                                type="number"
                                name="price"
                                value={updateProductForm.values.price}
                                error={Boolean(updateProductForm.errors.price && updateProductForm.touched.price)}
                                helperText={updateProductForm.errors.price && updateProductForm.touched.price && updateProductForm.errors.price}
                                onChange={updateProductForm.handleChange}
                            />

                            <TextField
                                required
                                label="Rating"
                                type="number"
                                name="rating"
                                value={updateProductForm.values.rating}
                                error={Boolean(updateProductForm.errors.rating && updateProductForm.touched.rating)}
                                helperText={updateProductForm.errors.rating && updateProductForm.touched.rating && updateProductForm.errors.rating}
                                onChange={updateProductForm.handleChange}
                            />

                            <TextField
                                required
                                label="Stock"
                                type="number"
                                name="stock"
                                value={updateProductForm.values.stock}
                                error={Boolean(updateProductForm.errors.stock && updateProductForm.touched.stock)}
                                helperText={updateProductForm.errors.stock && updateProductForm.touched.stock && updateProductForm.errors.stock}
                                onChange={updateProductForm.handleChange}
                            />

                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={currentCategory}
                                    name="categoryId"
                                    onChange={handleChangeCategory}
                                >
                                    {categories.map(category => (
                                        <FormControlLabel key={category.id} value={category.id} control={<Radio />} label={category.name} />
                                    ))}
                                </RadioGroup>
                                {updateProductForm.errors.categoryId && updateProductForm.touched.categoryId && (
                                    <div style={{ color: 'red' }}>{updateProductForm.errors.categoryId}</div>
                                )}
                            </FormControl>

                            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5 }}>Update</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default ProductEdit;
