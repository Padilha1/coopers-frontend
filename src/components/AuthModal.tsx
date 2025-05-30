// components/AuthModal.tsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useState } from "react";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_mail: "",
    user_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isRegister) {
      await register(
        formData.user_name,
        formData.user_mail,
        formData.user_password
      );
    } else {
      await login(formData.user_mail, formData.user_password);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-80 flex items-center justify-center z-30">
      <div className="bg-white min-w-[800px]  rounded-md flex shadow-lg relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-sm font-semibold cursor-pointer"
        >
          close
        </button>

        <div className="w-1/3 flex items-start justify-center bg-white mt-20 p-4">
          <Image src="/SignIn.png" alt="Login" width={200} height={100} />
        </div>

        <div className="w-2/3 mt-10 p-10">
          <h2 className="text-7xl font-bold text-black">Sign in</h2>
          <p className="text-green-500 text-5xl mb-6">to access your list</p>

          {isRegister && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Username:
              </label>
              <input
                name="user_name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {isRegister ? "E-mail:" : "User:"}
            </label>
            <input
              name="user_mail"
              type="user_mail"
              placeholder="email@gmail.com"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              name="user_password"
              type="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 font-semibold rounded hover:bg-green-600 cursor-pointer"
          >
            {isRegister ? "Register" : "Sign in"}
          </button>

          <p className="text-sm text-center mt-4">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-green-500 underline cursor-pointer"
            >
              {isRegister ? "Sign in" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
