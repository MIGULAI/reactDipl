import PostService from "../../../API/PostService"

export const getSetup = async (accessToken) => {
    const response = await PostService.fetchAutorSettings(accessToken)
    let err = null
    if (!response.data.success) err = response.data.message
    let specialties = []
    for (let i = 0; i < response.data.data.specialties.length; i++) {
        let specialty = { value: response.data.data.specialties[i].id, str: response.data.data.specialties[i].SpecialtyName }
        specialties.push(specialty)
    }
    let organizations = []
    for (let i = 0; i < response.data.data.organizations.length; i++) {
        let organization = { value: response.data.data.organizations[i].id, str: response.data.data.organizations[i].OrganizationName }
        organizations.push(organization)
    }
    let departments = []
    for (let i = 0; i < response.data.data.departments.length; i++) {
        let department = { value: response.data.data.departments[i].id, str: response.data.data.departments[i].DepartmanName }
        departments.push(department)
    }
    let places = []
    for (let i = 0; i < response.data.data.positions.length; i++) {
        let place = { value: response.data.data.positions[i].id, str: response.data.data.positions[i].PositionName }
        places.push(place)
    }
    let degrees = []
    for (let i = 0; i < response.data.data.degrees.length; i++) {
        let degree = { value: response.data.data.degrees[i].id, str: response.data.data.degrees[i].DegreeName }
        degrees.push(degree)
    }
    let ranks = []
    for (let i = 0; i < response.data.data.ranks.length; i++) {
        let scientific_rank = { value: response.data.data.ranks[i].id, str: response.data.data.ranks[i].RankName }
        ranks.push(scientific_rank)
    }
    return [err, specialties, organizations, departments, places, degrees, ranks]
}