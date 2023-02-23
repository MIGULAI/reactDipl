import PostService from "../../API/PostService";

const fetchPositions = async() => {
    try {
        const response = await PostService.fetchPositions()
        let obj = []
        for(let i = 0; i < response.data.data.positions.length;i++ ){
            obj.push({value: response.data.data.positions[i].id, str: response.data.data.positions[i].PositionName})
        }
        return {succeed: true, data: obj}
    } catch (error) {
        return {succeed: false, data: error}
    }
}

export default fetchPositions