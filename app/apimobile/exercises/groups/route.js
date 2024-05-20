
import chalk from 'chalk'
import ExerciseGroups from '@/models/ExerciseGroups';

export const dynamic = 'force-dynamic'

export async function GET(){
    try{
        return Response.json(await ExerciseGroups.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}
