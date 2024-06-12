
import chalk from 'chalk'
import { headers } from 'next/headers';
import { decrypt } from '@/service/UserService';
import FixSportprogramm from '@/models/FixSportprogramm';


export const dynamic = 'force-dynamic'



export async function POST(req){
    try{
        let session;
    try {
      const headersList = headers()
      session = headersList.get('session')
    } catch (e) {
      console.log(e);
      return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
    }
        const formData = await req.formData();
        const exerciseId = parseInt(formData.get("exerciseId"));
        const sets = formData.get("sets");
        const programmId = parseInt(formData.get("programmId"));
        const userId = parseInt(formData.get("userId"));
        const setId = parseInt(formData.get("setId"));
        const date = formData.get("date");
        let userSession; // Достаем данные пользователя из токена
        try{
            userSession = await decrypt(session)
            if(! userSession){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        let fixProgramm;
        try{
            fixProgramm = await FixSportprogramm.create({exerciseId,programmId,userId,setId,sets, date})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в базе данных'},{status:500})}

        return Response.json(fixProgramm)
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании программы'},{status:418})}
}