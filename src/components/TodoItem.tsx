"use client";
import { useState, useRef, useEffect } from "react";
import { patch, delete_todo } from "@/util/http";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  id: string;
  content: string;
  completed: boolean;
}

export default function TodoItem({ id, content, completed }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(content);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateTodoStatus, removeTodo } = useAuth();

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleBlur = async () => {
    setEditing(false);
    if (text !== content) {
      await patch(`/todo/update/${id}`, { content: text });
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditing(false);
      if (text !== content) {
        await patch(`/todo/update/${id}`, { content: text });
      }
    }
  };

  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-2">
        <span
          onClick={async () => {
            updateTodoStatus(id, !completed);
          }}
          className={`w-5 h-5 flex items-center justify-center border-2 rounded-full cursor-pointer transition-all duration-200 ${
            completed
              ? "bg-green-600 border-green-600 text-white"
              : "border-orange-400"
          }`}
        >
          {completed && "✓"}
        </span>

        {editing ? (
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="border-none outline-none text-orange-500"
          />
        ) : (
          <span
            onClick={() => setEditing(true)}
            className={`cursor-pointer ${completed ? " text-gray-400" : ""}`}
          >
            {text}
          </span>
        )}
      </div>

      <button
        onClick={() => {
          removeTodo(id);
          delete_todo(`/todo/delete/${id}`);
        }}
        className="text-xs text-gray-400 opacity-0 hover:cursor-pointer group-hover:opacity-100"
      >
        delete
      </button>
    </div>
  );
}
