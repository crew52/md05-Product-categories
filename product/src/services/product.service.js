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

    static async getProductById(id) {
        return await axiosInstance.get(`/products/${id}?_expand=category`)
    }

    static async updateProduct(data, id) {
        return await axiosInstance.put(`/products/${id}`, data)
    }

    static async getProductsByNameAndCategory(name, categoryId) {
        const queryParams = [];
        if (name) queryParams.push(`name_like=${name}`);
        if (categoryId) queryParams.push(`categoryId=${categoryId}`);
        const queryString = queryParams.length ? `?${queryParams.join("&")}&_expand=category` : "?_expand=category";

        return await axiosInstance.get(`/products${queryString}`).then(res => res.data);
    }
}

export default ProductService;