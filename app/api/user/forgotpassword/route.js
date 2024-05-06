import User from "@/models/User"
import MailService from "@/service/MailService"
import generatePassword from "@/utils/generatePassword"
import chalk from 'chalk'
import bcrypt from 'bcrypt'


export const dynamic = 'force-dynamic'

// Функция для отправки кода воостановления 
export async function POST(req){
    try{
        const {email} = await req.json()
        if (!email){return Response.json({"message":'Не корректный email'},{status:400})}
        let user;
        try{
            user = await User.findOne({where:{email}})
            if(!user){return Response.json({"message":'Такого пользователя не существует...'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при поиске пользователя в базе данных...'},{status:400});}

        let activationCode
        try{
            activationCode = Math.floor(10000 + Math.random() * 90000);
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время генерации кода активации'},{status:500})}
        try{
            MailService.sendActivationMail(email, activationCode)
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время генерации кода активации'},{status:500})}
        try{
            user.activationCode = activationCode
            user.save()
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время сохранения обновленной записи в базу данных'},{status:500})}

        return Response.json('ok')
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}
// Функция для сравнения кода воостановления 
export async function PUT(req){
    try{
        const {email,code} = await req.json()
        if (!email){return Response.json({"message":'Не корректный email'},{status:400})}
        if (!code){return Response.json({"message":'Не корректный код'},{status:400})}
        let user;
        try{
            user = await User.findOne({where:{email}})
            if(!user){return Response.json({"message":'Такого пользователя не существует...'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при поиске пользователя в базе данных...'},{status:400});}
        if (user.activationCode !== code){return Response.json({"message":'Код не подходит...'},{status:400})}

        const newPassword = generatePassword(5)
        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(newPassword.toString(), 2);
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время хеширования пароля'},{status:500})}
        try{
            user.password = hashPassword
            user.save()
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время сохранения обновленной записи в базу данных'},{status:500})}
        try{
            MailService.sendForgotUser(email, newPassword)
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время генерации кода активации'},{status:500})}
        return Response.json('ok')
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}
