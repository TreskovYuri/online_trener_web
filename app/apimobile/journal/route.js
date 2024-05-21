import UserDto from "@/dtos/user-dto";
import ExerciseBelongTrainingProgramm from "@/models/ExerciseBelongTrainingProgramm";
import NutritionBelongProgramm from "@/models/NutritionBelongProgramm";
import SportProgramm from "@/models/SportProgramm";
import SportsmansBelongProgramm from "@/models/SportsmansBelongProgramm";
import Test from "@/models/Test";
import TestBelongProgramm from "@/models/TestBelongProgramm";
import { decrypt, validateSession } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// Функция возвращает все шаблоны
export async function GET() {
  try {
    let finalArray = [];
    const session = cookies().get("session").value;
    if (!session || !validateSession(session)) {
      return Response.json(
        { message: "Сессия не действительна" },
        { status: 401 }
      );
    }
    // Получаем пользователя из запроса
    let user;
    try {
      user = await decrypt(session);
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json(
        { message: "Возникла ошибка во время расшифровки токена" },
        { status: 500 }
      );
    }
    // Получвем принадлежащие ему спортивные программы
    let sportpogramms;
    try {
      sportpogramms = SportProgramm.findAll({ where: { userId: user.id } });
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json(
        { message: "Возникла ошибка во получения спортивных программ" },
        { status: 500 }
      );
    }
    try {
      // Перебираем список программ
      for (const programm of sportpogramms) {
        // Получаем список спортсменов из спортивной программы
        let sportsmans;
        try {
          sportsmans = SportsmansBelongProgramm.findAll({
            where: { programmId: programm.id },
          });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message: "Возникла ошибка во время получения списка спортсменов",
            },
            { status: 500 }
          );
        }

        // Получаем список упражнений из программы
        let exerciseBelongTrainingProgramm;
        try {
          exerciseBelongTrainingProgramm =
            ExerciseBelongTrainingProgramm.findAll({
              where: { programmId: programm.id },
            });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message:
                "Возникла ошибка во время получения списка свзей упражнений с программой",
            },
            { status: 500 }
          );
        }
        // Получаем список Питания из программы
        let nutritionBelongProgramm;
        try {
          nutritionBelongProgramm = NutritionBelongProgramm.findAll({
            where: { programmId: programm.id },
          });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message:
                "Возникла ошибка во время получения списка свзей питания с программой",
            },
            { status: 500 }
          );
        }
        // Получаем список тестов из программы
        let testBelongProgramm;
        try {
          testBelongProgramm = TestBelongProgramm.findAll({
            where: { programmId: programm.id },
          });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message:
                "Возникла ошибка во время получения списка свзей питания с программой",
            },
            { status: 500 }
          );
        }

        for (const sportsman of sportsmans) {
          // Проверяем есть ли такой спортсмен в списке
          const existingUser = finalArray.find((el) => el.id == sportsman.id);

          if (existingUser) {
            // Если такой спортсмен уже есть, формирцуем списки упражнений, тестов и питания с пометкой типа
            const newExercises = (await exerciseBelongTrainingProgramm).map(
              (e) => {
                e["type"] = "Упражнение";
                return e;
              }
            );
            const newTests = (await testBelongProgramm).map((e) => {
              e["type"] = "Тест";
              return e;
            });
            const newNutrition = (await nutritionBelongProgramm).map((e) => {
              e["type"] = "Питание";
              return e;
            });

            // тобавляем новые обьекты к спискам
            existingUser.exercises =
              existingUser.exercises.concat(newExercises);
            existingUser.tests = existingUser.tests.concat(newTests);
            existingUser.nutrition =
              existingUser.nutrition.concat(newNutrition);
          } else {
            // Если такого обьекта нет, то добавляем новый обьект
            finalArray.push({
              ...UserDto(sportsman),
              exercises: (await exerciseBelongTrainingProgramm).map((e) => {
                e["type"] = "Упражнение";
                return e;
              }),
              tests: (await testBelongProgramm).map((e) => {
                e["type"] = "Тест";
                return e;
              }),
              nutrition: (await nutritionBelongProgramm).map((e) => {
                e["type"] = "Питание";
                return e;
              }),
            });
          }
        }
      }
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json(
        { message: "Возникла ошибка во время получения данных" },
        { status: 500 }
      );
    }

    return Response.json(finalArray);
  } catch (err) {
    console.log(chalk.red(err));
    return Response.json(
      { message: "Возникла ошибка во время поиска модели в базе даных..." },
      { status: 500 }
    );
  }
}
