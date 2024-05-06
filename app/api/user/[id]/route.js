import User from "@/models/User"
import chalk from 'chalk'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"


export const dynamic = 'force-dynamic'


// Функция для обновления данных пользователя 
export async function DELETE(req,{params}){
    try{
        const session = cookies().get('session').value

        if (!params.id ){return Response.json({"message":'Передайте id'},{status:400})}
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if(userSession.post != 'Тренер' && userSession.post != 'Супер тренер'){return Response.json({"message":'У вас нет доступа для редактирования профилей.'},{status:400})}
        let user; 
        try {
            user = await User.findOne({where: {id:params.id }})
            if(!user){return Response.json({"message":'Пользователь не найден...'},{status:404})}
        } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при поске пользователя в базе данных..." }, { status: 500 });}
        try {
            await user.destroy()
          } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при примвоении новых данных агенства..." }, { status: 500 });}

         
        return Response.json({message:"ok"})
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при удалении пользователя'},{status:418})}

}
