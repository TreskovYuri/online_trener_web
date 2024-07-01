import ExerciseBelongProgramm from "@/models/ExerciseBelongTrainingProgramm";
import chalk from "chalk";

export const dynamic = "force-dynamic";

// Функция возвращает одного 
export async function GET(req){
    try{
        return Response.json(await ExerciseBelongProgramm.findAll({order: [['updatedAt', 'DESC']] }));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска упражнений в базе даных...'},{status:500})}

}


