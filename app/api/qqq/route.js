import User from "@/models/User"
import {isEmail} from 'validator'
import chalk from 'chalk'
import UserDto from "@/dtos/user-dto"
import mailService from "@/service/MailService"
import { encryptSecret } from "@/utils/crypto"
import generatePassword from "@/utils/generatePassword"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";
import { decrypt } from "@/service/UserService"
import { writeFile } from "fs/promises";
import fs from 'fs'
import {v4} from 'uuid'
import path from "path";

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