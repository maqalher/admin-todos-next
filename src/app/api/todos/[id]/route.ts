import { getUserSessionServer } from '@/app/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request,{params}: Segments) { 
    //   console.log({segments});

    const user = await getUserSessionServer()
    if(!user) {
        return null
    }

    const {id} = params
    const todo = await prisma.todo.findFirst({where:{id}})

    if(!todo){
        return NextResponse.json({message: `Todo con id ${id} no existe`}, {status: 404})
    }

    if(todo.userId !== user.id){
        return null
    }

    return NextResponse.json(todo)
}

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional()
})

export async function PUT(request: Request,{params}: Segments) { 

    const user = await getUserSessionServer()
    if(!user) {
        return null
    }

    const {id} = params
    const todo = await prisma.todo.findFirst({where:{id}})

    if(!todo){
        return NextResponse.json({message: `Todo con id ${id} no existe`}, {status: 404})
    }

    if(todo.userId !== user.id){
        return null
    }

    try {
        const {description,complete} = await putSchema.validate(await request.json())

        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: {description,complete}
        })

        return NextResponse.json(updatedTodo)
    } catch (error) {
        return NextResponse.json(error, {status:400})
    }
    
}