export const EmailValidation = (str) => {
    let badSymbols = ["'", '"', "(", ")", "{", "}"]
    if (str.split('').length <= 5) return [false, `Very short email`]
    for (let i = 0; i < badSymbols.length; i++) {
        if (str.includes(badSymbols[i])) return [false, 'Wrong symbols']
    }
    if (str.includes('@') && str.includes('.')) return [true, 'ok']
    else return [false, 'Email need contain @ and .']
}

export const PasswordValidation = (str) => {
    let badSymbols = ["'", '"', "(", ")", "{", "}"]
    if (str.split('').length <= 5) return [false, `Very short password`]
    for (let i = 0; i < badSymbols.length; i++) {
        if (str.includes(badSymbols[i])) return [false, 'Wrong symbols']
    }
    return [true, 'ok']
}