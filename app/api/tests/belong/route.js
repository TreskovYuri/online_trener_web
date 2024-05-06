
import chalk from 'chalk'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import TestBelongTrainingPattern from '@/models/TestBelongTrainingPattern';


export const dynamic = 'force-dynamic'

// Функция возвращает одного 
export async function GET(){
    try{
        const session = cookies().get('session').value
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}

        return Response.json(await TestBelongTrainingPattern.findAll());
        // return Response.json(await TestBelongTrainingPattern.findAll({where:{userId: userSession.id}}));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}