
import chalk from 'chalk'
import SportProgramm from '@/models/SportProgramm';
import { headers } from 'next/headers';
import { decrypt } from '@/service/UserService';
import ExerciseBelongTrainingProgramm from '@/models/ExerciseBelongTrainingProgramm';
import NutritionBelongProgramm from '@/models/NutritionBelongProgramm';
import TestBelongProgramm from '@/models/TestBelongProgramm';
import UsersBelongProgramm from '@/models/UsersBelongProgramm';

export const dynamic = 'force-dynamic'

// Функция всех
export async function GET(){
    try{
        return Response.json(await SportProgramm.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}


// Функция для создания новогй программы
export async function POST(req){
    try{
        let session;
    try {
      const headersList = headers()
      session = headersList.get('session')
    } catch (e) {
      console.log(e);
      return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
    }
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
                await ExerciseBelongTrainingProgramm.create({ programmId: programm.id, exerciseId: exersice.exerciseId, userId: userSession.id, time : exersice.timing  , sets : typeof exersice.sets === 'string'? exersice.sets : JSON.stringify(exersice.sets), date: exersice.date});
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при создании связей упражнения с программой'},{status:500})}
        try{
            for (let i = 0; i < nutritions.length; i++){
                const nutrition = nutritions[i]
                await NutritionBelongProgramm.create({ programmId: programm.id, nutritionId: nutrition.id, userId: userSession.id, date: nutrition.date});
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при создании связей шаблонов питания с программой'},{status:500})}
        try{
            for (let i = 0; i < tests.length; i++){
                const test = tests[i]
                await TestBelongProgramm.create({ programmId: programm.id, testId: test.id, userId: userSession.id, date: test.date});
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