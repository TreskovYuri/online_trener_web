import $api from "@/http"
import mobx from "@/mobx/mobx"
import { ErrorHandler } from "./ErrorHandler"



const GETHandler = async ({url,set,loader=true }) => {
    try {
        loader&&mobx.setLoading(true)
        const response = await $api.get(url)

        if(response?.status == 200){
            mobx.setLoading(false)
           set(response.data)
           return response.data
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
                console.log(err)
                return 'fail';
            case 403:
                // Ресурс не найден
                mobx.setLoading(false)
                ErrorHandler('Возникла проблема с токеном аутентификации!')
                console.log(err)
                return 'fail';
            case 500:
                // Внутренняя ошибка сервера
                mobx.setLoading(false)
                ErrorHandler('Внутренняя ошибка сервера..')
                console.log(err)
                return 'fail';
            case 418:
                // Внутренняя ошибка сервера
                mobx.setLoading(false)
                ErrorHandler('Произошла непредвиденная ошибка..')
                console.log(err)
                return 'fail';
            default:
                // Другие статусы
                mobx.setLoading(false)
                console.log(err)
                return 'fail';
        }
    }
}

export default GETHandler