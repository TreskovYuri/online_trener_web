import UserMessageBelongChat from "@/models/UserMessageBelongChat";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";
import { Op } from "sequelize";

// Функция для удаления шаблона
export async function GET(){
    try{
        const session = cookies().get('session').value
        let user; // Достаем данные пользователя из токена
        try{
            user = decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        const messages = await UserMessageBelongChat.findAll({where :{isRead:false ,userId: {[Op.ne]: user.id}}})
         return Response.json({length:messages.length})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при пометки писем как прочитанные'},{status:418})}

}



