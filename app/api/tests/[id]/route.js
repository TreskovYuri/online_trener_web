import Test from "@/models/Test";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";



export const dynamic = 'force-dynamic'


// // Функция возвращает все шаблоны
// export async function GET(){
//     try{
//         return Response.json(await Test.findAll());
//     }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска модели в базе даных...'},{status:500})}

// }


// // Функция для создания нового шаблона
// export async function POST(request){
//     try{
//         const session = cookies().get('session').value
//         const formData = await request.formData();
//         const userId = formData.get("userId");
//         const name = formData.get("name");
//         const description = formData.get("description");
//         const type = formData.get("type");
//         const item = formData.get("item");
//         const groupId = formData.get("groupId");



//         if(!name || !userId || !groupId){return Response.json({"message":'Заполните обязатьельные поля!'},{status:400})}
//         let user; // Достаем данные пользователя из токена
//         try{
//             user = await decrypt(session)
//             if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
//         }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
//         if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
//         let group;
//         try{
//             group = await Test.create({ name, userId , groupId});
//         }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}
//         try{
//             type ? group.type = type : null
//             item ? group.item = item : null
//             description ? group.description = description : null
//             group.save()
//         }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время добавления новых полей в модель'},{status:500})}

//         return Response.json(group)

//     }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании шаблона'},{status:418})}
// }


// // Функция для создания нового шаблона
// export async function PUT(request){
//     try{
//         const session = cookies().get('session').value
//         const formData = await request.formData();
//         const id = formData.get("id");
//         const userId = formData.get("userId");
//         const name = formData.get("name");
//         const description = formData.get("description");
//         const type = formData.get("type");
//         const item = formData.get("item");
//         const groupId = formData.get("groupId");



//         if(!name || !userId || !groupId){return Response.json({"message":'Заполните обязатьельные поля!'},{status:400})}
//         let user; // Достаем данные пользователя из токена
//         try{
//             user = await decrypt(session)
//             if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
//         }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
//         if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
//         let group;
//         try{
//             group = await Test.findOne({ id});
//             if (!group){return Response.json({"message":'Модель не найдена в базе данных'},{status:404})}
//         }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}
//         try{
//             name && name != 111 ? group.name = name : null
//             name == 111 ? group.name = null: null
//             type && type != 111 ? group.type = type : null
//             type == 111 ? group.type = null: null
//             item && item != 111 ? group.item = item : null
//             item == 111 ? group.item = null: null
//             description && description != 111 ? group.description = description : null
//             description == 111 ? group.description = null: null
//             groupId && groupId != 'none' ? group.groupId = groupId : null
//             groupId == 'none' ? group.groupId = null: null
//             group.save()
//         }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время добавления новых полей в модель'},{status:500})}

//         return Response.json(group)

//     }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании шаблона'},{status:418})}
// }


// Функция для удаления шаблона
export async function DELETE(request,{params}){
    try{
        const session = cookies().get('session').value
        const id = params.id;
        

        if(!id ){return Response.json({"message":'Передайте id!'},{status:400})}
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
        let test
        try{
            test = await Test.destroy({where  : { id }});
            if(!test ){return Response.json({"message":'Шаблон не удален!'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}
        return Response.json({message:'ok'})

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при удалении шаблона'},{status:418})}

}