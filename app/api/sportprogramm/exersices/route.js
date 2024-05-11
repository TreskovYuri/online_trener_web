import ExerciseBelongProgramm from "@/models/ExerciseBelongTrainingProgramm";
import chalk from "chalk";



// Функция возвращает одного 
export async function GET(req){
    try{
        return Response.json(await ExerciseBelongProgramm.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска упражнений в базе даных...'},{status:500})}

}


