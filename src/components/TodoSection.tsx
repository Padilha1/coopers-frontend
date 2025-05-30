import TodoCard from "@/components/TodoCard";
import DoneCard from "@/components/TodoCardDone";

export default function TodoSection() {
  return (
    <section
      id="todo"
      className="relative w-full bg-white py-20 overflow-hidden"
    >
      <div className="absolute -left-30 bottom-48 w-56 h-56 z-0 ">
        <div
          className="absolute w-full h-full bg-green-400 rounded-lg"
          style={{ clipPath: "polygon(50% 0, 0% 100%, 100% 100%)" }}
        />
        <div
          className="absolute bottom-4 left-4 w-[80%] h-[80%] bg-green-600 rounded-lg"
          style={{ clipPath: "polygon(50% 0, 0% 100%, 100% 100%)" }}
        />
      </div>
      <div className="bg-black text-white px-8 py-24 transform -skew-y-3 mb-24 relative z-0">
        <div className="max-w-4xl mx-auto transform skew-y-3 text-center">
          <h2 className="text-4xl font-bold inline-block relative mb-4">
            To-do List
            <div className="h-1 w-full bg-green-550 mt-2 rounded-full" />
          </h2>

          <p className="text-sm md:text-base text-gray-300">
            Drag and drop to set your main priorities, check <br /> when done
            and create what`s new.
          </p>
        </div>
      </div>

      <div className="max-w-6xl min-h-[750px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        <TodoCard />
        <DoneCard />
      </div>
    </section>
  );
}
