import TestGroup from "@/models/TestGroup";
import chalk from "chalk";




export const dynamic = 'force-dynamic'


// Функция возвращает все шаблоны
export async function GET(){
    try{
        return Response.json(await TestGroup.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска модели в базе даных...'},{status:500})}

}
