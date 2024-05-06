
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { decryptSecret } from "@/utils/crypto"


export const dynamic = 'force-dynamic'


const key = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)



export async function encrypt(payload){
    return await new SignJWT(payload)
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime('15 day from now')
    .sign(key)
    
}


export async function decrypt(input){
    const {payload} = await jwtVerify(input,key,{
        algorithms:['HS256']
    })
    return payload
}

export async function updateSession(session){

    try {
        const parsed = await decrypt(session);
        const newT = await encrypt(parsed)
        // const expires = new Date(Date.now() + parseInt(process.env.NEXT_PUBLIC_EXPIRES));
        // cookies().set('session', Token, {expires:expires, httpOnly:true})
        return newT
    } catch (error) {
        console.error('Ошибка обновления сессии:', error);
        return false 
    }
}


export async function validateSession(session) {
    if (!session) {
        return false; // Сессия не найдена
    }

    try {
        const parsed = await decrypt(session);

        if(parsed){
            const expirationDate = new Date(parseInt(parsed.exp)* 1000);
            const currentTime = new Date();
            console.log(expirationDate)
            console.log(currentTime)

    
            if (expirationDate < currentTime) {
                console.log('<======================  Сессия истека!!!!!!!!!!!!!!!!!')
                console.log(expirationDate)
                console.log(currentTime)
                return false; // Сессия истекла
            }
            console.log('<======================  Проверка секрета!!!!!!!!!!!!!!!!!')
            // console.log(parsed.secret)
            // console.log(await decryptSecret(parsed.secret))
            if(await decryptSecret(parsed.secret)  === parsed.email){
                console.log('<======================  Секрет верный!!!!!!!!!!!!!!!!!')
                return true; // Сессия действительна
            }else{
                console.log('<======================  Секрет не верный!!!!!!!!!!!!!!!!!')
                return false
            }
            
        }

    } catch (error) {
        console.error('Ошибка валидации сессии:', error);
        return false; // Ошибка валидации сессии
    }
}


export async function getSession(){
    const session = cookies.get('refreshToken')?.value
    if(!session){return null}
    return await decrypt(session)
}