import URL_CONSTANT from './url.constant'

export const RedirectTo = (link) => ({
    type: URL_CONSTANT.REDIRECT_TO,
    payload: link
})

export const ResetRedirect = () => ({
    type: URL_CONSTANT.RESET_REDIRECT
})