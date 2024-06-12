import ExerciseComment from "@/models/ExerciseComment";
import chalk from "chalk";
// import { cookies } from "next/headers";


export const dynamic = "force-dynamic";

// Функция возвращает список всех комментариев к спортивным программам
export async function GET(){
    try{
        return Response.json(await ExerciseComment.findAll());
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ошибка...'},{status:418})}

}


export async function POST(req){
    try{
        // const session = cookies().get('session').value
        const formData = await req.formData();
        const commentatorId =  parseInt(formData.get("commentatorId"));
        const exerciseBelongId =  parseInt(formData.get("exerciseBelongId"));
        const message = formData.get("message");
        let comment;
        try{
            comment = await ExerciseComment.create({commentatorId,exerciseBelongId,message})
        }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла ошибка при создании записи в БД'},{status:500})}
        return Response.json(comment)
    }catch(err){console.log(chalk.red(err)); return Response.json({"message":'Возникла непредвиденная ощибка...'},{status:418})}
}