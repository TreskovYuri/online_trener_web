

import chalk from 'chalk'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import ExerciseGroups from '@/models/ExerciseGroups';








export async function GET(){
    try{
        const session = cookies().get('session').value
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер' && userSession.post !== 'Тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        return Response.json(await ExerciseGroups.findAll({where:{trenerId:userSession.id}}));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}






export async function POST(req){
    try{
        const session = cookies().get('session').value
        const formData = await req.formData();
        const name = formData.get("name");
        if (!name){return Response.json({"message":'Передайте название'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер' && userSession.post !== 'Тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        let exercise;
        try{
            exercise = await ExerciseGroups.create({ name:name, trenerId:userSession.id});
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        return Response.json(exercise)
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}