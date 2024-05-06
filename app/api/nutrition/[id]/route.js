import Pattern from "@/models/Pattern";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";


// Функция для удаления шаблона
export async function DELETE(request,{params}){
    try{
        const session = cookies().get('session').value
        const id = params.id
        

        if(!id ){return Response.json({"message":'Передайте id!'},{status:400})}
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
        let pattern
        try{
            pattern = await Pattern.destroy({where  : { id }});
            if(!pattern ){return Response.json({"message":'Шаблон не удален!'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}
        return Response.json({message:'ok'})

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при удалении шаблона'},{status:418})}

}