"use client";

import { useAuth } from "@/contexts/AuthContext";
import TodoItem from "./TodoItem";
import { delete_all } from "@/util/http";
import toast from "react-hot-toast";

export default function DoneCard() {
  const { todos, fetchTodos, updateTodoStatus } = useAuth();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="shadow-xl rounded-lg px-6 py-8 w-full border-t-[20px] border-t-green-550">
      <div className="flex flex-col items-center h-full justify-between">
        <div className="flex-1 flex flex-col w-full">
          <h3 className="text-4xl font-semibold mb-5  text-center text-black">
            Done
          </h3>
          <p className="text-2xl text-black mb-7  text-center">
            Congratulations! <br />
            <strong>You have done {completedTodos.length} tasks</strong>
          </p>
          <ul
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("text/plain");
              updateTodoStatus(id, true);
            }}
            className="space-y-2"
          >
            {completedTodos.map((item, idx) => (
              <TodoItem
                key={idx}
                id={String(item.id)}
                content={item.content}
                completed={item.completed}
              />
            ))}
          </ul>
        </div>

        <button
          onClick={async () => {
            await delete_all("/todo/clear?completed=true");
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
