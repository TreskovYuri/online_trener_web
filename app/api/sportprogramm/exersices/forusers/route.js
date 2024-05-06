
import chalk from 'chalk'
import { cookies, headers } from "next/headers"
import { decrypt } from "@/service/UserService"
import ExerciseBelongTrainingProgramm from '@/models/ExerciseBelongTrainingProgramm'
import UsersBelongProgramm from '@/models/UsersBelongProgramm'


export const dynamic = 'force-dynamic'

// Функция возвращает одного пользователя
export async function GET(req){
    try {
        const headersList = headers()
        const session = cookies().get('session')?.value
        const mobileSession = headersList.get('session')
        if(! session && ! mobileSession){return Response.json({"message":'Сессия не обнаружена!'},{status:403})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = session ? await decrypt(session): await decrypt(mobileSession)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        console.log(chalk.red('<========= userSession'))
        console.log(chalk.blue(JSON.stringify(userSession)))
        let programms;
        try{
            programms = await UsersBelongProgramm.findAll({where:{userId:userSession.id}})
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        console.log(chalk.red('<========= programms'))
        console.log(chalk.blue(JSON.stringify(programms)))
        let exersicesBelongs = []
        try{
            for (let i = 0; i < programms.length; i++) {
                exersicesBelongs.push(... await ExerciseBelongTrainingProgramm.findAll({where:{programmId:programms[i].programmId}}))
              }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        console.log(chalk.red('<========= exersicesBelongs'))
        console.log(chalk.blue(JSON.stringify(exersicesBelongs)))
        return Response.json(exersicesBelongs)
    } catch (err) {
        console.log(chalk.red(err));
        return Response.json({"message":'Возникла непредвиденная ошибка...'},{status:418})
    }
}