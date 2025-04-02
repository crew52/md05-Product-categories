import React from 'react';
import {useEffect, useState} from "react";
import { Link } from "react-router";
import ProductService from "../../services/product.service.js";
import {toast} from "react-toastify";

function ProductList() {
    // state danh sach product
    const [products, setProducts] = useState([]);

    // state load lai data
    const [reloadData, setReloadData] = useState(false);

    // lay ra danh sach Products
    useEffect(() => {
        ProductService.getAllProducts().then(res => {
            setProducts(res.data);
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

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Product Management</h2>

            {/* Search & Filter */}
            <div className="d-flex justify-content-between mb-3">
                <Link to="/products/create">
                    <button className="btn btn-primary">
                        <i className="bi bi-plus-lg"></i> Create
                    </button>
                </Link>
                <div className="d-flex">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search by name..."
                        style={{width: "200px"}}
                    />
                    <select
                        className="form-select me-2"
                        style={{width: "150px"}}
                    >
                        <option value="">All Categories</option>
                    </select>
                    {/* Nút Submit */}
                    <button className="btn btn-secondary" type="submit">
                        Submit
                    </button>
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
                    {products.map((product, index) => (
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
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductList;