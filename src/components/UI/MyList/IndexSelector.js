export const indexSelector = (autors) => {
    let i = 0;
    for(let j = autors.length -1; j >= 0; j--){
        if (autors[j] === null) i = j
    }
    return i
}