import mobx from "@/mobx/mobx"


export const ErrorHandler = (message) => {
    mobx.setErrorMessage(message)
    mobx.setError(true)
}