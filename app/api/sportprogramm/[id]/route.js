import ExerciseBelongProgramm from "@/models/ExerciseBelongTrainingProgramm";
import NutritionBelongProgramm from "@/models/NutritionBelongProgramm";
import SportProgramm from "@/models/SportProgramm";
import TestBelongProgramm from "@/models/TestBelongProgramm";
import UsersBelongProgramm from "@/models/UsersBelongProgramm";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";


// Функция возвращает одного 
export async function GET(req,{params}){
    try{
        return Response.json(await SportProgramm.findOne({where:{id:params.id}}));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}


// Функция для создания новогй программы
export async function POST(req){
    try{
        const session = cookies().get('session').value
        const formData = await req.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const exersices = JSON.parse(formData.get("exersices"));
        const nutritions = JSON.parse(formData.get("nutritions"));
        const tests = JSON.parse(formData.get("tests"));
        const users = JSON.parse(formData.get("users"));
        
        if (!name){return Response.json({"message":'Передайте название программы'},{status:400})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер' && userSession.post !== 'Тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        let programm;
        try{
            programm = await SportProgramm.create({ name, description, userId: userSession.id });
            if (!programm){return Response.json({"message":'Ошибка при создании модели программы'},{status:500})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при создании модели программы'},{status:500})}
        try{
            for (let i = 0; i < exersices.length; i++){
                const exersice = exersices[i]
                await ExerciseBelongProgramm.create({ programmId: programm.id, exerciseId: exersice.body.exerciseId, userId: userSession.id, timing : exersice.body.timing  , sets : exersice.body.sets, date: exersice.date});
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при создании связей упражнения с программой'},{status:500})}
        try{
            for (let i = 0; i < nutritions.length; i++){
                const nutrition = nutritions[i]
                await NutritionBelongProgramm.create({ programmId: programm.id, nutritionId: nutrition.body.id, userId: userSession.id, date: nutrition.date});
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при создании связей шаблонов питания с программой'},{status:500})}
        try{
            for (let i = 0; i < tests.length; i++){
                const test = tests[i]
                await TestBelongProgramm.create({ programmId: programm.id, testId: test.body.id, userId: userSession.id, date: test.date});
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при создании связей тестов с программой'},{status:500})}
        try{
            for (let i = 0; i < users.length; i++){
                const user = users[i]
                await UsersBelongProgramm.create({ programmId: programm.id,  userId: user.id});
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при создании связей тестов с программой'},{status:500})}

        return Response.json({message:'ok'})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании программы'},{status:418})}

}


// Функция возвращает одного 
export async function DELETE(req,{params}){
    try{
        try{
            await SportProgramm.destroy({where:{id: params.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при Удалении связей упражнения с программой'},{status:500})}
        try{
            await ExerciseBelongProgramm.destroy({where:{programmId: params.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при Удалении связей упражнения с программой'},{status:500})}
        try{
            await NutritionBelongProgramm.destroy({where:{programmId: params.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при Удалении связей шаблонов питания с программой'},{status:500})}
        try{
            await TestBelongProgramm.destroy({where:{programmId: params.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при Удалении связей тестов с программой'},{status:500})}
        try{
            await UsersBelongProgramm.destroy({where:{programmId: params.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при Удалении связей пользователей с программой'},{status:500})}
        return Response.json({message:"ok"})
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}