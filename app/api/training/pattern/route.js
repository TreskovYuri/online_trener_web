import chalk from "chalk";
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService";

import TrainingPattern from "@/models/TrainingPattern";

export const dynamic = "force-dynamic";

// Функция возвращает одного
export async function GET() {
  try {
    const session = cookies().get("session").value;
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

    return Response.json(await TrainingPattern.findAll({order: [['updatedAt', 'DESC']] }));
  } catch (err) {
    console.log(chalk.red(err));
    return Response.json(
      {
        message: "Возникла ошибка во время поиска пользователя в базе даных...",
      },
      { status: 500 }
    );
  }
}

// Функция для создания нового шаблона тренировокы
export async function POST(req) {
  try {
    const session = cookies().get("session").value;
    const formData = await req.formData();
    const name = formData.get("name");
    const stages = JSON.parse(formData.get("stages"));
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
      pattern = await TrainingPattern.create({ name, userId: userSession.id,stages:stages});
    } catch (err) {
      console.log(chalk.red(err));
      return Response.json(
        {
          message: "Возникла ошибка во время отправки письма для подтверждения",
        },
        { status: 500 }
      );
    }

    return Response.json({ messsage: "ok" });
  } catch (err) {
    console.log(chalk.red(err));
    return Response.json(
      { message: "Возникла непредвиденная ошибка при создании пользователя" },
      { status: 418 }
    );
  }
}
// Функция для обновления нового шаблона тренировокы
// export async function PUT(req) {
//   try {
//     const session = cookies().get("session").value;
//     const formData = await req.formData();
//     const name = formData.get("name");
//     const id = formData.get("id");
//     const exersices = JSON.parse(formData.get("exersices"));
//     const tests = JSON.parse(formData.get("tests"));
//     Response.json({ message: "ok" });
//     if (!id) {
//       return Response.json({ message: "Передайте id" }, { status: 400 });
//     }
//     if (!name) {
//       return Response.json({ message: "Передайте название" }, { status: 400 });
//     }
//     if (!session) {
//       return Response.json({ message: "Токен не обнаружен" }, { status: 401 });
//     }

//     let userSession; // Достаем данные пользователя из токена
//     try {
//       userSession = await decrypt(session);
//       if (!userSession) {
//         return Response.json(
//           { message: "Не удалось расшифровать токен, доступ запрещен!" },
//           { status: 403 }
//         );
//       }
//     } catch (err) {
//       console.log(chalk.red(err));
//       return Response.json(
//         { message: "Возникла ошибка во время расшифровки токена" },
//         { status: 500 }
//       );
//     }
//     if (userSession.post !== "Супер тренер" && userSession.post !== "Тренер") {
//       return Response.json(
//         { message: "Не валидная должность" },
//         { status: 400 }
//       );
//     }
//     let pattern;
//     try {
//       pattern = await TrainingPattern.findOne({ where: { id: parseInt(id) } });
//     } catch (err) {
//       console.log(chalk.red(err));
//       return Response.json(
//         {
//           message: "Возникла ошибка во время отправки письма для подтверждения",
//         },
//         { status: 500 }
//       );
//     }
//     try {
//       await ExerciseBelongTrainingProgramm.destroy({
//         where: { programmId: pattern.id },
//       });
//     } catch (err) {
//       console.log(chalk.red(err));
//       return Response.json(
//         { message: "Возникла ошибка во время удаления связей" },
//         { status: 500 }
//       );
//     }
//     try {
//       await TestBelongTrainingPattern.destroy({
//         where: { programmId: pattern.id },
//       });
//     } catch (err) {
//       console.log(chalk.red(err));
//       return Response.json(
//         { message: "Возникла ошибка во время удвления связей" },
//         { status: 500 }
//       );
//     }
//     try {
//       for (const obj of exersices) {
//         await ExerciseBelongTrainingProgramm.create({
//           programmId: pattern.id,
//           exerciseId: obj.exersiceId,
//           userId: userSession.id,
//           sets: JSON.stringify(obj.sets),
//           time: obj.time ? obj.time : null,
//         });
//       }
//     } catch (err) {
//       console.log(chalk.red(err));
//       return Response.json(
//         { message: "Возникла ошибка во время создания связей" },
//         { status: 500 }
//       );
//     }

//     try {
//       for (const obj of tests) {
//         await TestBelongTrainingPattern.create({
//           programmId: pattern.id,
//           testId: obj,
//           userId: userSession.id,
//         });
//       }
//     } catch (err) {
//       console.log(chalk.red(err));
//       return Response.json(
//         { message: "Возникла ошибка во время создания связей" },
//         { status: 500 }
//       );
//     }
//     try {
//       name ? pattern.name = name : pattern.name = null
//       pattern.save()
//     } catch (err) {
//       console.log(chalk.red(err));
//       return Response.json(
//         { message: "Возникла ошибка во время создания связей" },
//         { status: 500 }
//       );
//     }

//     return Response.json({ messsage: "ok" });
//   } catch (err) {
//     console.log(chalk.red(err));
//     return Response.json(
//       { message: "Возникла непредвиденная ошибка при создании пользователя" },
//       { status: 418 }
//     );
//   }
// }
