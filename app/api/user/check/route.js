
import chalk from 'chalk'
import { decrypt, encrypt, validateSession } from "@/service/UserService"
import { cookies } from "next/headers";
import UserDto from '@/dtos/user-dto';
import User from '@/models/User';

export const dynamic = 'force-dynamic'

export async function GET(){
    try{
        const session = cookies().get('session').value
        if(!session || !validateSession(session) ){return Response.json({"message":'Сессия не действительна'},{status:401})}
        let user;
        try{
            user = await decrypt(session)
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}
        if(!user){return Response.json({"message":'Сессия не действительна'},{status:401})}
        let dbUser;
        try{
            dbUser = await User.findOne({where : {id : user.id}})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время отправки письма для подтверждения'},{status:500})}
        if(!dbUser){return Response.json({"message":'Сессия не действительна'},{status:401})}

        let userDto;
        try{
            // Убираем чувствительную информацию
            userDto = new UserDto(dbUser)
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время фильтрации чувствительных полей...'},{status:500})}

        // Генерируетм токен
        let Token;
        const expires = new Date(Date.now())
        try{
            Token = await encrypt({...userDto,expires})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка во время генерации новой пары токенов'},{status:500})}

        try{
            cookies().set('session', Token, {expires:new Date(Date.now() + parseInt(process.env.NEXT_PUBLIC_EXPIRES)), httpOnly:true})
        }catch(err){console.log(chalk.red(err));return Response.json({"message":'Возникла ошибка при установке cookie'},{status:400})}
        return Response.json(userDto)
    }catch(err){Response.json({"message":'Возникла ошибка во время поиска пользователя в базе даных...'},{status:500});console.log(chalk.red(err))}

}