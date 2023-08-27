import axios from "axios";
import { getCookie } from "../utils/functions/Cookie";

export default class PostService {
    static barrerToken = getCookie('access_token')
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
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}sanctum/csrf-cookie`, this.getConfig);
        return response
    }

    static async initUser() {
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/userinit`, this.getConfig);
        return response
    }
    static async fetchingGlobalSetup() {
        // const instance = await this.protectionInit()
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/setup`, this.getConfig)
        return response
    }

    static async loginService(obj) {
        // const crsf = getCookie('XSRF-TOKEN')
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/login`, obj, { withCredentials: true })
        return response;
    }

    static async fetchPlanYearList() {
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/plans/years`)
        return response;
    }

    static async fetchPlansByYear(year) {
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/plans/year`, {
            year: year
        })
        return response;
    }

    static async createNextYearPlan(nextYear, apiKey) {
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/plans/new`, {
            nextYear: nextYear,
            apiKey: apiKey
        })
        return response;
    }
    static async fetchPlanById(id) {
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/plan/about`, {
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
        let response = await axios.put(`${process.env.REACT_APP_HOSTNAME}api/plan/set`, {
            plan: plan,
            id: id,
            autorId: autorId
        }, config)
        return response
    }
    static async fetchPubsByAutorId(id) {
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/publication/byAutorId`, {
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
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/authors/setup`, config)
        return response
    }

    static async fetchPublSettings(token) {
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },


        // }
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/publications/setup`, this.getConfig)
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
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/author/add`, {
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
        const response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/publisher/add`, {
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
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/publications/add`, {
            ...obj,
            authors: obj.authorList
        }, config)
        return response
    }
    static async fetchAutors() {
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/authors`)
        return response
    }
    static async fetchAuthor(id) {
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/author?id=${id}`)
        return response
    }

    static async fetchPositions() {
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/positions`)
        return response
    }

    static async fetchAuthorsOfPubl(id) {
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/publication/authors?id=${id}`)
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
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/statistic/auth`, config)
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
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/plans/create`, {
            year: year,
        }, config)
        return response
    }
    static async savePlan(token, plan) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await axios.put(`${process.env.REACT_APP_HOSTNAME}api/plans/create`, {
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
        let response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/authors/json`, {
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
        let response = await axios.put(`${process.env.REACT_APP_HOSTNAME}api/setup/authors`, {
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
        let response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/plans/calculate`, config)
        return response
    }
    static async fetchPubls() {
        const response = await axios.get(`${process.env.REACT_APP_HOSTNAME}api/publications`)
        return response
    }
    static async fetchPublication(id) {
        const response = await axios.post(`${process.env.REACT_APP_HOSTNAME}api/publication`, {
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
        let response = await axios.put(`${process.env.REACT_APP_HOSTNAME}api/publication`, {
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
        let response = await axios.put(`${process.env.REACT_APP_HOSTNAME}api/author`, {
            author: author
        }, config)
        return response
    }
}