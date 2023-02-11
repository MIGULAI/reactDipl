import axios from "axios";

export default class PostService {

    static async LoginService(obj) {
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.post(`${apiUrl}/login`, obj)
        return response;
    }
}