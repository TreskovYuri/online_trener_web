import chalk from 'chalk'
import FixSportprogramm from '@/models/FixSportprogramm';


export const dynamic = 'force-dynamic'



export async function GET(req){
    try{
    return Response.json(await FixSportprogramm.findAll())
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании программы'},{status:418})}
}