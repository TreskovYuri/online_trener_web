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
import { cookies} from "next/headers";

export const dynamic = "force-dynamic";

// Функция возвращает все шаблоны
export async function GET() {
  try {
    let finalArray = [];
    const session = cookies().get('session').value
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

    // Получвем принадлежащие ему спортивные программы
    let sportpogramms;
    try {
      sportpogramms = await SportProgramm.findAll({ where: { userId: user.id } });
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json({ message: "Возникла ошибка во получения спортивных программ" }, { status: 500 });
    }
    let users;
    try {
      users = await User.findAll({ where: { post: "Спортсмен" } });
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json({ message: "Возникла ошибка во получения спортивных программ" }, { status: 500 });
    }

    try {
      // Перебираем список программ
      for (const programm of sportpogramms) {
        // Получаем список спортсменов из спортивной программы
        let sportsmans;
        try {
          sportsmans = await UsersBelongProgramm.findAll({
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
          exerciseBelongTrainingProgramm = await ExerciseBelongTrainingProgramm.findAll({
            where: { programmId: programm.id },
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
        let nutritionBelongProgramm;
        try {
          nutritionBelongProgramm = await NutritionBelongProgramm.findAll({
            where: { programmId: programm.id },
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
        let testBelongProgramm;
        try {
          testBelongProgramm = await TestBelongProgramm.findAll({
            where: { programmId: programm.id },
          });
        } catch (err) {
          console.log(chalk.red(err));
          return Response.json(
            {
              message: "Возникла ошибка во время получения списка свзей тестов с программой",
            },
            { status: 500 }
          );
        }
        try {
          for (const sportsman of sportsmans) {
            // Проверяем есть ли такой спортсмен в списке
            const existingUser = finalArray.find((el) => el.id == sportsman.userId);

            if (existingUser) {
              // Если такой спортсмен уже есть, формирцуем списки упражнений, тестов и питания с пометкой типа
              const newExercises = exerciseBelongTrainingProgramm;
              const newTests = testBelongProgramm;
              const newNutrition = nutritionBelongProgramm;

              // тобавляем новые обьекты к спискам
              existingUser.exercises = existingUser.exercises.concat(newExercises);
              existingUser.tests = existingUser.tests.concat(newTests);
              existingUser.nutrition = existingUser.nutrition.concat(newNutrition);
            } else {
              // Если такого обьекта нет, то добавляем новый обьект
              const usr = await users.find((el) => el.id == sportsman.userId);
              if (usr) {
                finalArray.push({
                  id: usr.id,
                  name: usr.name,
                  number: usr.number,
                  email: usr.email,
                  post: usr.post,
                  team: usr.team,
                  exercises: exerciseBelongTrainingProgramm,
                  tests: testBelongProgramm,
                  nutrition: nutritionBelongProgramm,
                });
              }
            }
          }
        } catch (e) {
          console.log(e);
          return Response.json(
            {
              message: "Возникла ошибка во время формирования финального списка.",
            },
            { status: 500 }
          );
        }
      }
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
