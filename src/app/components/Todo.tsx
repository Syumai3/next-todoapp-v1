"use client";

import { deleteTodo, editTodo } from "@/api";
import { Task } from "@/types";
import React, { useEffect, useRef, useState } from "react";

type TodoProps = {
  todo: Task;
};

function Todo({ todo }: TodoProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus(); // currentがある時のみフォーカスが当たる
    }
  }, [isEditing]);

  const handleEdit = async () => {
    await editTodo(todo.id, editedTaskTitle);
    setIsEditing(true);
  };
  const handleSave = async () => {
    await editTodo(todo.id, editedTaskTitle);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <li key={todo.id}>
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 py-1 px-1 rounded border-gray-400 border text-black"
          value={editedTaskTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskTitle(e.target.value)
          }
        />
      ) : (
        <span className="text-black">{todo.text}</span>
      )}

      <div>
        {isEditing ? (
          <button className="text-green-500" onClick={handleSave}>
            save
          </button>
        ) : (
          <>
            <button className="text-blue-500" onClick={handleEdit}>
              Edit
            </button>
            <button className="text-red-500" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default Todo;
