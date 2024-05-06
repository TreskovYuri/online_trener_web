import User from "@/models/User"
import {isEmail} from 'validator'
import chalk from 'chalk'
import bcrypt from 'bcrypt'
import UserDto from "@/dtos/user-dto"

import { encrypt } from "@/service/UserService"
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'




// Функция для создания нового пользователя 
export async function POST(req){
    try{
        const formData = await req.formData();
        const email = formData.get("email");
        const password = formData.get("password");
        if (!email || !isEmail(email)){return new NextResponse(JSON.stringify({"message":'Не корректный email'}), {headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json'},status: 400});}
        if (!password ){ return Response.json({"message":'Передайте пароль'},{status:400})}

        let user;
        try{
            user = await User.findOne({where:{email}})
            if(!user){return Response.json({"message":'Такого пользователя не существует...'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при поиске пользователя в базе данных...'},{status:400})}

        // Стравниваем пароли
        let isPassEquals;
        try{
            isPassEquals = await bcrypt.compare(password, user.password);
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при сравниваниии паролей'},{status:500})}
        // Если пароли не совпали
        if (!isPassEquals) { return Response.json({"message":'Неверный пароль'},{status:400})}
        let userDto;
        try{
            // Убираем чувствительную информацию
            userDto = new UserDto(user)
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время фильтрации чувствительных полей...'},{status:500})}

        // Генерируетм токен
        let Token;
        const expires = new Date(Date.now())
        try{
            Token = await encrypt({...userDto,expires})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время генерации новой пары токенов'},{status:500})}
        try{
            cookies().set('session', Token, {expires:new Date(Date.now() + parseInt(process.env.NEXT_PUBLIC_EXPIRES)), httpOnly:true})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при установке cookie'},{status:500})}

        return Response.json({...userDto,'session':Token})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при авторизации пользователя'},{status:418})}

}
