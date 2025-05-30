import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white relative  py-12">
      <div
        className="bg-no-repeat bg-right bg-contain h-[800px] w-full -mt-26 absolute top-0 right-0 z-1"
        style={{ backgroundImage: `url("/BG.png")` }}
      ></div>
      <div className=" mx-20 grid grid-cols-1 md:grid-cols-2 items-center gap-96 relative z-2">
        <div className="z-10 ">
          <h1 className="text-7xl font-bold text-black">
            Organize <br />
            <span className="text-green-550 font-normal">your daily jobs</span>
          </h1>
          <p className="mt-4 text-lg text-black font-semibold">
            The only way to get things done
          </p>
          <a
            href="#todo"
            className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-green-600 transition"
          >
            Go to To-do list
          </a>
        </div>

        <div className="flex justify-center items-center ">
          <Image
            src="/slides/02.jpg"
            alt="Hero Office"
            width={500}
            height={500}
            className="w-full max-w-sm rounded-md shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
