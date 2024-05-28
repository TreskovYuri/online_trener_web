import ExerciseBelongTrainingProgramm from "@/models/ExerciseBelongTrainingProgramm";
import chalk from "chalk";



// Функция возвращает одного 
export async function GET(req,{params}){
    try{
        return Response.json(await ExerciseBelongTrainingProgramm.findAll({where:{programmId:params.id}}));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}


