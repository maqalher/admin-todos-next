'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";
import * as todosApi from '@/todos/helpers/todos'
import { useRouter } from "next/navigation";


import { toogleTodo } from "../actions/todo-actions";

interface Props {
    todos?: Todo[];
}

export const TodosGrid = ({todos = []}: Props) => {

    const router = useRouter()

    // rest api
    // const toogleTodo = async(id:string, complete: boolean) => {
    //     const updateTodo = await todosApi.updateTodo(id,complete)
    //     // console.log({updateTodo});
    //     router.refresh()
    // }

    // server action
    

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {
            todos.map( todo => (
                // <TodoItem key={todo.id} todo={todo} toogleTodo={toogleTodo}/>
                <TodoItem key={todo.id} todo={todo} toogleTodo={toogleTodo}/>
            ))
        }
    </div>
  )
}
