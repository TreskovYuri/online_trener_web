import mobx from "@/mobx/mobx"
import $api from "./index"
import { ErrorHandler } from "@/utils/ErrorHandler";

export const dynamic = 'force-dynamic'

class GroupUtills{
    createGroup = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.post("group",formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                // mobx.setAddTests(false)
                this.getGroups()
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
    createTest = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.post("tests",formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setAddTests(false)
                this.getTests()
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
    updateTest = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.put("tests",formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setUpdateTests(false)
                this.getTests()
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
    deleteTest = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.delete(`tests/${id}`)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setUpdateTests(false)
                this.getTests()
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
    updateExercise = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.put("training/exercise",formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setAddExercise(false)
                this.getExercise()
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
    getGroups = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("group")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setTestGroups(response.data)
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
    getTests = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("tests")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setTests(response.data)
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
    deleteExercise = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.delete(`training/exercise/${id}`)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setUpdateExercise(false)
                this.getExercise()
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

export default new GroupUtills