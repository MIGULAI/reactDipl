import axios from "axios";

export default class PostService {

    static async LoginService(obj) {
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.post(`${apiUrl}/login`, obj)
        return response;
    }

    static async getPlanYearList(){
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.get(`${apiUrl}/plans/years`)
        return response;
    }

    static async getPlansByYear(year, apiKey){
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.post(`${apiUrl}/plans/year`,{
            year: year,
            apiKey: apiKey
        })
        return response;
    }

    static async nextYearPlanCreate(nextYear, apiKey){
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.post(`${apiUrl}/plans/new`, {
            nextYear: nextYear,
            apiKey: apiKey
        } )
        return response;
    }
    static async getPlanById(id){
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.post(`${apiUrl}/plan/about`,{
            id: id
        })
        return response
    }
    static async setPlan(plan, id, apiKey, autorId){
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.post(`${apiUrl}/plan/set`,{
            plan: plan,
            id: id,
            apiKey: apiKey,
            autorId: autorId
        })
        return response
    }
    static async getPubsByAutorId(id){
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.post(`${apiUrl}/pub/byAutorId`,{
            id: id
        })
        return response
    }
    static async getAllSettings(){
        let apiUrl = "http://127.0.0.1:8000/api"
        let response = await axios.get(`${apiUrl}/set`)
        return response
    }
}