import User from "@/models/User"
import {isEmail} from 'validator'
import chalk from 'chalk'
import UserDto from "@/dtos/user-dto"
import mailService from "@/service/MailService"
import { encryptSecret } from "@/utils/crypto"
import generatePassword from "@/utils/generatePassword"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import { writeFile } from "fs/promises";
import fs from 'fs'
import {v4} from 'uuid'
import path from "path";
import Exercise from "@/models/Exercise"

export const dynamic = 'force-dynamic'

// // Функция возвращает одного пользователя
// export async function GET(){
//     try{
//         return Response.json(await Exercise.findAll());
//     }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

// }

// Функция для создания нового пользователя 
export async function DELETE(req,{params}){
    try{
        const session = cookies().get('session').value
        const id = params.id

        if (!id){return Response.json({"message":'Передайте id'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post !== 'Супер тренер' ?? гserSession.post !== 'Тренер '){return Response.json({"message":'Не валидная должность'},{status:400})}
        let exercise;
        try{
            exercise = await Exercise.findOne({where:{id}})
            if( !exercise){return Response.json({"message":'Упражнение не найдено в базе данных'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        if (exercise.img) {
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
        }
        if (exercise.video) {
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
    
        }
        try{
            await exercise.destroy()
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}

        return Response.json({message:'Ok'})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}

