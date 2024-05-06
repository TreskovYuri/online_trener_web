import mobx from "@/mobx/mobx"
import { ErrorHandler } from "@/utils/ErrorHandler"
import $api from "."



class SportProgrammUtills {
    create = async (formData) => {    
        try {
            mobx.setLoading(true)
            const response = await $api.post("sportprogramm", formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                return 'ok'

                
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
        } catch (err) {
            mobx.setLoading(false)
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Не корректный запрос!')
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такой пользователь уже существует!')
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Внутренняя ошибка сервера..')
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    return 'fail';
                default:
                    // Другие статусы
                    return 'fail';
            }
        }

    }
    update = async (formData) => {    
        try {
            mobx.setLoading(true)
            const response = await $api.put("sportprogramm", formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                return 'ok'

                
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
        } catch (err) {
            mobx.setLoading(false)
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Не корректный запрос!')
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такой пользователь уже существует!')
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Внутренняя ошибка сервера..')
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    return 'fail';
                default:
                    // Другие статусы
                    return 'fail';
            }
        }

    }
    delete = async (id) => {    

        try {
            mobx.setLoading(true)
            const response = await $api.delete(`sportprogramm/${id}`)
            if(response?.status === 200){
                mobx.setLoading(false)
                this.getProgramms()
                return 'ok'

                
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
        } catch (err) {
            mobx.setLoading(false)
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Не корректный запрос!')
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такой пользователь уже существует!')
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Внутренняя ошибка сервера..')
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    return 'fail';
                default:
                    // Другие статусы
                    return 'fail';
            }
        }

    }
    getProgramms = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogramms(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getOneProgramm = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/${id}`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setOneSprotProgramm(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getExersices = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/exersices`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammExersices(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getExersicesById = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/exersices/${id}`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammExersices(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getTests = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/tests`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammTests(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getTestsById = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/tests/${id}`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammTests(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getNutritions = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/nutritions`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammNutritions(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getNutritionsById = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/nutritions/${id}`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammNutritions(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getUsers = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/users`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammUsers(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
    getUsersById = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.get(`sportprogramm/users/${id}`)
            mobx.setLoading(false)
            if(response?.status === 200){
                mobx.setSportprogrammUsers(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setLoading(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            return false
        }
    }
}

export default new SportProgrammUtills()