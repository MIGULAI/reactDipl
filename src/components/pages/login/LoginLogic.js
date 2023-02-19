import { EmailValidation, PasswordValidation } from "../../../utils/functions/validation.js"
import PostService from "../../../API/PostService";

export const loginLogic = async (user, setIsAuth, setApiKey ) => {

    let emailValid = EmailValidation(user.email)
    let passwordValid = PasswordValidation(user.password)
    let errorArray = []
    if (!emailValid[0]) errorArray.push(emailValid[1])
    if (!passwordValid[0]) errorArray.push(passwordValid[1])
    if (emailValid[0] && passwordValid[0]) {
        let res = await PostService.loginService(user);
        if (res.data[0]) {
            setIsAuth(true)
            setApiKey(res.data[2])
            localStorage.setItem('auth', 'true')
            localStorage.setItem('apiKey', res.data[2])
        } else {
            errorArray.push(res.data[1])
        }
    }
    return errorArray
}