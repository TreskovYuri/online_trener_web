
import chalk from 'chalk'
import { cookies } from "next/headers";
// import tokenService from "@/service/token-service"

// Функция для создания нового пользователя 
export async function GET(){
    try{
        cookies().delete('session')
        return Response.json({message:'Вы вышли из системы...'})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}

}
