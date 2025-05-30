"use client";
import Image from "next/image";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between bg-transparent px-20 mx-20 mt-7 relative z-10">
        <Image alt="Logo Coopers" src={"/logo.svg"} width={150} height={100} />
        {user ? (
          <button
            onClick={logout}
            className="bg-black text-white px-9 py-3 cursor-pointer hover:bg-black/70"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-9 py-3 cursor-pointer hover:bg-black/70"
          >
            Sign in
          </button>
        )}
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}
