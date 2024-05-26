import Chat from "@/models/Chat";
import UserMessageBelongChat from "@/models/UserMessageBelongChat";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { headers } from "next/headers";








export const dynamic = 'force-dynamic'


export async function GET(request,{params}){
    try{
        let session;
        try {
          const headersList = headers();
          session = headersList.get("session");
        } catch (e) {
          console.log(e);
          return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
        }
        const id = params.id;
        if (!id){return Response.json({"message":'Передайте id'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        let chat1; // Достаем данные пользователя из токена
        let chat2; // Достаем данные пользователя из токена
        try{
          chat1 = await Chat.findOne({where:{user1Id:userSession.id, user2Id:id}})
          chat2 = await Chat.findOne({where:{user2Id:userSession.id, user1Id:id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время поиска чата'},{status:500})}
        let chat;
        if(!chat1 && ! chat2){
          try{
            chat = await Chat.create({user1Id:userSession.id, user2Id:id})
          }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания'},{status:500})}
        }else if(chat1){chat = chat1}else if(chat2){chat = chat2}

        return Response.json(chat)
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}
}

export async function POST(request,{params}){
    try{
        let session;
        try {
          const headersList = headers();
          session = headersList.get("session");
        } catch (e) {
          console.log(e);
          return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
        }
        const formData = await req.formData();
        const message = formData.get("message");
        const id = params.id;
        if (!id){return Response.json({"message":'Передайте id'},{status:400})}
        if (!session){return Response.json({"message":'Токен не обнаружен'},{status:401})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        let neWmessage; 
        try{
            neWmessage = await UserMessageBelongChat.create({chatId:id, userId:userSession.id,message:message})
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}

        return Response.json(neWmessage)
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}
}