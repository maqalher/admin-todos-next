'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const toogleTodo = async(id:string, complete: boolean): Promise<Todo> => {

    const todo = await prisma.todo.findFirst({where:{id}})

    if(!todo){
        throw `Todo con id ${id} no encontrado`
    }

    const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {complete}
    })

    // refrescar
    revalidatePath('/dashboard/server-todos')
    return updatedTodo
}


export const addTodo = async(description:string) => {
    try{    
        const todo = await prisma.todo.create({data:{description}})
        // refrescar
        revalidatePath('/dashboard/server-todos')
        return todo
    }catch(error){
        return {
            message: 'Error creando todo'
        }
    }
}

export const deleteTodo = async():Promise<void> => {
    try{
        await prisma.todo.deleteMany({where: {complete:true}})
        revalidatePath('/dashboard/server-todos')
    }catch(error){
        console.log(error);
    }
}