import mobx from "@/mobx/mobx"
import $api from "./index"
import { ErrorHandler } from "@/utils/ErrorHandler";

export const dynamic = 'force-dynamic'

class UserUtills{
    registration = async (formData) => {    
        try {
            mobx.setLoading(true)
            const response = await $api.post("user", formData)
            if(response?.status === 200){
                this.getUsers()
                this.getSportsmans()
                mobx.setAddUser(false)
                mobx.setLoading(false)
                return response.data

                
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
    login = async (formData) => {
        try {
            const response = await $api.post("user/login", formData)

            if(response?.status === 200){
                return response.data
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
        } catch (err) {
            console.log(err)
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Неверный пароль!')
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такого пользователя не существует!')
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
    logout = async () => {
        try {
            const response = await $api.get("user/logout")
            if(response?.status === 200){
                return 'ok'
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
        } catch (err) {
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Неверный пароль!')
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такого пользователя не существует!')
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
    // Функция для отправки кода подтверждения на email
    refreshCodeToEmail = async (email) => {
        try {
            mobx.setLoading(true)
            const response = await $api.post("/user/forgotpassword", {email})
            if(response?.status === 200){
                mobx.setLoading(false)
                return 'ok'
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
            mobx.setLoading(false)
        }  catch (err) {
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Не корректный зарос!')
                    mobx.setLoading(false)
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такого пользователя не существует!')
                    mobx.setLoading(false)
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Внутренняя ошибка сервера..')
                    mobx.setLoading(false)
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    mobx.setLoading(false)
                    return 'fail';
                default:
                    // Другие статусы
                    return 'fail';
            }
        }
    }
    forgotPassword = async (email,code) => {
        try {
            mobx.setLoading(true)
            const response = await $api.put("/user/forgotpassword", {email,code})
            if(response?.status === 200){
                ErrorHandler(`Данные для входа отправлены на ${email}`)
                mobx.setForgotPassword(false)
                mobx.setLoading(false)
                return 'ok'

            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
            mobx.setLoading(false)
        }  catch (err) {
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Не корректный зарос!')
                    mobx.setLoading(false)
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такого пользователя не существует!')
                    mobx.setLoading(false)
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Внутренняя ошибка сервера..')
                    mobx.setLoading(false)
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    mobx.setLoading(false)
                    return 'fail';
                default:
                    // Другие статусы
                    return 'fail';
            }
        }
    }
    userUpdate = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.put("/user",formData)
            if(response?.status === 200){
                // mobx.setUser(response.data)
                mobx.setUpdateUser(false)
                mobx.setLoading(false)
                await this.getUsers()
                await this.getSportsmans()
                return 'ok'
            }
            if(!response){
                ErrorHandler('Сервер не отвечает..')
            }
            mobx.setLoading(false)
        }  catch (err) {
            switch (err?.response?.status) {
                case 400:
                    // Неверный запрос
                    ErrorHandler('Не корректный зарос!')
                    mobx.setLoading(false)
                    return 'fail';
                case 404:
                    // Ресурс не найден
                    ErrorHandler('Такого пользователя не существует!')
                    mobx.setLoading(false)
                    return 'fail';
                case 500:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Внутренняя ошибка сервера..')
                    mobx.setLoading(false)
                    return 'fail';
                case 418:
                    // Внутренняя ошибка сервера
                    ErrorHandler('Произошла непредвиденная ошибка..')
                    mobx.setLoading(false)
                    return 'fail';
                default:
                    // Другие статусы
                    return 'fail';
            }
        }
    }
    check = async () => {
        try {
            const response = await $api.get(`user/check`)
            if(response?.status === 200){
                mobx.setUser(response?.data)
                // mobx.setAuth(true)
                if(!response?.data?.passwordFlag){
                    // alert('Не забудьте добавить пароль!')
                }
                return 'ok'
            }else{
                mobx.setUser({})
                mobx.setAuth(false)
                return false}
        } catch (err) {
            mobx.setUser({})
            mobx.setAuth(false)
            return false
        }
    }
    // fetchEmail = async (email) => {
    //     try {
    //         const response = await $api.post("user/email", { email });
    //         if(response?.status === 200){
    //             mobx.setUser(response.data)
    //             return 'ok'
    //         }else{return false}
    //     } catch (err) {
    //         switch (err?.status) {
    //             case 400:
    //                 // Неверный запрос
    //                 return '400';
    //             case 404:
    //                 // Ресурс не найден
    //                 return '404';
    //             case 500:
    //                 // Внутренняя ошибка сервера
    //                 return '500';
    //             default:
    //                 // Другие статусы
    //                 return 'fail';
    //         }
    //     }
    // };

    // activateEmail = async (email,code) => {
    //     try {
    //         const response = await $api.put("user/activate", {email,code})
    //         if(response?.status === 200){
    //             mobx.setUser(response.data)
    //             return 'ok'
    //         }else{return false}
    //     } catch (err) {
    //         switch (err?.response?.status) {
    //             case 400:
    //                 // Неверный запрос
    //                 return '400';
    //             case 404:
    //                 // Ресурс не найден
    //                 return '404';
    //             case 500:
    //                 // Внутренняя ошибка сервера
    //                 return '500';
    //             default:
    //                 // Другие статусы
    //                 return 'fail';
    //         }
    //     }

    // }

    // updateName = async (email,name) => {
    //     try {
    //         const response = await $api.post("user/name", {email,name})
    //         if(response?.status === 200){
    //             return 'ok'
    //         }else{return 'fail'}
    //     } catch (err) {return 'fail'}
    // }
    // updateNPassword = async (email,password) => {
    //     try {
    //         const response = await $api.post("user/password", {password,email})
    //         if(response?.status === 200){
    //             return 'ok'
    //         }else{return 'fail'}
    //     } catch (err) {return 'fail'}
    // }

    // logout = async () => {
    //     try {
    //         const response = await $api.get(`user/logout`)
    //         if(response?.status === 200){
    //             mobx.setUser({})
    //             mobx.setAuth(false)
    //             return 'ok'
    //         }
    //     } catch (err) {
    //         switch (err?.response?.status) {
    //             case 400:
    //                 // Неверный запрос
    //                 return '400';
    //             case 404:
    //                 // Ресурс не найден
    //                 return '404';
    //             case 500:
    //                 // Внутренняя ошибка сервера
    //                 return '500';
    //             default:
    //                 // Другие статусы
    //                 return 'fail';
    //         }
    //     }
        
    // }
    // check = async () => {
    //     try {
    //         const response = await $api.get(`user/check`)
    //         if(response?.status === 200){
    //             mobx.setUser(response?.data)
    //             mobx.setAuth(true)
    //             if(!response?.data?.passwordFlag){
    //                 // alert('Не забудьте добавить пароль!')
    //             }
    //             return 'ok'
    //         }else{
    //             mobx.setUser({})
    //             mobx.setAuth(false)
    //             return false}
    //     } catch (err) {
    //         mobx.setUser({})
    //         mobx.setAuth(false)
    //         return false
    //     }
    // }

    // update = async (formData) => {
    //     try {
    //         const response = await $api.put("user", formData)
    //         if(response?.status === 200){
    //             mobx.setUser(response.data)
    //             return 'ok'
    //         }else{return false}
    //     } catch (err) {
    //         switch (err?.response?.status) {
    //             case 400:
    //                 // Неверный запрос
    //                 return '400';
    //             case 404:
    //                 // Ресурс не найден
    //                 return '404';
    //             case 500:
    //                 // Внутренняя ошибка сервера
    //                 return '500';
    //             default:
    //                 // Другие статусы
    //                 return 'fail';
    //         }
    //     }}
   getUsers = async () => {
        try {
            const response = await $api.get(`user`)
            if(response?.status === 200){
                mobx.setUsers(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setUsers([])
                mobx.setAuth(false)
                return false}
        } catch (err) {
            mobx.setUsers([])
            mobx.setAuth(false)
            return false
        }
    }
   getTreners = async () => {
        try {
            const response = await $api.get(`user/treners`)
            if(response?.status === 200){
                mobx.setTreners(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setUsers([])
                mobx.setAuth(false)
                return false}
        } catch (err) {
            mobx.setUsers([])
            mobx.setAuth(false)
            return false
        }
    }
   getSportsmans = async () => {
        try {
            const response = await $api.get(`user/sportsmans`)
            if(response?.status === 200){
                mobx.setSportsmans(response?.data)
                // mobx.setAuth(true)
                return 'ok'
            }else{
                mobx.setUsers([])
                mobx.setAuth(false)
                return false}
        } catch (err) {
            mobx.setUsers([])
            mobx.setAuth(false)
            return false
        }
    }
   delete = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.delete(`user/${id}`)
            mobx.setLoading(false)
            mobx.setUpdateUser(false)
            if(response?.status === 200){
                this.getUsers()    
                return 'ok'
            }else{
                ErrorHandler('Произошла ошибка!')
                mobx.setUsers([])
                mobx.setAuth(false)
                return false}
        } catch (err) {
            mobx.setLoading(false)
            mobx.setUsers([])
            mobx.setAuth(false)
            return false
        }
    }
}

export default new UserUtills