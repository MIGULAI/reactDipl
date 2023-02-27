import PostService from "../../../API/PostService"

export const IsSetFetching = async (accessToken) => {
    const response = await PostService.fetchPublSettings(accessToken)
    let typees = []

    for (let i = 0; i < response.data.data.types.length; i++) {
        let type = { value: response.data.data.types[i].id, str: response.data.data.types[i].TypeShortName }
        typees.push(type);
    }
    let languages = []

    for (let i = 0; i < response.data.data.languages.length; i++) {
        let language = { value: response.data.data.languages[i].id, str: response.data.data.languages[i].LanguageShortName }
        languages.push(language);
    }
    let publishers = []

    for (let i = 0; i < response.data.data.publishers.length; i++) {
        let publisher = { value: response.data.data.publishers[i].id, str: response.data.data.publishers[i].PublisherName }
        publishers.push(publisher);
    }
    let authores = []

    for (let i = 0; i < response.data.data.authors.length; i++) {
        let author = { id: response.data.data.authors[i].id, value: `${response.data.data.authors[i].SerName} ${response.data.data.authors[i].Name} ${response.data.data.authors[i].Patronic}.`}
        authores.push(author);
    }

    let supervisors = []
    for (let i = 0; i < response.data.data.authors.length; i++) {
        let supervisor = { value: response.data.data.authors[i].id, str: `${response.data.data.authors[i].SerName} ${response.data.data.authors[i].Name}. ${response.data.data.authors[i].Patronic}.` }
        supervisors.push(supervisor);
    }

    return [typees, languages, publishers, authores, supervisors]
}