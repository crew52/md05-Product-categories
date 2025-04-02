import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ProductService from '../../services/product.service'; // Giả sử bạn có một service gọi API để lấy thông tin sản phẩm

function ProductDetail() {
    const { pid } = useParams();  // Lấy id sản phẩm từ URL
    const navigate = useNavigate(); // Hook để chuyển hướng
    const [product, setProduct] = useState(null);  // State để lưu thông tin sản phẩm
    const [loading, setLoading] = useState(true);  // State kiểm tra trạng thái đang tải

    useEffect(() => {
        // Gọi API để lấy thông tin chi tiết sản phẩm theo ID
        ProductService.getProductById(pid)
            .then(response => {
                setProduct(response.data);  // Cập nhật dữ liệu sản phẩm vào state
                setLoading(false);  // Đánh dấu việc tải hoàn tất
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
                setLoading(false);
            });
    }, [pid]);

    if (loading) {
        return <Typography>Loading...</Typography>;  // Hiển thị khi đang tải dữ liệu
    }

    if (!product) {
        return <Typography>No product found</Typography>;  // Hiển thị khi không có sản phẩm
    }

    const handleBackToProducts = () => {
        // Chuyển hướng về trang danh sách sản phẩm
        navigate('/products');
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ display: 'flex', maxWidth: 1000, p: 3 }}>
                <Box sx={{ flex: 1, paddingLeft: 2 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>{product.name}</Typography>
                        <Typography variant="h6" color="textSecondary" paragraph>
                            Category: {product.categoryId} {/* Chắc chắn bạn sẽ có một API để lấy tên danh mục từ categoryId */}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Product ID: {product.id}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            Created At: {product.createdAt}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Rating: {product.rating} / 5
                        </Typography>
                        <Typography variant="h5" color="primary" paragraph>
                            Price: ${product.price}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Stock: {product.stock} available
                        </Typography>
                        <Button variant="contained" color="primary" fullWidth onClick={handleBackToProducts}>
                            Back to Products
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
}

export default ProductDetail;
