import User from "@/models/User"
import chalk from 'chalk'
import UserDto from "@/dtos/user-dto"
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import { writeFile } from "fs/promises";
import fs from 'fs'
import {v4} from 'uuid'
import path from "path";
import Exercise from "@/models/Exercise"

export const dynamic = 'force-dynamic'

// Функция возвращает одного 
export async function GET(){
    try{
        return Response.json(await Exercise.findAll({order: [['updatedAt', 'DESC']] }));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}

// Функция для создания нового  
export async function POST(req){
    try{
        const session = cookies().get('session').value
        const formData = await req.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const link = formData.get("link");
        const img = formData.get("img");
        const video = formData.get("video");
        if (!name){return Response.json({"message":'Передайте название'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        let exercise;
        try{
            exercise = await Exercise.create({ name});
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        try {
            description && description != 111 ? exercise.description = description.toString() : null
            description == 111  ? exercise.description = '' : null
            link && link != 111 ? exercise.link = link.toString() : null
            link == 111  ? exercise.link = '' : null
          } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при примвоении новых данных агенства..." }, { status: 500 });}
          if (img) {
            const existingImageFileName = exercise.img; // Предполагаем, что имя файла изображения хранится в поле img объекта product
            if (existingImageFileName) {
              try {
                  // Удаляем существующий файл изображения
                  await fs.unlink(path.join(process.cwd(), "public/assets/", existingImageFileName), (err) => {
                      if (err) {
                          console.log(chalk.red("Ошибка при удалении текущего изображения", err));
                      } else {
                          console.log("Файл успешно удален");
                      }
                  });
              } catch (err) {
                  console.log(chalk.red("Ошибка при удалении текущего изображения", err));
              }
          }
    
            // Сохраняем новый файл изображения
            const fileExtension = img.name.split(".").pop();
            const format = ["jpg", "png", "jpeg", "webp"];
    
            if (!format.includes(fileExtension)) {
                return Response.json({ message: 'Формат изображения не поддерживается...Разрешенные форматы: ("jpg", "png", "jpeg", "webp")' }, { status: 400 });
            }
    
            // Генерируем уникальное имя файла
            let fileName;
            do {
                fileName = v4() + "." + fileExtension;
                const filePath = path.join(process.cwd(), "public/assets/", fileName);
                // Проверяем, существует ли файл с таким именем
                try {
                    await fs.promises.access(filePath);
                } catch (err) {
                    // Файл с таким именем не существует, выходим из цикла
                    break;
                }
            } while (true);
    
            try {
                // Читаем содержимое файла
                const fileData = await img.arrayBuffer();
                // Записываем файл в каталог public/assets/
                await writeFile(path.join(process.cwd(), "public/assets/", fileName), Buffer.from(fileData));
            } catch (err) {
                console.log(chalk.red(err));
                return Response.json({ message: "Ошибка при сохранении нового изображения" }, { status: 500 });
            }
            exercise.img = fileName
        }
          if (video) {
            const existingImageFileName = exercise.video; // Предполагаем, что имя файла изображения хранится в поле img объекта product
            if (existingImageFileName) {
              try {
                  // Удаляем существующий файл изображения
                  await fs.unlink(path.join(process.cwd(), "public/assets/", existingImageFileName), (err) => {
                      if (err) {
                          console.log(chalk.red("Ошибка при удалении текущего изображения", err));
                      } else {
                          console.log("Файл успешно удален");
                      }
                  });
              } catch (err) {
                  console.log(chalk.red("Ошибка при удалении текущего изображения", err));
              }
          }
    
            // Сохраняем новый файл изображения
            const fileExtension = img.name.split(".").pop();
            const format = ["mp4"];
    
            if (!format.includes(fileExtension)) {
                return Response.json({ message: 'Формат изображения не поддерживается...Разрешенные форматы: ("mp4")' }, { status: 400 });
            }
    
            // Генерируем уникальное имя файла
            let fileName;
            do {
                fileName = v4() + "." + 'acaca';
                const filePath = path.join(process.cwd(), "public/assets/", fileName);
                // Проверяем, существует ли файл с таким именем
                try {
                    await fs.promises.access(filePath);
                } catch (err) {
                    // Файл с таким именем не существует, выходим из цикла
                    break;
                }
            } while (true);
    
            try {
                // Читаем содержимое файла
                const fileData = await img.arrayBuffer();
                // Записываем файл в каталог public/assets/
                await writeFile(path.join(process.cwd(), "public/assets/", fileName), Buffer.from(fileData));
            } catch (err) {
                console.log(chalk.red(err));
                return Response.json({ message: "Ошибка при сохранении нового изображения" }, { status: 500 });
            }
            exercise.video = fileName
        }
        try {
            exercise.save()
        } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при сохранении обновленных данных..." }, { status: 500 });}
        return Response.json(exercise)
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}
// Функция для обновления данных пользователя 
export async function PUT(req){
    try{
        const session = cookies().get('session').value
        const formData = await req.formData();
        const id = formData.get("id");
        const name = formData.get("name");
        const date = formData.get("date");
        const post = formData.get("post");
        const team = formData.get("team");
        const number = formData.get("number");
        const email = formData.get("email");
        const img = formData.get("img");

        if (!id ){return Response.json({"message":'Передайте id'},{status:400})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post != 'Тренер' && userSession.post != 'Супер тренер'){return Response.json({"message":'У вас нет доступа для редактирования профилей.'},{status:400})}
        let user; 
        try {
            user = await User.findOne({where: {id}})
            if(!user){return Response.json({"message":'Пользователь не найден...'},{status:404})}
        } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при поске пользователя в базе данных..." }, { status: 500 });}
        try {
            name && name != 111 ? user.name = name.toString() : null
            name == 111  ? user.name = '' : null
            date && date != 111 ? user.date = date.toString() : null
            date == 111  ? user.date = '' : null
            post && post != 111 ? user.post = post.toString() : null
            post == 111  ? user.post = '' : null
            team && team != 111 ? user.team = team.toString() : null
            team == 111  ? user.team = '' : null
            number && number != 111 ? user.number = number.toString() : null
            number == 111  ? user.number = '' : null
            email && email != 111 ? user.email = email.toString() : null
            email == 111  ? user.email = '' : null
          } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при примвоении новых данных агенства..." }, { status: 500 });}

          if (img) {
            const existingImageFileName = user.img; // Предполагаем, что имя файла изображения хранится в поле img объекта product
            if (existingImageFileName) {
              try {
                  // Удаляем существующий файл изображения
                  await fs.unlink(path.join(process.cwd(), "public/assets/", existingImageFileName), (err) => {
                      if (err) {
                          console.log(chalk.red("Ошибка при удалении текущего изображения", err));
                      } else {
                          console.log("Файл успешно удален");
                      }
                  });
              } catch (err) {
                  console.log(chalk.red("Ошибка при удалении текущего изображения", err));
              }
          }
    
            // Сохраняем новый файл изображения
            const fileExtension = img.name.split(".").pop();
            const format = ["jpg", "png", "jpeg", "webp"];
    
            if (!format.includes(fileExtension)) {
                return Response.json({ message: 'Формат изображения не поддерживается...Разрешенные форматы: ("jpg", "png", "jpeg", "webp")' }, { status: 400 });
            }
    
            // Генерируем уникальное имя файла
            let fileName;
            do {
                fileName = v4() + "." + fileExtension;
                const filePath = path.join(process.cwd(), "public/assets/", fileName);
                // Проверяем, существует ли файл с таким именем
                try {
                    await fs.promises.access(filePath);
                } catch (err) {
                    // Файл с таким именем не существует, выходим из цикла
                    break;
                }
            } while (true);
    
            try {
                // Читаем содержимое файла
                const fileData = await img.arrayBuffer();
                // Записываем файл в каталог public/assets/
                await writeFile(path.join(process.cwd(), "public/assets/", fileName), Buffer.from(fileData));
            } catch (err) {
                console.log(chalk.red(err));
                return Response.json({ message: "Ошибка при сохранении нового изображения" }, { status: 500 });
            }
            user.img = fileName
        }
          try {
            user.save()
        } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при сохранении обновленных данных..." }, { status: 500 });}
        return Response.json(new UserDto(user))
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}
