import UserDto from "@/dtos/user-dto";
import ExerciseBelongTrainingProgramm from "@/models/ExerciseBelongTrainingProgramm";
import NutritionBelongProgramm from "@/models/NutritionBelongProgramm";
import SportProgramm from "@/models/SportProgramm";
import SportsmansBelongProgramm from "@/models/SportsmansBelongProgramm";
import Test from "@/models/Test";
import TestBelongProgramm from "@/models/TestBelongProgramm";
import User from "@/models/User";
import UsersBelongProgramm from "@/models/UsersBelongProgramm";
import { decrypt, validateSession } from "@/service/UserService";
import chalk from "chalk";
import { headers } from "next/headers";


export const dynamic = "force-dynamic";

// Функция возвращает все шаблоны
export async function GET() {
  try {
    let finalArray = [];

    let session;
    try {
      const headersList = headers()
      session = headersList.get('session')
    } catch (e) {
      console.log(e);
      return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
    }
    try {
      if (!session || !validateSession(session)) {
        return Response.json({ message: "Сессия не действительна" }, { status: 401 });
      }
    } catch (e) {
      console.log(e);
      return Response.json({ message: "Ошибка во время валидации сессии" }, { status: 401 });
    }

    // Получаем пользователя из запроса
    let user;
    try {
      user = await decrypt(session);
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json({ message: "Возникла ошибка во время расшифровки токена" }, { status: 500 });
    }
    // Получаем спортпрограммы спортсмена
    let sportProgramms;
    try {
      sportProgramms = await SportProgramm.findAll();
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json({ message: "Возникла ошибка во получения спортивных программ" }, { status: 500 });
    }


    // Получаем спортпрограммы спортсмена
    let programms;
    try {
      programms = await UsersBelongProgramm.findAll({ where: { userId: user.id } });
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json({ message: "Возникла ошибка во получения спортивных программ" }, { status: 500 });
    }


    try {
      let exerciseBelongTrainingProgramm;
      let nutritionBelongProgramm;
      let testBelongProgramm;
      let finalExercisesArray =[];
      let finalNotritionsArray =[];
      let finalTestsArray =[];
      let finalDays = []
      // Перебираем список программ
      for (const programm of programms) {
        const prgm = sportProgramms.find(el => el.id == programm.programmId)
        if(prgm && prgm.days?.length>0){
          finalDays.push(...prgm.days)
        }
        // Получаем список упражнений из программы
        try {
          exerciseBelongTrainingProgramm =  await ExerciseBelongTrainingProgramm.findAll({
            where: { programmId: programm.programmId },
          });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message: "Возникла ошибка во время получения списка свзей упражнений с программой",
            },
            { status: 500 }
          );
        }
        // Получаем список Питания из программы
        
        try {
          nutritionBelongProgramm = await NutritionBelongProgramm.findAll({
            where: { programmId:  programm.programmId },
          });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message: "Возникла ошибка во время получения списка свзей питания с программой",
            },
            { status: 500 }
          );
        }
        // Получаем список тестов из программы
        
        try {
          testBelongProgramm = await TestBelongProgramm.findAll({
            where: { programmId:  programm.programmId },
          });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message: "Возникла ошибка во время получения списка свзей питания с программой",
            },
            { status: 500 }
          );
        }

        try {
          finalExercisesArray = [...finalExercisesArray,...exerciseBelongTrainingProgramm]
          finalTestsArray = [...finalTestsArray,...testBelongProgramm]
          finalNotritionsArray = [...finalNotritionsArray,...nutritionBelongProgramm]
          exerciseBelongTrainingProgramm = [];
          testBelongProgramm = [];
          nutritionBelongProgramm = [];
        } catch (e) {console.log(e);return Response.json({message: "Возникла ошибка во время ",},{ status: 500 });}
      }
      finalArray.push({
        'exercises': finalExercisesArray,
        'tests': finalTestsArray,
        'nutrition': finalNotritionsArray,
        'days':finalDays
      });
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json({ message: "Возникла ошибка во время получения данных" }, { status: 500 });
    }

    return Response.json(finalArray);
  } catch (err) {
    console.log(chalk.red(err));
    return Response.json({ message: "Возникла Непредвиденная ошибка..." }, { status: 418 });
  }
}
