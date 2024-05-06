import Pattern from "@/models/Pattern";
import { decrypt } from "@/service/UserService";
import chalk from "chalk";
import { cookies } from "next/headers";



export const dynamic = 'force-dynamic'


// Функция возвращает все шаблоны
export async function GET(){
    try{
        return Response.json(await Pattern.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500})}

}


// Функция для создания нового шаблона
export async function POST(request){
    try{
        const session = cookies().get('session').value
        const formData = await request.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const recomendation = formData.get("recomendation");

        const name1 = formData.get("name1");
        const description1 = formData.get("description1");
        const name2 = formData.get("name2");
        const description2 = formData.get("description2");
        const name3 = formData.get("name3");
        const description3 = formData.get("description3");
        const name4 = formData.get("name4");
        const description4 = formData.get("description4");
        const name5 = formData.get("name5");
        const description5 = formData.get("description5");
        const name6 = formData.get("name6");
        const description6 = formData.get("description6");
        const name7 = formData.get("name7");
        const description7 = formData.get("description7");


        if(!name || !description){return Response.json({"message":'Заполните обязатьельные поля!'},{status:400})}
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
        let pattern
        try{
            pattern = await Pattern.create({ name, description, userId:user.id });
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}
        try {
            recomendation && recomendation != 111 ? pattern.recomendation = recomendation.toString() : null
            recomendation == 111  ? pattern.recomendation = '' : null
            name1 && name1 != 111 ? pattern.name1 = name1.toString() : null
            name1 == 111  ? pattern.name1 = '' : null
            description1 && description1 != 111 ? pattern.description1 = description1.toString() : null
            description1 == 111  ? pattern.description1 = '' : null
            name2 && name2 != 111 ? pattern.name2 = name2.toString() : null
            name2 == 111  ? pattern.name2 = '' : null
            description2 && description2 != 111 ? pattern.description2 = description2.toString() : null
            description2 == 111  ? pattern.description2 = '' : null
            name3 && name3 != 111 ? pattern.name3 = name3.toString() : null
            name3 == 111  ? pattern.name3 = '' : null
            description3 && description3 != 111 ? pattern.description3 = description3.toString() : null
            description3 == 111  ? pattern.description3 = '' : null
            name4 && name4 != 111 ? pattern.name4 = name4.toString() : null
            name4 == 111  ? pattern.name4 = '' : null
            description4 && description4 != 111 ? pattern.description4 = description4.toString() : null
            description4 == 111  ? pattern.description4 = '' : null
            name5 && name5 != 111 ? pattern.name5 = name5.toString() : null
            name5 == 111  ? pattern.name5 = '' : null
            description5 && description5 != 111 ? pattern.description5 = description5.toString() : null
            description5 == 111  ? pattern.description5 = '' : null
            name6 && name6 != 111 ? pattern.name6 = name6.toString() : null
            name6 == 111  ? pattern.name6 = '' : null
            description6 && description6 != 111 ? pattern.description6 = description6.toString() : null
            description6 == 111  ? pattern.description6 = '' : null
            name7 && name7 != 111 ? pattern.name7 = name7.toString() : null
            name7 == 111  ? pattern.name7 = '' : null
            description7 && description7 != 111 ? pattern.description7 = description7.toString() : null
            description7 == 111  ? pattern.description7 = '' : null
      
          } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при примвоении новых данных агенства..." }, { status: 500 });}

        // Сохраняем обновленную модель в базе данных
        try {
            await pattern.save();
        } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при сохранении новой модели в базу данных" }, { status: 500 });}
        return Response.json(pattern)

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при создании шаблона'},{status:418})}

}
// Функция для создания нового шаблона
export async function PUT(request){
    try{
        const session = cookies().get('session').value
        const formData = await request.formData();
        const id = formData.get("id");
        const name = formData.get("name");
        const description = formData.get("description");
        const recomendation = formData.get("recomendation");

        const name1 = formData.get("name1");
        const description1 = formData.get("description1");
        const name2 = formData.get("name2");
        const description2 = formData.get("description2");
        const name3 = formData.get("name3");
        const description3 = formData.get("description3");
        const name4 = formData.get("name4");
        const description4 = formData.get("description4");
        const name5 = formData.get("name5");
        const description5 = formData.get("description5");
        const name6 = formData.get("name6");
        const description6 = formData.get("description6");
        const name7 = formData.get("name7");
        const description7 = formData.get("description7");


        if(!id ){return Response.json({"message":'Передайте id!'},{status:400})}
        if(!name || !description){return Response.json({"message":'Заполните обязатьельные поля!'},{status:400})}
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
        let pattern
        try{
            pattern = await Pattern.findOne({where  : { id }});
            if(!pattern ){return Response.json({"message":'Шаблон не найден!'},{status:400})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}
        try {
            name && name != 111 ? pattern.name = name.toString() : null
            name == 111  ? pattern.name = '' : null
            description && description != 111 ? pattern.description = description.toString() : null
            description == 111  ? pattern.description = '' : null
            recomendation && recomendation != 111 ? pattern.recomendation = recomendation.toString() : null
            recomendation == 111  ? pattern.recomendation = '' : null
            name1 && name1 != 111 ? pattern.name1 = name1.toString() : null
            name1 == 111  ? pattern.name1 = '' : null
            description1 && description1 != 111 ? pattern.description1 = description1.toString() : null
            description1 == 111  ? pattern.description1 = '' : null
            name2 && name2 != 111 ? pattern.name2 = name2.toString() : null
            name2 == 111  ? pattern.name2 = '' : null
            description2 && description2 != 111 ? pattern.description2 = description2.toString() : null
            description2 == 111  ? pattern.description2 = '' : null
            name3 && name3 != 111 ? pattern.name3 = name3.toString() : null
            name3 == 111  ? pattern.name3 = '' : null
            description3 && description3 != 111 ? pattern.description3 = description3.toString() : null
            description3 == 111  ? pattern.description3 = '' : null
            name4 && name4 != 111 ? pattern.name4 = name4.toString() : null
            name4 == 111  ? pattern.name4 = '' : null
            description4 && description4 != 111 ? pattern.description4 = description4.toString() : null
            description4 == 111  ? pattern.description4 = '' : null
            name5 && name5 != 111 ? pattern.name5 = name5.toString() : null
            name5 == 111  ? pattern.name5 = '' : null
            description5 && description5 != 111 ? pattern.description5 = description5.toString() : null
            description5 == 111  ? pattern.description5 = '' : null
            name6 && name6 != 111 ? pattern.name6 = name6.toString() : null
            name6 == 111  ? pattern.name6 = '' : null
            description6 && description6 != 111 ? pattern.description6 = description6.toString() : null
            description6 == 111  ? pattern.description6 = '' : null
            name7 && name7 != 111 ? pattern.name7 = name7.toString() : null
            name7 == 111  ? pattern.name7 = '' : null
            description7 && description7 != 111 ? pattern.description7 = description7.toString() : null
            description7 == 111  ? pattern.description7 = '' : null
      
          } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при примвоении новых данных агенства..." }, { status: 500 });}

        // Сохраняем обновленную модель в базе данных
        try {
            await pattern.save();
        } catch (err) {console.log(chalk.red(err));return Response.json({ message: "Ошибка при сохранении новой модели в базу данных" }, { status: 500 });}
        return Response.json(pattern)

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при обновлении шаблона'},{status:418})}

}
// Функция для удаления шаблона
export async function DELETE(request){
    try{
        const session = cookies().get('session').value
        const formData = await request.formData();
        const id = formData.get("id");
        

        if(!id ){return Response.json({"message":'Передайте id!'},{status:400})}
        let user; // Достаем данные пользователя из токена
        try{
            user = await decrypt(session)
            if(! user){return Response.json({"message":'Не удалось расшифровать токен, доступ запрещен!'},{status:403})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время расшифровки токена'},{status:500})}
        if( user.post !== 'Тренер' && user.post !== 'Супер тренер' ){return Response.json({"message":'У вас нет доступа к созданию шаблонов!'},{status:403})}
        let pattern
        try{
            pattern = await Pattern.destroy({where  : { id }});
            if(!pattern ){return Response.json({"message":'Шаблон не удален!'},{status:404})}
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время создания записи в бахе данных'},{status:500})}
        return Response.json({message:'ok'})

    }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла непредвиденная ошибка при удалении шаблона'},{status:418})}

}