const { default: mobx } = require("@/mobx/mobx")
const { default: $api } = require(".")
const { ErrorHandler } = require("@/utils/ErrorHandler")



class JournalUtills {
    getJournal = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("journal")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setJournal(response.data)
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


export default new JournalUtills