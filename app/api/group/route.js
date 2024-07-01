import TestGroup from "@/models/TestGroup";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";



export const dynamic = 'force-dynamic'


// Функция возвращает все шаблоны
export async function GET(){
    try{
        return Response.json(await TestGroup.findAll({order: [['updatedAt', 'DESC']] }));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска модели в базе даных...'},{status:500})}

}

// Функция для создания нового шаблона
export async function POST(request){
    try{
        const session = cookies().get('session').value
        const formData = await request.formData();
        const userId = formData.get("userId");
        const name = formData.get("name");



        if(!name || !userId){return Response.json({"message":'Заполните обязатьельные поля!'},{status:400})}
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if( user.post !== 'Тренер' && user.post !== 'Супер тренер'  ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
        let group;
        try{
            group = await TestGroup.create({ name, userId });
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}

        return Response.json(group)

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании шаблона'},{status:418})}
}