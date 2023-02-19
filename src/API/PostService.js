import axios from "axios";
import {Env} from "../utils/data/Env"

export default class PostService {

    static async loginService(obj) {
        let response = await axios.post(`${Env.API_URL}/login`, obj)
        return response;
    }

    static async fetchPlanYearList(apiUrl){
        let response = await axios.get(`${Env.API_URL}/plans/years`)
        return response;
    }

    static async fetchPlansByYear(year, apiKey){
        let response = await axios.post(`${Env.API_URL}/plans/year`,{
            year: year,
            apiKey: apiKey
        })
        return response;
    }

    static async createNextYearPlan(nextYear, apiKey){
        let response = await axios.post(`${Env.API_URL}/plans/new`, {
            nextYear: nextYear,
            apiKey: apiKey
        } )
        return response;
    }
    static async fetchPlanById(id){
        let response = await axios.post(`${Env.API_URL}/plan/about`,{
            id: id
        })
        return response
    }
    static async setPlan(plan, id, apiKey, autorId){
        let response = await axios.post(`${Env.API_URL}/plan/set`,{
            plan: plan,
            id: id,
            apiKey: apiKey,
            autorId: autorId
        })
        return response
    }
    static async fetchPubsByAutorId(id){
        let response = await axios.post(`${Env.API_URL}/pub/byAutorId`,{
            id: id
        })
        return response
    }
    static async fetchAutorSettings(apiUrl){
        let response = await axios.get(`${Env.API_URL}/set`)
        return response
    }

    static async fetchPublSettings(apiUrl){
        let response = await axios.get(`${Env.API_URL}/set/publ`)
        return response
    }
    static async addAutor(obj){
        let response = await axios.post(`${Env.API_URL}/autor/add`,{
            obj: obj
        })
        return response
    }

    static async addPub(obj){
        let response = await axios.post(`${Env.API_URL}/pub/add`,{
            obj: obj
        })
        return response
    }
    
}