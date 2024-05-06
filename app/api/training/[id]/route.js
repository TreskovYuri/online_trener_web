
import chalk from 'chalk'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import TrainingPattern from "@/models/TrainingPattern"
import ExerciseBelongProgramm from '@/models/ExerciseBelongTrainingProgramm';

export const dynamic = 'force-dynamic'

 
export async function DELETE(req,{params}){
    try{
        const session = cookies().get('session').value
        const id = params.id

        if (!id){return Response.json({"message":'Передайте id'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post != 'Супер тренер' && userSession.post != 'Тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}


        try{
            await TrainingPattern.destroy({where:{id:params.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        // try{
        //     await ExerciseBelongProgramm.destroy({where:{trainingId:params.id}})
        // }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}
        // try{
        //     await ExerciseBelongProgramm.destroy({where:{programmId:params.id}})
        // }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        return Response.json({message:'Ok'})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}

