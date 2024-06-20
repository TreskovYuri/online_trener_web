import Chat from "@/models/Chat";
import User from "@/models/User";
import UserMessageBelongChat from "@/models/UserMessageBelongChat";
import UsersBelongChats from "@/models/UsersBelongChats";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import {  headers} from "next/headers";




export const dynamic = 'force-dynamic'


// Функция возвращает все фиксации обратившегося спортсмена
export async function GET(){
    try{
        let session;
        try {
          const headersList = headers();
          session = headersList.get("session");
        } catch (e) {
          console.log(e);
          return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
        }
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        let allBelongUsers = [];
        try{
            allBelongUsers = await UsersBelongChats.findAll({order: [['updatedAt', 'DESC']] })
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время получения списка всех связей пользователей с чатами'},{status:500})}
        
        let myChats = [];
        try{
            myChats = allBelongUsers.filter(el => el.userId === user.id)
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время получения списка связей пользователя с чатами'},{status:500})}
        let allChats = [];
        try{
            allChats = await Chat.findAll({order: [['updatedAt', 'DESC']] })
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время получения списка всех чатов'},{status:500})}
        let allUsers = [];
        try{
            allUsers = await User.findAll({order: [['updatedAt', 'DESC']] })
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время получения списка всех пользователей'},{status:500})}
        
        let allMessages = [];
        try{
            allMessages = await UserMessageBelongChat.findAll({order: [['updatedAt', 'DESC']] })
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время получения списка всех пользователей'},{status:500})}
        
        const finalChats= [];
        try{
            for (let i = 0; i < myChats.length; i++){
                const mc = myChats[i]
                finalChats.push({
                    chat:  allChats.find(el => el.id == mc.chatId),
                    users:  allBelongUsers.filter((belong) => belong.chatId === mc.chatId).map(belong => allUsers.find(user => user.id === belong.userId)),
                    lastMessage: allMessages.find((message) => message.chatId === mc.chatId),
                    unRead :allMessages.filter((message) => message.chatId === mc.chatId && message.isRead === false && message.userId != user.id).length
                },
                )
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время формирования финального списка чатов'},{status:500})}
        return Response.json(finalChats)
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ошибка...'},{status:418})}}



// Функция для создания нового чата
export async function POST(request){
    try{
        let session;
        try {
          const headersList = headers();
          session = headersList.get("session");
        } catch (e) {
          console.log(e);
          return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
        }
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        const formData = await request.formData();
        const name = formData.get("name");
        const messageOnlyI = formData.get("messageOnlyI");
        const users = JSON.parse(formData.get("users"));
        let chat;
        try{
            chat = await Chat.create({name,messageOnlyI,isGroup:users.length>1,userId:user.id})
        }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время создания чата'},{status:500})}
        try{
            await UsersBelongChats.create({chatId:chat.id,userId:user.id})
            for (let i = 0; i < users.length; i++){
                await UsersBelongChats.create({chatId:chat.id,userId:users[i].id})
            }
        }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время создания связей пользователей с чатом'},{status:500})}

        return Response.json({message:'ok'});
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ошибка...'},{status:418})}}