"use client";
import { Todo } from "@prisma/client";
import { startTransition, useOptimistic } from "react";

import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { toggleTodo as toggleTodoAction } from "../actions/todo-actions";

interface Props {
  todo: Todo;
  //TODO Acciones que queiro llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimisitc, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      //Esto hace el cambio visualmente
      startTransition(()=>toggleTodoOptimistic(!todoOptimisitc.complete))
      await toggleTodoAction(todoOptimisitc.id, !todoOptimisitc.complete)
    } catch (e) {
      startTransition(()=>toggleTodoOptimistic(!todoOptimisitc.complete))
    }
  }

  return (
    <div
      className={todoOptimisitc.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          //onClick={() =>
          //  toggleTodo(todoOptimisitc.id, !todoOptimisitc.complete)
          //}
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimisitc.complete ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {todoOptimisitc.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">
          {todoOptimisitc.description}
        </div>
      </div>
    </div>
  );
};
