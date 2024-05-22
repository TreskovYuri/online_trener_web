
import chalk from 'chalk'
import Pattern from '@/models/Pattern';

export const dynamic = 'force-dynamic'

// Функция всех
export async function GET(){
    try{
        return Response.json(await Pattern.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}
