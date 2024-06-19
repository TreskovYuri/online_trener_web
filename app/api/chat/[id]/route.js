import UserMessageBelongChat from "@/models/UserMessageBelongChat";
import chalk from "chalk";



// Функция для удаления шаблона
export async function GET(request,{params}){
    try{
        const id = params.id

        return Response.json(await UserMessageBelongChat.findAll({where :{chatId:id}}))

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при удалении шаблона'},{status:418})}

}
