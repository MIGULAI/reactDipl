import PostService from "../../API/PostService";

const fetchPositions = async() => {
    try {
        const response = await PostService.fetchAutorSettings()
        let obj = []
        for(let i = 0; i < response.data.place.length;i++ ){
            obj.push({value: response.data.place[i].id, str: response.data.place[i].place})
        }
        return {succeed: true, data: obj}
    } catch (error) {
        return {succeed: false, data: error}
    }
}

export default fetchPositions