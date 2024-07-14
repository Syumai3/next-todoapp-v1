import Todo from "@/app/components/Todo";
import { Task } from "@/types";
import React from "react";

type TodoListProps = {
  todos: Task[];
};

function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
