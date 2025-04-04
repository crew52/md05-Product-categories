import React from 'react';
import {useEffect, useState} from "react";
import {Link} from "react-router";
import {toast} from "react-toastify";
import MusicService from "../../../services/music.service.js";

function MusicList() {
    // state danh sach product
    const [musics, setMusics] = useState([]);

    // state load lai data
    const [reloadData, setReloadData] = useState(false);

    // stage search
    const [searchKeyword, setSearchKeyword] = useState("");


    // lay ra danh sach Products
    useEffect(() => {
        MusicService.getAllMusics().then(res => {
            setMusics(res.data);
        });
    }, [reloadData]);


    const handleSubmitSearch = (e) => {
        e.preventDefault();
        MusicService.searchMusicsByName(searchKeyword).then(res => {
            setMusics(res.data);
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4">Music Management</h2>

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
                            style={{width: "200px"}}
                        />

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
                        <th scope="col">STT</th>
                        <th scope="col">Tên bài hát</th>
                        <th scope="col">Ca sĩ</th>
                        <th scope="col">Nhạc sĩ</th>
                        <th scope="col">Thời gian phát</th>
                        <th scope="col">Số lượng yêu thích</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col" className="text-center">Chức Năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {musics.length > 0 ? (
                        musics.map((product, index) => (
                            <tr key={product.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.title}</td>
                                <td>{product.singer}</td>
                                <td>{product.composer}</td>
                                <td>{product.duration}</td>
                                <td>{product.likes}</td>
                                <td>{product.status}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <p>{product.status}</p>
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

            </div>
        </div>
    );
}

export default MusicList;