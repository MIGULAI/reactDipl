import axios from "axios";
import { getCookie } from "../utils/functions/Cookie";

export default class PostService {
    static barrerToken = getCookie('access_token')
    static hostname = window.location.host.includes('localhost') ? process.env.REACT_APP_HOSTNAME : '/'
    static getConfig = {
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
        },
        withCredentials: true,
    }

    // static protectionInit = async () => {
    //     const axiosInstance = axios.create({
    //         baseURL: process.env.REACT_APP_HOSTNAME,
    //     });
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    //         },
    //         withCredentials: true,

    //     }
    //     // console.log(config);
    //     return axiosInstance
    // }

    static async init() {
        let response = await axios.get(`${this.hostname}sanctum/csrf-cookie`, this.getConfig);
        return response
    }

    static async initUser() {
        let response = await axios.get(`${this.hostname}api/userinit`, this.getConfig);
        return response
    }
    static async fetchingGlobalSetup() {
        // const instance = await this.protectionInit()
        let response = await axios.get(`${this.hostname}api/setup`, this.getConfig)
        return response
    }

    static async loginService(obj) {
        // const crsf = getCookie('XSRF-TOKEN')
        let response = await axios.post(`${this.hostname}api/login`, obj, { withCredentials: true })
        return response;
    }

    static async fetchPlanYearList() {
        let response = await axios.get(`${this.hostname}api/plans/years`)
        return response;
    }

    static async fetchPlansByYear(year) {
        let response = await axios.post(`${this.hostname}api/plans/year`, {
            year: year
        })
        return response;
    }

    static async createNextYearPlan(nextYear, apiKey) {
        let response = await axios.post(`${this.hostname}api/plans/new`, {
            nextYear: nextYear,
            apiKey: apiKey
        })
        return response;
    }
    static async fetchPlanById(id) {
        let response = await axios.post(`${this.hostname}api/plan/about`, {
            id: id
        })
        return response
    }
    static async setPlan(plan, id, token, autorId) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await axios.put(`${this.hostname}api/plan/set`, {
            plan: plan,
            id: id,
            autorId: autorId
        }, config)
        return response
    }
    static async fetchPubsByAutorId(id) {
        let response = await axios.post(`${this.hostname}api/publication/byAutorId`, {
            id: id
        })
        return response
    }
    static async fetchAutorSettings(token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.get(`${this.hostname}api/authors/setup`, config)
        return response
    }

    static async fetchPublSettings(token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
         }
        let response = await axios.get(`${this.hostname}api/publications/setup`, config)
        return response
    }
    static async addAutor(obj, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.post(`${this.hostname}api/author/add`, {
            obj: obj
        }, config)
        return response
    }

    static async addPublisher(data, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        const response = await axios.post(`${this.hostname}api/publisher/add`, {
            ...data
        }, config)
        return response;
    }
    static async addLang(data, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        const response = await axios.post(`${this.hostname}api/lang/add`, {
            ...data
        }, config)
        return response;
    }
    static async addRank(data, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        const response = await axios.post(`${this.hostname}api/rank/add`, {
            ...data
        }, config)
        return response;
    }
    static async addDegree(data, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        const response = await axios.post(`${this.hostname}api/degree/add`, {
            ...data
        }, config)
        return response;
    }
    static async addPosision(data, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        const response = await axios.post(`${this.hostname}api/posision/add`, {
            ...data
        }, config)
        return response;
    }
    static async addCafedra(data, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        const response = await axios.post(`${this.hostname}api/cafedra/add`, {
            ...data
        }, config)
        return response;
    }
    static async addPub(obj, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true

        }
        let response = await axios.post(`${this.hostname}api/publications/add`, {
            ...obj,
            authors: obj.authorList
        }, config)
        return response
    }
    static async fetchAutors() {
        let response = await axios.get(`${this.hostname}api/authors`)
        return response
    }
    static async fetchAutorsFull() {
        let response = await axios.get(`${this.hostname}api/authors/full`)
        return response
    }
    static async fetchDepStatistic() {
        let response = await axios.get(`${this.hostname}api/depanalyze/basestat`)
        return response
    }
    static async fetchAuthorCount() {
        let response = await axios.get(`${this.hostname}api/depanalyze/authors/count`)
        return response
    }
    static async fetchAuthor(id) {
        let response = await axios.get(`${this.hostname}api/author?id=${id}`)
        return response
    }

    static async fetchPositions() {
        let response = await axios.get(`${this.hostname}api/positions`)
        return response
    }

    static async fetchAuthorsOfPubl(id) {
        let response = await axios.get(`${this.hostname}api/publication/authors?id=${id}`)
        return response
    }
    static async fetchingStatistic(token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.get(`${this.hostname}api/statistic/auth`, config)
        return response
    }

    static async createPlanOnYear(token, year) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.post(`${this.hostname}api/plans/create`, {
            year: year,
        }, config)
        return response
    }
    static async savePlan(token, plan) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.put(`${this.hostname}api/plans/create`, {
            plan: plan,
        }, config)
        return response
    }

    static async fetchJSONAuthors(token, file) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Content-Length': `${file.size}`,
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await axios.post(`${this.hostname}api/authors/json`, {
            body: file
        }, config)
        return response
    }

    static async putMaxAuthors(token, number) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await axios.put(`${this.hostname}api/setup/authors`, {
            number: number
        }, config)
        return response
    }

    static async calculatePlans(token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.get(`${this.hostname}api/plans/calculate`, config)
        return response
    }
    static async fetchPubls() {
        const response = await axios.get(`${this.hostname}api/publications`)
        return response
    }
    static async fetchPublication(id) {
        const response = await axios.post(`${this.hostname}api/publication`, {
            id: id
        })
        return response
    }

    static async putPublication(publication, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.put(`${this.hostname}api/publication`, {
            ...publication
        }, config)
        return response
    }

    static async putAuthor(author, token) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        }
        let response = await axios.put(`${this.hostname}api/author`, {
            author: author
        }, config)
        return response
    }
}