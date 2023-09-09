import axios from "axios";
import PostService from "./PostService";

export default class AnalyzeService extends PostService {
    static async fetchStudentCountStat() {
        let response = await axios.get(`${this.hostname}api/depanalyze/studentcount`)
        return response
    }
    static async fetchPublicationsCountByTypes() {
        let response = await axios.get(`${this.hostname}api/depanalyze/publcountbytypes`)
        return response
    }
}