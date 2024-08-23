'use client'
import { Todo } from "@prisma/client"
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";


interface Props {
    todo: Todo;
    // TODO acciones que quiero llamar
    toogleTodo: (id: string, complete: boolean) => Promise<Todo|void>
}

export const TodoItem = ({todo, toogleTodo}: Props) => {

    const [todoOptimistic,toogleTodoOptimistic] = useOptimistic(
        todo,
        (state,newCompleteValue:boolean) => ({...state,complete: newCompleteValue})
    )

    const onToggleTodo = async() => {
        try {
            startTransition( () =>  toogleTodoOptimistic(!todoOptimistic.complete))
            await toogleTodo(todoOptimistic.id, !todoOptimistic.complete)
        } catch (error) {
            startTransition( () => toogleTodoOptimistic(!todoOptimistic.complete))
        }
    }

  return (
    // useOptimistic
    <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">

            <div 
                onClick={onToggleTodo}
                className="{`
                flex p-2 rounded-md cursor-pointer
                hove:bg-opacity-60
                ${todo.complete ? 'bg-blue-100' : 'bg-red-100'}
            `}">
                {
                    todoOptimistic.complete 
                        ? (<IoCheckboxOutline size={30} />)
                        : (<IoSquareOutline size={30} />)
                }
            </div>

            <div className="text-center sm:text-left">
                {todoOptimistic.description}
            </div>

        </div>
    </div>
    // <div className={todo.complete ? styles.todoDone : styles.todoPending}>
    //     <div className="flex flex-col sm:flex-row justify-start items-center gap-4">

    //         <div 
    //             onClick={() => toogleTodo(todo.id, !todo.complete)}
    //             className="{`
    //             flex p-2 rounded-md cursor-pointer
    //             hove:bg-opacity-60
    //             ${todo.complete ? 'bg-blue-100' : 'bg-red-100'}
    //         `}">
    //             {
    //                 todo.complete 
    //                     ? (<IoCheckboxOutline size={30} />)
    //                     : (<IoSquareOutline size={30} />)
    //             }
    //         </div>

    //         <div className="text-center sm:text-left">
    //             {todo.description}
    //         </div>

    //     </div>
    // </div>
  )
}
