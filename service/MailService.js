// Сервис для работы с почтой (Чтобы контроллер не становился слишком толстым)
import nodemailer from 'nodemailer'

class MailService {

    // Инициализация почтового клиента
    constructor() {
        this.transporter = nodemailer.createTransport({
            // Информация для авторизации в gmail для отправки писем
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: { //Отключение проверки ssl в продакшн закоментировать!!
                rejectUnauthorized: false
            }
        })
    }

        // Функция для отправки письма дл активации. to=майл по которому отправлять письмо, link-ссылка для активации
        async sendRegistrationUser(to, password) {
            await this.transporter.sendMail({
                // От кого исходит письмо
                from: process.env.SMTP_USER,
                // Куда отправлять письмо
                to,
                // Тема письма
                subject: 'Ваш аккаунт на ' + process.env.NEXT_PUBLIC_DIMAIN_NAME + ' создан!',
                text: '',
                // Тело письма
                html:
                    `
                        <div>
                            <h2 >Логин и пароль для входа в систему:</h2><br/>
                            <b><a href="${process.env.NEXT_PUBLIC_URL}">${process.env.NEXT_PUBLIC_DIMAIN_NAME}<a/></b>
                            <h3><b>Логин:</b> ${to}</h3>
                            <h3><b>Пароль:</b> ${password}</h3>
                        </div>
                    `
            })
        }
        // Функция для отправки письма дл активации. to=майл по которому отправлять письмо, link-ссылка для активации
        async sendForgotUser(to, password) {
            await this.transporter.sendMail({
                // От кого исходит письмо
                from: process.env.SMTP_USER,
                // Куда отправлять письмо
                to,
                // Тема письма
                subject: 'Восстановление пароля ' + process.env.NEXT_PUBLIC_DIMAIN_NAME,
                text: '',
                // Тело письма
                html:
                    `
                        <div>
                            <h2 >Логин и новый пароль для входа в систему:</h2><br/>
                            <b><a href="${process.env.NEXT_PUBLIC_URL}">${process.env.NEXT_PUBLIC_DIMAIN_NAME}<a/></b>
                            <h3><b>Логин:</b> ${to}</h3>
                            <h3><b>Пароль:</b> ${password}</h3>
                        </div>
                    `
            })
        }

    // Функция для отправки письма для восстановления пароля. to=майл по которому отправлять письмо, link-ссылка для активации
    async sendActivationMail(to, code) {
        await this.transporter.sendMail({
            // От кого исходит письмо
            from: process.env.SMTP_USER,
            // Куда отправлять письмо
            to,
            // Тема письма
            subject: 'Восстановление пароля на ' + process.env.NEXT_PUBLIC_DIMAIN_NAME,
            text: '',
            // Тело письма
            html:
                `
                    <div><h2>Код подтверждения:</h2>
                        <h3>${code}</h3>
                    </div>
                `
        })
    }
    




    // // Функция для отправки письма дл активации. to=майл по которому отправлять письмо, link-ссылка для активации
    // async sendActivationMailLink(to, link) {
    //     await this.transporter.sendMail({
    //         // От кого исходит письмо
    //         from: process.env.SMTP_USER,
    //         // Куда отправлять письмо
    //         to,
    //         // Тема письма
    //         subject: 'Активация аккаунта на ' + process.env.NEXT_PUBLIC_URL,
    //         text: '',
    //         // Тело письма
    //         html:
    //             `
    //                 <div>
    //                     <h1>Для активации ${to} перейдите по ссылке:</h1>
    //                     <h2>${link}</h2>
    //                 </div>
    //             `
    //     })
    // }
    // Функция для отправки письма дл изменения пароля. to=майл по которому отправлять письмо, link-ссылка для активации
    // async sendForgotPassword(to, password) {
    //     await this.transporter.sendMail({
    //         // От кого исходит письмо
    //         from: process.env.SMTP_USER,
    //         // Куда отправлять письмо
    //         to,
    //         // Тема письма
    //         subject: 'Изменение пароля на ' + process.env.NEXT_PUBLIC_URL,
    //         text: '',
    //         // Тело письма
    //         html:
    //             `
    //                 <div>
    //                     <h1>Данные для входа:</h1>
    //                     <a href="${process.env.NEXT_PUBLIC_URL+'/login'}">${process.env.NEXT_PUBLIC_URL+'/login'}</a><br><br>
    //                     <b>Логин:  </b><span>${to}</span><br>
    //                     <b>Пароль:  </b><span>${password}</span>
    //                 </div>
    //             `
    //     })
    // }
    // async emailValidate(email){
    //     return  (email.match(/@/g) || []).length;
    // }
}

export default new MailService()
