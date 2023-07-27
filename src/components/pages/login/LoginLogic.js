import { EmailValidation, PasswordValidation } from "../../../utils/functions/validation.js"
import PostService from "../../../API/PostService";
import { setCookie} from "../../../utils/functions/Cookie.js";

export const loginLogic = async (user, setIsAuth, setApiKey ) => {

    let emailValid = EmailValidation(user.email)
    let passwordValid = PasswordValidation(user.password)
    let errorArray = []
    let accessToken = ''
    if (!emailValid[0]) errorArray.push(emailValid[1])
    if (!passwordValid[0]) errorArray.push(passwordValid[1])
    if (emailValid[0] && passwordValid[0]) {
        let res = await PostService.loginService(user);
        console.log(res);
        if (res.data.access_token) {
            setCookie('auth', true, 7)
            //setCookie('access_token', res.data.access_token, 7)
            setIsAuth(true)
            setApiKey(res.data.access_token)
            accessToken = res.data.access_token
        } else {
            errorArray.push(res.data[1])
        }
    }
    return [errorArray, accessToken]
}