
import axios from 'axios';





const API_URL = process.env.NEXT_PUBLIC_URL

// Создание обьекта класса axios
const $api = axios.create({
    // Чтобы куки автоматически подставлялись к каждому запросу
    withCredentials: true,
    credentials: true,
    // Адрес к которому будут плюсоваться запросы
    baseURL: `${API_URL}/api/`,
    httpsAgent: false,
    rejectUnauthorized: false})







// // Обработка ответа от сервера
// $api.interceptors.response.use(async (config) => {
//     // console.log('Перехват при получении запроса')
//     // Если ответ без ошибки то вернуть ответ
//     // console.log({"Config при получении":config})
//     return config;
// },async (error) => {
//     // Обработка ошибок
//     // Помещаем в переменную данные запросы,чтобы потом снова его отправить
//     const originalRequest = error.config;
//     // Если статус ответа 401:
//     if (error.request.status === 401 && error.config && !error.config._isRetry) {
//         // Изменяем переменную,чтобы процесс не зациклился
//         originalRequest._isRetry = true;
//         try {
//             // Получаем новую пару токенов
//             const response = await $api.post('/user/refresh')
//             console.log("Перезапись access токена")
//             // console.log(response.data.accessToken)
//             // Записываем новый токен в кэш
//             localStorage.setItem('accessToken', response.data.accessToken);
//             if(response.data.accessToken){
//                 originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
//             }
//             // Отправляем новый запрос со свежим токеном
//             return $api.request(originalRequest);
            
//         } catch (e) {
//             console.log('НЕ АВТОРИЗОВАН')
//             mobx.serUserAutorization(false)
//             localStorage.removeItem('userAurization');
//             localStorage.removeItem('accessToken');
//             //document.location.href = '/user/login'  
//         }
        
//     }else if (error.request.status === 401) {
//        document.location.href = '/login' 
//     }
//     //  document.location.href = '/user/login'
//     console.log(error)
//     return error.response

// })
// // Обработка запроса перед отправкой
// $api.interceptors.request.use((config) => {
//     // console.log({"Запрос":config})
//     const token = localStorage.getItem('accessToken')
//     if(token){
//         config.headers.Authorization = `Bearer ${token}`
//     }
    
//     return config;
// })


export default $api;
