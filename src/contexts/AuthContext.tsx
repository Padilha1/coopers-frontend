/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { delete_todo, get, patch, post } from "@/util/http";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";

interface Todo {
  id: string | number;
  content: string;
  completed: boolean;
}

interface User {
  id_user: string | number;
  user_name: string;
  user_mail: string;
}

interface AuthContextType {
  user: User | null;
  todos: Todo[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateTodoStatus: (id: string | number, completed: boolean) => void;
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  fetchTodos: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchTodos = async () => {
      try {
        const response = await get(`/todo?user_id=${Number(user.id_user)}`);
        if (!response || !Array.isArray(response.data)) {
          toast.error("Invalid response format from server");
          return;
        }

        const formattedTodos = response.data.map((todo: Todo) => ({
          id: todo.id.toString(),
          content: todo.content,
          completed: Boolean(todo.completed),
        }));

        setTodos(formattedTodos);
      } catch (err) {
        console.error("Error fetching todos:", err);
        toast.error("Erro ao buscar todos.");
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  const login = async (user_mail: string, user_password: string) => {
    const response = await post("/auth/login", { user_mail, user_password });
    if (!response) {
      toast.error("Login failed. Please check your credentials.");
      return;
    }
    const data = response?.data;
    if (data) {
      const loggedUser: User = {
        id_user: data.user.id_user,
        user_name: data.user.user_name,
        user_mail: data.user.user_mail,
      };
      setUser(loggedUser);
      localStorage.setItem("authUser", JSON.stringify(loggedUser));
      toast.success("Login successful!");
    }
  };

  const register = async (
    user_name: string,
    user_mail: string,
    user_password: string
  ) => {
    const response = await post("/auth/register", {
      user_name,
      user_mail,
      user_password,
    });
    if (!response) {
      toast.error("Failed to create account. Please try again.");
      return;
    }
    const data = response?.data;
    if (data) {
      const newUser: User = {
        id_user: data.user.id_user,
        user_name: data.user.user_name,
        user_mail: data.user.user_mail,
      };
      setUser(newUser);
      localStorage.setItem("authUser", JSON.stringify(newUser));
      toast.success("Create account successfully!");
    }
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    toast.success("Logout successful!");
    setUser(null);
    setTodos([]);
  };

  const addTodo = async (text: string) => {
    try {
      const response = await post("/todo/create", {
        content: text,
        completed: false,
        id_user: user?.id_user,
      });

      if (!response || !response.data) {
        toast.error("Erro ao adicionar tarefa.");
        return;
      }

      const newTodo: Todo = {
        id: response.data.id.toString(),
        content: response.data.content,
        completed: Boolean(response.data.completed),
      };

      setTodos((prev) => [...prev, newTodo]);
      toast.success("Tarefa adicionada!");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      toast.error("Erro ao adicionar tarefa.");
    }
  };

  const updateTodoStatus = async (id: string | number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );

    try {
      const response = await patch(`/todo/done/${id}`, { completed });

      if (!response) {
        toast.error("Failed to update todo status. Please try again.");
        return;
      }
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      toast.error("Erro ao atualizar status.");
    }
  };
  const removeTodo = async (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    const response = await delete_todo(`/todo/delete/${id}`);
    if (!response) {
      toast.error("Failed to remove todo. Please try again.");
      return;
    }
    toast.success("Todo removed successfully!");
  };
  const fetchTodos = async () => {
    if (!user) return;
    try {
      const response: any = await get(`/todo?user_id=${Number(user.id_user)}`);
      console.log("Response from API:", response);
      if (!response || !Array.isArray(response.data)) return;
      console.log("Raw data from API:", response.data);
      const formattedTodos = response.data.map((todo: Todo) => ({
        id: todo.id.toString(),
        content: todo.content,
        completed: Boolean(todo.completed),
      }));

      setTodos(formattedTodos);
    } catch (err) {
      console.error("Erro ao buscar todos:", err);
      toast.error("Erro ao buscar tarefas.");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        todos,
        login,
        register,
        logout,
        updateTodoStatus,
        addTodo,
        removeTodo,
        fetchTodos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
