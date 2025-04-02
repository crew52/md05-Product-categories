import {axiosInstance} from "../configs/axios.config.js";

class ProductService{
    static async getAllProducts() {
        return await axiosInstance.get("/products?_expand=category")
    }

    static async deleteProductById(id) {
        return await axiosInstance.delete(`/products/${id}`)
    }

    static async createProduct(data) {
        return await axiosInstance.post("/products", data)
    }
}

export default ProductService;