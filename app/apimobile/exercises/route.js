
import chalk from 'chalk'
import Exercise from "@/models/Exercise"

export const dynamic = 'force-dynamic'

// Функция возвращает одного 
export async function GET(){
    try{
        return Response.json(await Exercise.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}
