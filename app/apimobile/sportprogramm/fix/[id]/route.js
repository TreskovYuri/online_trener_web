import chalk from 'chalk'
import { headers } from 'next/headers';
import { decrypt } from '@/service/UserService';
import FixSportprogramm from '@/models/FixSportprogramm';


export const dynamic = 'force-dynamic'



export async function GET(req,{params}){
    try{
        let session;
    try {
      const headersList = headers()
      session = headersList.get('session')
    } catch (e) {
      console.log(e);
      return Response.json({ message: "Ошибка во время получения сессии" }, { status: 401 });
    }
    const programmId = params.id;

    return Response.json(await FixSportprogramm.findAll({where:{programmId}}))
    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании программы'},{status:418})}
}