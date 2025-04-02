import {axiosInstance} from "../configs/axios.config.js";

class CategoryService{
    static async getAllCategories() {
        return await axiosInstance.get("/categories")
    }
}

export default CategoryService;