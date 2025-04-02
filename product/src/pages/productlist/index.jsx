import React from 'react';
import {useEffect, useState} from "react";
import { Link } from "react-router";
import ProductService from "../../services/product.service.js";
import {toast} from "react-toastify";
import CategoryService from "../../services/category.service.js";
import {Pagination} from "@mui/material";

function ProductList() {
    // state danh sach product
    const [products, setProducts] = useState([]);

    // state load lai data
    const [reloadData, setReloadData] = useState(false);

    // state danh sach categories
    const [categories, setCategories] = useState([]);

    // stage search
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5; // Số lượng products hiển thị trên mỗi trang

    // lay ra danh sach Products
    useEffect(() => {
        ProductService.getAllProducts().then(res => {
            setProducts(res.data);
            setCurrentPage(1);
        });
    }, [reloadData]);

    // delete Product
    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            ProductService.deleteProductById(id).then(() => {
                toast.success("Product deleted successfully");
                setReloadData(!reloadData);
            });
        }
    };

    useEffect(() => {
        CategoryService.getAllCategories().then(res => {
            setCategories(res.data);
        });
    }, []);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        ProductService.getProductsByNameAndCategory(searchKeyword, selectedCategory).then(res => {
            setProducts(res);
            setCurrentPage(1);
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Sắp xếp danh sách users theo rating tăng dần
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);

    // Tính toán user hiển thị dựa trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Product Management</h2>

            {/* Search & Filter */}
            <div className="container mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Nút Create */}
                    <Link to="/products/create">
                        <button className="btn btn-primary">
                            <i className="bi bi-plus-lg"></i> Create
                        </button>
                    </Link>

                    {/* Form tìm kiếm & Lọc danh mục */}
                    <form className="d-flex gap-2" onSubmit={handleSubmitSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name..."
                            value={searchKeyword}
                            onChange={handleSearchInputChange}
                            style={{ width: "200px" }}
                        />

                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            style={{ width: "150px" }}
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        <button className="btn btn-secondary" type="submit">
                            <i className="bi bi-search"></i> Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Product Table */}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Created At</th>
                        <th scope="col" className="text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
                            <tr key={product.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.category?.name || "N/A"}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-info btn-sm me-1">
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        <button className="btn btn-warning btn-sm me-1">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteProduct(product.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No products found</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="d-flex justify-content-center mt-3">
                    <Pagination
                        count={Math.ceil(products.length / productsPerPage)}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductList;