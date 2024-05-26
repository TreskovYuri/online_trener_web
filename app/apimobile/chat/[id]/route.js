
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
        let messages;
        try{
          messages = await UserMessageBelongChat.findAll({where:{chatId:parseInt(id)}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время получения или создания чата'},{status:500})}

        return Response.json(messages)
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании пользователя'},{status:418})}
}


export async function POST(request,{params}){
  try{
      const formData = await request.formData();
      const message = formData.get("message");
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
      let messageSave; // Достаем данные пользователя из токена
      try{
        messageSave = await UserMessageBelongChat.create({chatId:parseInt(id),userId:parseInt(userSession.id),message:message.toString()})
          if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
      }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время сохранения сообщения'},{status:500})}
      return Response.json(messageSave)
  }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при сохрагнении сообщения'},{status:418})}
}