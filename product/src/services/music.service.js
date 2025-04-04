import {axiosInstance} from "../configs/axios.config.js";

class MusicService{
    static async getAllMusics() {
        return await axiosInstance.get("/songs")
    }

    static async searchMusicsByName(name) {
        return await axiosInstance.get(`/songs?title_like=${name}`)
    }
}

export default MusicService;