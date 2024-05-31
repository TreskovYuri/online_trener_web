import chalk from "chalk";
import TrainingPattern from "@/models/TrainingPattern";
import ExerciseBelongTrainingProgramm from "@/models/ExerciseBelongTrainingProgramm";
import { headers } from "next/headers";
import { decrypt } from "@/service/UserService";
import TestBelongTrainingPattern from "@/models/TestBelongTrainingPattern";


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


// Функция для создания нового шаблона тренировокы
export async function POST(req) {
  try {
    let session;
        try {
          const headersList = headers();
          session = headersList.get("session");
        } catch (e) {
          console.log(e);
          return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
        }
    const formData = await req.formData();
    const name = formData.get("name");
    const exersices = JSON.parse(formData.get("exersices"));
    const tests = JSON.parse(formData.get("tests"));
    if (!name) {
      return Response.json({ message: "Передайте название" }, { status: 400 });
    }
    if (!session) {
      return Response.json({ message: "Токен не обнаружен" }, { status: 401 });
    }

    let userSession; // Достаем данные пользователя из токена
    try {
      userSession = await decrypt(session);
      if (!userSession) {
        return Response.json(
          { message: "Не удалось расшифровать токен, доступ запрещен!" },
          { status: 403 }
        );
      }
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json(
        { message: "Возникла ошибка во время расшифровки токена" },
        { status: 500 }
      );
    }
    if (userSession.post !== "Супер тренер" && userSession.post !== "Тренер") {
      return Response.json(
        { message: "Не валидная должность" },
        { status: 400 }
      );
    }
    let pattern;
    try {
      pattern = await TrainingPattern.create({ name, userId: userSession.id });
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json(
        {
          message: "Возникла ошибка во время отправки письма для подтверждения",
        },
        { status: 500 }
      );
    }

    try {
      if(exersices){
        for (const obj of exersices) {
          await ExerciseBelongTrainingProgramm.create({
            programmId: pattern.id,
            exerciseId: obj.exersiceId,
            userId: userSession.id,
            sets: JSON.stringify(obj.sets),
            time: obj.time ? obj.time : null,
          });
        }
      }
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json(
        { message: "Возникла ошибка во время создания связей упражнения с шаблоном" },
        { status: 500 }
      );
    }
    // try {
    //   for (const obj of tests) {
    //     await TestBelongTrainingPattern.create({
    //       programmId: pattern.id,
    //       testId: obj,
    //       userId: userSession.id,
    //     });
    //   }
    // } catch (err) {
    //   console.log(chalk.red(err));
    //   return Response.json(
    //     { message: "Возникла ошибка во время создания связей" },
    //     { status: 500 }
    //   );
    // }

    return Response.json({ messsage: "ok" });
  } catch (err) {
    console.log(chalk.red(err));
    return Response.json(
      { message: "Возникла непредвиденная ошибка при создании пользователя" },
      { status: 418 }
    );
  }
}