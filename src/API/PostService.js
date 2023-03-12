import axios from "axios";
import { Env } from "../utils/data/Env"

export default class PostService {

    static protectionInit = async() => {
        const axiosInstance = axios.create({
            baseURL: Env.API_URL_NO_API,
        });
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        await axiosInstance.get(`/sanctum/csrf-cookie`, config)
        return axiosInstance
    }

    static async fetchingGlobalSetup(){
        const instance = await this.protectionInit()
        let response = await instance.get('api/setup')
        return response
    }

    static async loginService(obj) {
        const instance = await this.protectionInit()
        let response = await instance.post('/api/login', obj)
        return response;
    }

    static async fetchPlanYearList() {
        const instance = await this.protectionInit()
        let response = await instance.get(`api/plans/years`)
        return response;
    }

    static async fetchPlansByYear(year) {
        const instance = await this.protectionInit()

        let response = await instance.post(`api/plans/year`, {
            year: year
        })
        return response;
    }

    static async createNextYearPlan(nextYear, apiKey) {
        let response = await axios.post(`${Env.API_URL}/plans/new`, {
            nextYear: nextYear,
            apiKey: apiKey
        })
        return response;
    }
    static async fetchPlanById(id) {
        const instance = await this.protectionInit()
        let response = await instance.post(`api/plan/about`, {
            id: id
        })
        return response
    }
    static async setPlan(plan, id, token, autorId) {
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.put(`api/plan/set`, {
            plan: plan,
            id: id,
            autorId: autorId
        }, config)
        return response
    }
    static async fetchPubsByAutorId(id) {
        const instance = await this.protectionInit()
        let response = await instance.post(`api/publication/byAutorId`, {
            id: id
        })
        return response
    }
    static async fetchAutorSettings(token) {
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.get(`api/authors/setup`, config)
        return response
    }

    static async fetchPublSettings(token) {
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.get(`api/publications/setup`, config)
        return response
    }
    static async addAutor(obj, token) {
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.post(`api/author/add`, {
            obj: obj
        },config)
        return response
    }

    static async addPub(obj, token) {
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.post(`api/publications/add`, {
            obj: obj
        },config)
        return response
    }
    static async fetchAutors() {
        const instance = await this.protectionInit()

        let response = await instance.get(`api/authors`)
        return response
    }
    static async fetchAuthor(id) {
        const instance = await this.protectionInit()

        let response = await instance.get(`api/author?id=${id}`)
        return response
    }

    static async fetchPositions(){
        const instance = await this.protectionInit()
        let response = await instance.get(`api/positions`)
        return response
    }
    
    static async fetchingStatistic(token){
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.get('api/statistic/auth',config)
        return response
    }

    static async createPlanOnYear(token, year){
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.post('api/plans/create',{
            year: year,
        },config)
        return response
    }
    static async savePlan(token, plan){
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.put('api/plans/create',{
            plan: plan,
        },config)
        return response
    }

    static async fetchJSONAuthors(token, file){
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Content-Length': `${file.size}`,
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.post('api/authors/json',{
            body: file
        },config)
        return response
    }

    static async putMaxAuthors(token, number){
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.put('api/setup/authors',{
            number: number
        }, config)
        return response
    }

    static async calculatePlans(token){
        const instance = await this.protectionInit()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await instance.get('api/plans/calculate', config)
        return response
    }

}