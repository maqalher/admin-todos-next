import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

  // await prisma.todo.deleteMany({where: {complete: true}}) // delete * from todo
  await prisma.todo.deleteMany() // delete * from todo
  await prisma.user.deleteMany() // delete * from todo

  const user = await prisma.user.create({
    data: {
      email: 'test@google.com',
      password: bcrypt.hashSync('123456789'),
      roles: ['admin','client','super-user'],
      todos: {
        create: [
          {description: 'Piedra del alma', complete: true},
          {description: 'Piedra del poder'},
          {description: 'Piedra del tiempo'},
          {description: 'Piedra del espacio'},
          {description: 'Piedra de realidad'},
        ]
      }
    }
  })

  // await prisma.todo.createMany({
  //   data: [
  //     {description: 'Piedra del alma', complete: true},
  //     {description: 'Piedra del poder'},
  //     {description: 'Piedra del tiempo'},
  //     {description: 'Piedra del espacio'},
  //     {description: 'Piedra de realidad'},
  //   ]
  // })

  // const todo = await prisma.todo.create({
  //   data: {description: 'Piedra del alma', complete: true}
  // })

  // console.log(todo);
  


  return NextResponse.json({message:'Seed Executed'})
}