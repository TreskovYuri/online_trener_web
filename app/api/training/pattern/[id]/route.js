
import chalk from 'chalk'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import TrainingPattern from "@/models/TrainingPattern";
import ExerciseBelongTraining from "@/models/ExerciseBelongTraining";

import TestBelongTrainingPattern from "@/models/TestBelongTrainingPattern";
import ExerciseBelongTrainingProgramm from "@/models/ExerciseBelongTrainingProgramm";

export const dynamic = 'force-dynamic'

// // Функция возвращает одного 
// export async function GET(){
//     try{
//         const session = cookies().get('session').value
//         let userSession; // Достаем данные пользователя из токена
//         try{
//             userSession = await decrypt(session)
//             if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
//         }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}

//         return Response.json(await TrainingPattern.findAll({where: {userId:userSession.id}}));
//     }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

// }

// Функция для создания нового шаблона
export async function PUT(req,{params}){
    try{
        const session = cookies().get('session').value
        const formData = await req.formData();
        const name = formData.get("name");
        const setsObject = JSON.parse(formData.get("setsObject"))
        if (!name){return Response.json({"message":'Передайте название'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        let pattern;
        try{
            pattern = await TrainingPattern.create({ name, userId: userSession.id});
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        try {
            for (const obj of setsObject) {
                await ExerciseBelongTraining.create({ trainingId: pattern.id, exerciseId:obj.id, timing:obj?.body?.time, sets:obj?.body?.sets,userId:userSession.id });
            }
        } catch (err) {
            console.log(chalk.red(err));
            return Response.json({ "message": 'Возникла ошибка во время создания связей' }, { status: 500 });
        }

        return Response.json({messsage:'ok'})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}


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
            await TrainingPattern.destroy({where:{id:id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время удаления шаблона'},{status:500})}

        try{
            await ExerciseBelongTrainingProgramm.destroy({where:{programmId:id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время удаления связи упражнения с шаблоном'},{status:500})}
        try{
            await TestBelongTrainingPattern.destroy({where:{programmId:id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время удаления связи теста с шаблоном'},{status:500})}

        return Response.json({message:'Ok'})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}
