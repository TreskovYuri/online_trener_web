import Chat from "@/models/Chat";
import UsersBelongChats from "@/models/UsersBelongChats";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies} from "next/headers";




export const dynamic = 'force-dynamic'


// Функция возвращает все фиксации обратившегося спортсмена
export async function GET(){
    try{
        const session = cookies().get('session').value
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        let chats;
        try{
            chats = await UsersBelongChats.findAll({where:{userId:user.id}})

        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время получения списка связей пользователя с чатами'},{status:500})}
        let finalChats;
        try{
            for (let i = 0; i < finalChats.length; i++){
                finalChats.add({
                    'chat':await Chat.findOne({where:{id:finalChats[i].chatId}}),
                    'users': await UsersBelongChats.findAll({where:{chatId:finalChats[i].chatId}})
                })
            }
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время формирования финального списка чатов'},{status:500})}
        return Response.json(finalChats)
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ошибка...'},{status:418})}}



// Функция для создания нового чата
export async function POST(request){
    try{
        const session = cookies().get('session').value
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
                await UsersBelongChats.create({chatId:chat.id,userId:users[i]?.id||0})
            }
        }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время создания связей пользователей с чатом'},{status:500})}

        return Response.json({message:'ok'});
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ошибка...'},{status:418})}}