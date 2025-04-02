import {axiosInstance} from "../configs/axios.config.js";

class ProductService{
    static async getAllProducts() {
        return await axiosInstance.get("/products?_expand=category")
    }
}

export default ProductService;