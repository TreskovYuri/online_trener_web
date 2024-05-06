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

export const dynamic = 'force-dynamic'

// Функция возвращает одного пользователя
export async function GET(){
    try {
        const users = await User.findAll();
        const usersDto = users.map(user => new UserDto(user));
        return Response.json(usersDto)
    } catch (err) {
        console.log(chalk.red(err));
        return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе данных...'},{status:418})
    }
}

// Функция для создания нового пользователя 
export async function POST(req){
    try{
        const formData = await req.formData();
        const email = formData.get("email");
        const post = formData.get("post");
        const trenerId = formData.get("trenerId");
        if (!post || !isEmail(email)){return Response.json({"message":'Не корректный email'},{status:400})}
        if (!post){return Response.json({"message":'Передайте роль'},{status:400})}
        if(post !== 'Спортсмен' && post !== 'Тренер' && post !== 'Супер тренер'){return Response.json({"message":'Не валидная должность'},{status:400})}
        try{
            const candidate = await User.findOne({where:{email}})
            if(candidate){return Response.json({"message":'Такой пользователь уже существует...'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при поиске пользователя в базе данных...'},{status:400});}
        const newPassword = generatePassword(5)
        let hashPassword;
        try{
            hashPassword = await bcrypt.hash(newPassword.toString(), 2);
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время хеширования пароля'},{status:500})}
        let user;
        let secret;
        try{
            secret = await encryptSecret(email)
            // Если цикл завершился, значит у нас уникальный секрет, создаем пользователя
            
            user = await User.create({ email:email,password:hashPassword, secret: secret, post:post, trenerId:trenerId ? parseInt(trenerId) : null});
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}
        try{
            await mailService.sendRegistrationUser(email, newPassword);
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}
        return Response.json(new UserDto(user))
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
