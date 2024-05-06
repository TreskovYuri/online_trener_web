import mobx from "@/mobx/mobx"

const { ErrorHandler } = require("@/utils/ErrorHandler")
const { default: $api } = require(".")



class PatternUtills{
    create = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.post("nutrition", formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                this.getPopular()
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
    delete = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.delete(`nutrition/${id}`)
            if(response?.status === 200){
                this.getPopular()
                mobx.setLoading(false)
                mobx.setUpdatePattern(false)
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
    update = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.put("nutrition", formData)
            if(response?.status === 200){
                this.getPopular()
                mobx.setLoading(false)
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
    getPopular = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("nutrition/pop")
            if(response?.status === 200){
                mobx.setPopularPatterns(response.data)
                mobx.setLoading(false)
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
    getAllNutrition = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("nutrition")
            if(response?.status === 200){
                mobx.setNutritions(response.data)
                mobx.setLoading(false)
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

export default new PatternUtills()