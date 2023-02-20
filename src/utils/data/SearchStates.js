import fetchPositions from "../functions/FetchPositions"

export const SearchStates = [
    {str: "За прізвищем", metod: () => console.log("за прізвищем"), type: "text", parametrs: () => {return  {succeed: true, data: ''}}},
    {str: "За посадою", metod: () => console.log("за посадою"), type: "selector", parametrs: () => {return fetchPositions} }
]