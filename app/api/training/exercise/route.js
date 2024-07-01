
import chalk from 'chalk'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import { writeFile } from "fs/promises";
import fs from 'fs'
import {v4} from 'uuid'
import path from "path";
import Exercise from "@/models/Exercise"

export const dynamic = 'force-dynamic'

// Функция возвращает одного пользователя
export async function GET(){
    try{
        return Response.json(await Exercise.findAll({order: [['updatedAt', 'DESC']] }));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}

// Функция для создания нового пользователя 
export async function POST(req){
    try{
        const session = cookies().get('session').value
        const formData = await req.formData();
        const nameRu = formData.get("nameRu");
        const descriptionRu = formData.get("descriptionRu");
        const nameEng = formData.get("nameEng");
        const descriptionEng = formData.get("descriptionEng");
        const equipments = formData.get("equipments");
        const stage = formData.get("stage");
        const groupId = formData.get("groupId");
        const musclegroups = formData.get("musclegroups");

        const pocazatel1Name = formData.get("pocazatel1Name");
        const pocazatel1Type = formData.get("pocazatel1Type");
        const pocazatel1SPFlag = formData.get("pocazatel1SPFlag");
        const pocazatel2Name = formData.get("pocazatel2Name");
        const pocazatel2Type = formData.get("pocazatel2Type");
        const pocazatel2SPFlag = formData.get("pocazatel2SPFlag");
        const pocazatel3Name = formData.get("pocazatel3Name");
        const pocazatel3Type = formData.get("pocazatel3Type");
        const pocazatel3SPFlag = formData.get("pocazatel3SPFlag");
        const pocazatel4Name = formData.get("pocazatel4Name");
        const pocazatel4Type = formData.get("pocazatel4Type");
        const pocazatel4SPFlag = formData.get("pocazatel4SPFlag");
        const pocazatel5Name = formData.get("pocazatel5Name");
        const pocazatel5Type = formData.get("pocazatel5Type");
        const pocazatel5SPFlag = formData.get("pocazatel5SPFlag");

        const link = formData.get("link");
        const img = formData.get("img");
        const video = formData.get("video");
        if (!nameRu){return Response.json({"message":'Передайте название'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер' && userSession.post !== 'Тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        let exercise;
        try{
            exercise = await Exercise.create({ nameRu});
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания новой модели'},{status:500})}

        try {
            descriptionRu ? exercise.descriptionRu = descriptionRu.toString(): exercise.descriptionRu = null
            nameEng ? exercise.nameEng = nameEng.toString(): exercise.nameEng = null
            descriptionEng ? exercise.descriptionEng = descriptionEng.toString(): exercise.descriptionEng = null
            equipments ? exercise.equipment = equipments.toString(): exercise.equipment = null
            stage ? exercise.stage = stage.toString(): exercise.stage = null
            groupId ? exercise.groupId = parseInt(groupId): exercise.groupId = null
            link ? exercise.link = link.toString() : exercise.link = null
            musclegroups ? exercise.musclegroups = musclegroups.toString() : exercise.musclegroups = null

            pocazatel1Name ? exercise.pocazatel1Name = pocazatel1Name.toString() :  exercise.pocazatel1Name = null
            pocazatel1Type ? exercise.pocazatel1Type = pocazatel1Type.toString() : exercise.pocazatel1Type = null
            pocazatel1SPFlag ? exercise.pocazatel1SPFlag = pocazatel1SPFlag.toString() : exercise.pocazatel1SPFlag = null
            pocazatel2Name ? exercise.pocazatel2Name = pocazatel2Name.toString() : exercise.pocazatel2Name = null
            pocazatel2Type ? exercise.pocazatel2Type = pocazatel2Type.toString() : exercise.pocazatel2Type = null
            pocazatel2SPFlag ? exercise.pocazatel2SPFlag = pocazatel2SPFlag.toString() : exercise.pocazatel2SPFlag = null
            pocazatel3Name ? exercise.pocazatel3Name = pocazatel3Name.toString() : exercise.pocazatel3Name = null
            pocazatel3Type ? exercise.pocazatel3Type = pocazatel3Type.toString() : exercise.pocazatel3Type = null
            pocazatel3SPFlag ? exercise.pocazatel3SPFlag = pocazatel3SPFlag.toString() : exercise.pocazatel3SPFlag = null
            pocazatel4Name ? exercise.pocazatel4Name = pocazatel4Name.toString() : exercise.pocazatel4Name = null
            pocazatel4Type ? exercise.pocazatel4Type = pocazatel4Type.toString() : exercise.pocazatel4Type = null
            pocazatel4SPFlag ? exercise.pocazatel4SPFlag = pocazatel4SPFlag.toString() : exercise.pocazatel4SPFlag = null
            pocazatel5Name ? exercise.pocazatel5Name = pocazatel5Name.toString() : exercise.pocazatel5Name = null
            pocazatel5Type ? exercise.pocazatel5Type = pocazatel5Type.toString() : exercise.pocazatel5Type = null
            pocazatel5SPFlag ? exercise.pocazatel5SPFlag = pocazatel5SPFlag.toString() : exercise.pocazatel5SPFlag = null


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
            const fileExtension = video.name.split(".").pop();
            const format = ["mp4"];
    
            if (!format.includes(fileExtension)) {
                return Response.json({ message: 'Формат видео не поддерживается...Разрешенные форматы: ("mp4")' }, { status: 409 });
            }
    
            // Генерируем уникальное имя файла
            let fileName;
            do {
                fileName = v4() + "." + fileExtension;
                const filePath = await path.join(process.cwd(), "public/assets/", fileName);
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
                const fileData = await video.arrayBuffer();
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
// Функция для создания нового пользователя 
export async function PUT(req){
    try{
        const session = cookies().get('session').value
        const formData = await req.formData();
        const id = formData.get("id");
        const nameRu = formData.get("nameRu");
        const descriptionRu = formData.get("descriptionRu");
        const nameEng = formData.get("nameEng");
        const descriptionEng = formData.get("descriptionEng");
        const equipments = formData.get("equipments");
        const stage = formData.get("stage");
        const groupId = formData.get("groupId");
        const musclegroups = formData.get("musclegroups");

        const pocazatel1Name = formData.get("pocazatel1Name");
        const pocazatel1Type = formData.get("pocazatel1Type");
        const pocazatel1SPFlag = formData.get("pocazatel1SPFlag");
        const pocazatel2Name = formData.get("pocazatel2Name");
        const pocazatel2Type = formData.get("pocazatel2Type");
        const pocazatel2SPFlag = formData.get("pocazatel2SPFlag");
        const pocazatel3Name = formData.get("pocazatel3Name");
        const pocazatel3Type = formData.get("pocazatel3Type");
        const pocazatel3SPFlag = formData.get("pocazatel3SPFlag");
        const pocazatel4Name = formData.get("pocazatel4Name");
        const pocazatel4Type = formData.get("pocazatel4Type");
        const pocazatel4SPFlag = formData.get("pocazatel4SPFlag");
        const pocazatel5Name = formData.get("pocazatel5Name");
        const pocazatel5Type = formData.get("pocazatel5Type");
        const pocazatel5SPFlag = formData.get("pocazatel5SPFlag");

        const link = formData.get("link");
        const img = formData.get("img");
        const video = formData.get("video");
        if (!id){return Response.json({"message":'Передайте id'},{status:400})}
        if (!nameRu){return Response.json({"message":'Передайте название'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер' && userSession.post !== 'Тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        let exercise;
        try{
            exercise = await Exercise.findOne({where:{id: parseInt(id)}})
            if(! exercise){return Response.json({"message":'Упражнение не найденов базе данных!'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        try {
            nameRu ? exercise.nameRu = nameRu.toString(): exercise.nameRu = null
            descriptionRu ? exercise.descriptionRu = descriptionRu.toString(): exercise.descriptionRu = null
            nameEng ? exercise.nameEng = nameEng.toString(): exercise.nameEng = null
            descriptionEng ? exercise.descriptionEng = descriptionEng.toString(): exercise.descriptionEng = null
            equipments ? exercise.equipment = equipments.toString(): exercise.equipment = null
            stage ? exercise.stage = stage.toString(): exercise.stage = null
            groupId ? exercise.groupId = parseInt(groupId): exercise.groupId = null
            link ? exercise.link = link.toString() : exercise.link = null
            musclegroups ? exercise.musclegroups = musclegroups.toString() : exercise.musclegroups = null

            pocazatel1Name ? exercise.pocazatel1Name = pocazatel1Name.toString() :  exercise.pocazatel1Name = null
            pocazatel1Type ? exercise.pocazatel1Type = pocazatel1Type.toString() : exercise.pocazatel1Type = null
            pocazatel1SPFlag ? exercise.pocazatel1SPFlag = pocazatel1SPFlag.toString() : exercise.pocazatel1SPFlag = null
            pocazatel2Name ? exercise.pocazatel2Name = pocazatel2Name.toString() : exercise.pocazatel2Name = null
            pocazatel2Type ? exercise.pocazatel2Type = pocazatel2Type.toString() : exercise.pocazatel2Type = null
            pocazatel2SPFlag ? exercise.pocazatel2SPFlag = pocazatel2SPFlag.toString() : exercise.pocazatel2SPFlag = null
            pocazatel3Name ? exercise.pocazatel3Name = pocazatel3Name.toString() : exercise.pocazatel3Name = null
            pocazatel3Type ? exercise.pocazatel3Type = pocazatel3Type.toString() : exercise.pocazatel3Type = null
            pocazatel3SPFlag ? exercise.pocazatel3SPFlag = pocazatel3SPFlag.toString() : exercise.pocazatel3SPFlag = null
            pocazatel4Name ? exercise.pocazatel4Name = pocazatel4Name.toString() : exercise.pocazatel4Name = null
            pocazatel4Type ? exercise.pocazatel4Type = pocazatel4Type.toString() : exercise.pocazatel4Type = null
            pocazatel4SPFlag ? exercise.pocazatel4SPFlag = pocazatel4SPFlag.toString() : exercise.pocazatel4SPFlag = null
            pocazatel5Name ? exercise.pocazatel5Name = pocazatel5Name.toString() : exercise.pocazatel5Name = null
            pocazatel5Type ? exercise.pocazatel5Type = pocazatel5Type.toString() : exercise.pocazatel5Type = null
            pocazatel5SPFlag ? exercise.pocazatel5SPFlag = pocazatel5SPFlag.toString() : exercise.pocazatel5SPFlag = null


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
            const fileExtension = video.name.split(".").pop();
            const format = ["mp4"];
    
            if (!format.includes(fileExtension)) {
                return Response.json({ message: 'Формат видео не поддерживается...Разрешенные форматы: ("mp4")' }, { status: 409 });
            }
    
            // Генерируем уникальное имя файла
            let fileName;
            do {
                fileName = v4() + "." + fileExtension;
                const filePath = await path.join(process.cwd(), "public/assets/", fileName);
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
                const fileData = await video.arrayBuffer();
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


