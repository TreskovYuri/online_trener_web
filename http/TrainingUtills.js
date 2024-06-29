import mobx from "@/mobx/mobx"
import $api from "./index"
import { ErrorHandler } from "@/utils/ErrorHandler";
import POSTHandler from "@/utils/POSTHandler";

export const dynamic = 'force-dynamic'

class TrainingUtills{
    createPattern = async (formData) => {
        return await POSTHandler({formData:formData,url:'training/pattern'})
}

    updatePattern = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.put("training/pattern", formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setUpdateTrainingPattern(false)
                this.getTrainingBelongs()
                this.getTrainingPattern()
                this.getTestTrainingPatternBelongs()
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
    createExercise = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.post("training/exercise",formData)
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
                case 409:
                    // Неверный запрос
                    mobx.setLoading(false)
                    ErrorHandler('Формат видео не поддерживается, загрузите mp4!')
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
                case 409:
                    // Неверный запрос
                    mobx.setLoading(false)
                    ErrorHandler('Формат видео не поддерживается, загрузите mp4!')
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
    createExerciseGroups = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.post("training/exercise/groups",formData)
            if(response?.status === 200){
                mobx.setLoading(false)
                this.getExerciseGroups()
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
    getExerciseGroups = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("training/exercise/groups")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setExerciseGrpups(response.data)
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
    updateExercise = async (formData) => {
        try {
            mobx.setLoading(true)
            const response = await $api.put("training/exercise",formData)
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
    getExercise = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("training/exercise")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setExercises(response.data)
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
    getTrainingPattern = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("training/pattern")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setTrainingPatterns(response.data)
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
    getTrainingBelongs = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("training/belong")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setTrainingBelongs(response.data)
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
    getTestTrainingPatternBelongs = async () => {
        try {
            mobx.setLoading(true)
            const response = await $api.get("tests/belong")
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setTestBelongs(response.data)
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
    deleteTraining = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.delete(`training/${id}`)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setUpdateTrainingPattern(false)
                this.getTrainingPattern()
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
    deleteTrainingPattern = async (id) => {
        try {
            mobx.setLoading(true)
            const response = await $api.delete(`training/pattern/${id}`)
            if(response?.status === 200){
                mobx.setLoading(false)
                mobx.setUpdateTrainingPattern(false)
                this.getTrainingPattern()
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

export default new TrainingUtills