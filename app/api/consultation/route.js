import Consultation from "@/models/Consultation";
import ConsultationConnection from "@/models/ConsultationConnection";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'


// Функция возвращает все шаблоны
export async function GET(){
    try{
        return Response.json(await Consultation.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}

// Функция для создания нового шаблона
export async function POST(request){
    try{
        const session = cookies().get('session').value
        const formData = await request.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const date = formData.get("date");
        const users = formData.get("users");
        if(! name || !date){return Response.json({"message":'Заполните обязательные поля!'},{status:400})}

        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}

        let arr; // Получаем массив чисел
        try{
            arr = users.split(',').map(item => parseInt(item));
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки списка пользователей'},{status:500})}
        if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию консультаций!'},{status:403})}



        let consultation
        try{
            if(date){
                consultation = await Consultation.create({ name, description, date, userId:user.id });
            }else{
                consultation = await Consultation.create({ name, description, userId:user.id });
            }
            
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в базе данных'},{status:500})}

        for (let i = 0; i < arr.length; i++) {
            try{
                ConsultationConnection.create({userId:arr[i],consultationId:consultation.id})
            }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки списка пользователей'},{status:500})}
        }


        return Response.json(consultation)

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании шаблона'},{status:418})}

}