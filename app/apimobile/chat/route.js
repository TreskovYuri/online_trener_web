import Chat from "@/models/Chat";
import UserMessageBelongChat from "@/models/UserMessageBelongChat";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { headers } from "next/headers";








export const dynamic = 'force-dynamic'


export async function GET(request){
    try{
        let session;
        try {
          const headersList = headers();
          session = headersList.get("session");
        } catch (e) {
          console.log(e);
          return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
        }
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        let CHAT1; 
        try{
            CHAT1 = await Chat.findAll({where:{user1Id:userSession.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во поиска сообщений 1'},{status:500})}
        let CHAT2; // Достаем данные пользователя из токена
        try{
            CHAT2 = await Chat.findAll({where:{user2Id:userSession.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во поиска сообщений 1'},{status:500})}
        const FinalList=[]
        const Lst = [...CHAT1,...CHAT2]
        try{
            // for(var chat in Lst){
            //     const message = await UserMessageBelongChat.findOne({where:{chatId:chat.id}})
            //     FinalList.push({
            //         ...chat,
            //         'message':message
            //     })
            // }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во добавления сообщений к списку'},{status:500})}

        

        return Response.json(Lst)
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при получении списка чатов'},{status:418})}
}