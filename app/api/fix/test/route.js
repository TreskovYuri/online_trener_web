import FixTests from "@/models/FixtTest";
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

        return Response.json(await FixTests.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ошибка ошибка...'},{status:418})}}