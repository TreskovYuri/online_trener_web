import chalk from "chalk";
import TrainingPattern from "@/models/TrainingPattern";
import ExerciseBelongTrainingProgramm from "@/models/ExerciseBelongTrainingProgramm";


export const dynamic = "force-dynamic";

// Функция возвращает одного
export async function GET() {
  try {
    var finalList = [];
    const patterns = await TrainingPattern.findAll();
    for(const  pattern of patterns){
        const count = await ExerciseBelongTrainingProgramm.findAll({where:{programmId: pattern.id}})
        finalList.push({
            ...pattern.toJSON(),
            'count':count.length
        })
    }
    return Response.json(finalList);
  } catch (err) {
    console.log(chalk.red(err));
    return Response.json({message: "Возникла ошибка во время поиска пользователя в базе даных...",},{ status: 500 });
  }
}