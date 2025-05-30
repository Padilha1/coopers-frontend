"use client";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };
  return (
    <section className="flex justify-center items-center py-20 px-4 bg-white relative">
      <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 z-10">
        <Image
          src="/tatiana.png"
          alt="Contato"
          width={100}
          height={100}
          className="rounded-full  shadow-md"
        />
      </div>

      <div className="bg-white shadow-xl max-w-xl w-full rounded-lg pt-20 pb-10 px-6 ">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-green-500 p-3 rounded">
            <Image src="/Mail.svg" alt="Ícone" width={30} height={30} />
          </div>
          <div>
            <h4 className="text-black text-lg font-normal leading-4">GET IN</h4>
            <h4 className="text-black text-lg font-bold">TOUCH</h4>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label> Your Name</label>
            <input
              type="text"
              placeholder="type your name here..."
              className="border px-4 py-2 rounded w-full"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <div className="flex-col flex w-full">
              <label>Email*</label>
              <input
                type="email"
                placeholder="example@example.com"
                className="border px-4 py-2 rounded "
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Telephone*</label>
              <input
                type="tel"
                placeholder="( ) ____-____"
                className="border px-4 py-2 rounded"
              />
            </div>
          </div>
          <div className="mb-6">
            <label> Message*</label>
            <textarea
              placeholder="Type what you want to say to us"
              rows={4}
              className="border px-4 py-2 rounded w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 font-bold rounded shadow hover:bg-green-600 transition"
          >
            SEND NOW
          </button>
        </form>
      </div>
    </section>
  );
}
