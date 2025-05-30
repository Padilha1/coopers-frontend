"use client";
import { useState } from "react";
import TodoItem from "@/components/TodoItem";
import { useAuth } from "@/contexts/AuthContext";
import { delete_all } from "@/util/http";
import toast from "react-hot-toast";

export default function TodoCard() {
  const { todos, addTodo, fetchTodos, updateTodoStatus } = useAuth();
  const [inputText, setInputText] = useState("");

  const incompleteTodos = todos.filter((todo) => !todo.completed);

  const handleCreate = async () => {
    if (!inputText.trim()) return;
    addTodo(inputText);
    setInputText("");
  };

  return (
    <div className="shadow-xl px-6 py-8 w-full border-t-[20px] border-t-orange-400">
      <div className="flex flex-col items-center h-full justify-between">
        <div className="flex-1 flex flex-col w-full">
          <h3 className="text-4xl text-center font-semibold mb-5 text-black">
            To-do
          </h3>
          <p className="text-gray-600 text-center mb-7 text-2xl">
            Take a breath. <br /> Start doing.
          </p>

          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Add new task"
            className="w-full mb-4 border-b py-1 px-2 outline-none focus:text-orange-500"
          />

          <ul
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("text/plain");
              updateTodoStatus(id, false);
            }}
            className="space-y-2"
          >
            {incompleteTodos.map((item) => (
              <TodoItem
                key={item.id}
                id={String(item.id)}
                content={item.content}
                completed={item.completed}
              />
            ))}
          </ul>
        </div>

        <button
          onClick={async () => {
            await delete_all("/todo/clear?completed=false");
            toast.success("Tarefas concluídas apagadas!");
            fetchTodos();
          }}
          className="mt-6 w-full bg-black text-white py-2 rounded hover:opacity-90 cursor-pointer"
        >
          erase all
        </button>
      </div>
    </div>
  );
}
