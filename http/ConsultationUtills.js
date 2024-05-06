import mobx from "@/mobx/mobx"
import $api from "."
import { ErrorHandler } from "@/utils/ErrorHandler"



class ConsultationUtills{
    create = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.post("consultation", formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                // this.getPopular()
                return 'ok'
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
            mobx.setLoading(false)
        } catch (err) {
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    mobx.setLoading(false)
                    ErrorHandler('Не корректный запрос!')
                    return 'fail';
                case 403:
                    // Ресурс не найден
                    mobx.setLoading(false)
                    ErrorHandler('Возникла проблема с токеном аутентификации!')
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    mobx.setLoading(false)
                    ErrorHandler('Внутренняя ошибка сервера..')
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    mobx.setLoading(false)
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    return 'fail';
                default:
                    // Другие статусы
                    mobx.setLoading(false)
                    return 'fail';
            }
        }

}
    getConsultations = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("consultation")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setConsultations(response.data)
                return 'ok'
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
            mobx.setLoading(false)
        } catch (err) {
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    mobx.setLoading(false)
                    ErrorHandler('Не корректный запрос!')
                    return 'fail';
                case 403:
                    // Ресурс не найден
                    mobx.setLoading(false)
                    ErrorHandler('Возникла проблема с токеном аутентификации!')
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    mobx.setLoading(false)
                    ErrorHandler('Внутренняя ошибка сервера..')
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    mobx.setLoading(false)
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    return 'fail';
                default:
                    // Другие статусы
                    mobx.setLoading(false)
                    return 'fail';
            }
        }

}
    getConsultationsConnections = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("consultation/connect")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setConsultationsConnections(response.data)
                return 'ok'
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
            mobx.setLoading(false)
        } catch (err) {
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    mobx.setLoading(false)
                    ErrorHandler('Не корректный запрос!')
                    return 'fail';
                case 403:
                    // Ресурс не найден
                    mobx.setLoading(false)
                    ErrorHandler('Возникла проблема с токеном аутентификации!')
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    mobx.setLoading(false)
                    ErrorHandler('Внутренняя ошибка сервера..')
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    mobx.setLoading(false)
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    return 'fail';
                default:
                    // Другие статусы
                    mobx.setLoading(false)
                    return 'fail';
            }
        }

}
}

export default new ConsultationUtills