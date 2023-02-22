import PostService from "../../../API/PostService"

export const IsSetFetching = async () => {
    const response = await PostService.fetchPublSettings()
    let typees = []
    for (let i = 0; i < response.data.types.length; i++) {
        let type = { value: response.data.types[i].id, str: response.data.types[i].ShortName }
        typees.push(type);
    }
    let languages = []
    for (let i = 0; i < response.data.language.length; i++) {
        let language = { value: response.data.language[i].id, str: response.data.language[i].Language }
        languages.push(language);
    }
    let publishers = []
    for (let i = 0; i < response.data.publisher.length; i++) {
        let publisher = { value: response.data.publisher[i].id, str: response.data.publisher[i].publisher_name }
        publishers.push(publisher);
    }
    let authores = []
    for (let i = 0; i < response.data.autors.length; i++) {
        let author = { id: response.data.autors[i].id, value: response.data.autors[i].Ukr_PIP }
        authores.push(author);
    }
    return [ typees, languages, publishers, authores]
}