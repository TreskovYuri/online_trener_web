import User from "@/models/User"
import chalk from 'chalk'
import UserDto from "@/dtos/user-dto"

export const dynamic = 'force-dynamic'

// Функция возвращает одного пользователя
export async function GET(){
    try {
        const users = await User.findAll();
        const usersDto = users.map(user => new UserDto(user));
        return Response.json(usersDto)
    } catch (err) {
        console.log(chalk.red(err));
        return Response.json({"message":'Возникла ошибка во время поиска пользователя в базе данных...'},{status:418})
    }
}
