
import TestBelongProgramm from "@/models/TestBelongProgramm";
import chalk from "chalk";



// Функция возвращает одного 
export async function GET(){
    try{
        return Response.json(await TestBelongProgramm.findAll({order: [['updatedAt', 'DESC']] }));
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}


