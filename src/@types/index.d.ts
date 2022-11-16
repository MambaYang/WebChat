export type registerSubmitVal = {
    email: string
    password: string
    username: string
    verificationCode: string
}
export type loginSubmitVal = {
    password: string
    email: string
}
export type resErrorType = {
    code?: number
    error?: string
}

export type IMError = {
    code: number
    message: string
    stack: object
}

export type IMResponse = {
    code: number
    data: object
}
