import {axiosInstance} from "../configs/axios.config.js";

class ProductService{
    static async getAllProducts() {
        return await axiosInstance.get("/products?_expand=category")
    }

    static async deleteProductById(id) {
        return await axiosInstance.delete(`/products/${id}`)
    }
}

export default ProductService;