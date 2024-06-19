import UserMessageBelongChat from "@/models/UserMessageBelongChat";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";

// Функция для удаления шаблона
export async function GET(request,{params}){
    try{
        const id = params.id
        const session = cookies().get('session').value
        let user; // Достаем данные пользователя из токена
        try{
            user = decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        const messages = await UserMessageBelongChat.findAll({where :{chatId:id, isRead:false}})
         for(var i = 0; i<messages.length;i++){
            if(messages.userId != user.id){
                messages[i].isRead = true
                await messages[i].save()
            }
         }
         return Response.json({message:'ok'})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при пометки писем как прочитанные'},{status:418})}

}



