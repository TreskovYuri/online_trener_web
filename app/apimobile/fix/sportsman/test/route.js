import FixTests from "@/models/FixtTest";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { headers } from "next/headers";







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

        return Response.json(await FixTests.findAll({where:{sportsmanId:user.id}}));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ошибка ошибка...'},{status:418})}
}

export async function POST(request){
    try{
        const formData = await request.formData();
        const testId = parseInt(formData.get("testId"));
        const programmId = parseInt(formData.get("programmId"));
        const result = parseInt(formData.get("result"));
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
        let fix; // Достаем данные пользователя из токена
        try{
            fix = await FixTests.create({sportsmanId:user.id, testId:testId,result:result, programmId:programmId})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи о фиксации в БД'},{status:500})}

        return Response.json(fix);
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденна ошибка...'},{status:418})}
}

