import chalk from "chalk";
import ExerciseBelongTrainingProgramm from "@/models/ExerciseBelongTrainingProgramm";


export const dynamic = "force-dynamic";

// Функция возвращает одного
export async function GET() {
  try {
    return Response.json(await ExerciseBelongTrainingProgramm.findAll());
  } catch (err) {
    console.log(chalk.red(err));
    return Response.json({message: "Возникла ошибка во время поиска пользователя в базе даных...",},{ status: 500 });
  }
}