import { SearchStates } from "../../../utils/data/SearchStates";



export const typeChange = async (index) => {
    let param = SearchStates[index].parametrs()
    if (typeof (param) === "function") {
        let obj = await param()
        return [SearchStates[index].type, obj.data]
    } else {
        return [SearchStates[index].type, param.data]
    }
}