"use client";
import { useRef, useState } from "react";
import Image from "next/image";

const items = [
  {
    title: "Organize your daily job enhance your life performance",
    label: "function",
    action: "read more",
    image: "/bitmap.png",
  },
  {
    title:
      "Mark one activity as done makes your brain understands the power of doing.",
    label: "function",
    action: "read more",
    image: "/bitmap2.png",
  },
  {
    title:
      "Careful with misunderstanding the difference between a list of things and a list of desires.",
    label: "function",
    action: "leia mais",
    image: "/bitmap3.png",
  },
  {
    title: "Focus on one task at a time.",
    label: "function",
    action: "read more",
    image: "/bitmap.png",
  },
  {
    title: "Prioritize your actions.",
    label: "function",
    action: "read more",
    image: "/bitmap.png",
  },
  {
    title: "Track your accomplishments and celebrate progress.",
    label: "function",
    action: "read more",
    image: "/bitmap.png",
  },
  {
    title: "Plan your day every morning.",
    label: "function",
    action: "read more",
    image: "/bitmap.png",
  },
  {
    title: "Reflect weekly to stay aligned.",
    label: "function",
    action: "read more",
    image: "/bitmap.png",
  },
  {
    title: "Keep it simple, stay consistent.",
    label: "function",
    action: "read more",
    image: "/bitmap.png",
  },
];

export default function CarouselSection() {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const maxIndex = Math.floor(items.length / 3);
  const visibleItems = items.slice(index * 3, index * 3 + 3);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="w-full flex flex-col  justify-center bg-white relative px-4 py-32">
      <div className="absolute top-16 left-80 w-[1080px] h-[520px] bg-green-550 z-0 rounded-lg" />

      <div className="relative z-10 text-white  text-5xl font-bold mb-12 px-[400px]">
        <h2 className="pt-6">good things</h2>
      </div>
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="relative z-10 hover:cursor-pointer overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-6 justify-center mt-10"
      >
        {visibleItems.map((item, i) => (
          <div
            key={i}
            className="bg-white text-black rounded-lg shadow-lg w-80 flex-shrink-0 overflow-hidden flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-3 flex items-center justify-center">
                <Image
                  src="/Mini_Logo.svg"
                  alt="Mini Logo"
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs border border-gray-300 px-2 py-1 rounded-full">
                  {item.label}
                </span>
                <p className="mt-2 text-sm font-medium">{item.title}</p>
              </div>
              <a href="#" className="text-green-500 text-sm mt-4">
                {item.action}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-0 mt-10 flex justify-center gap-2">
        {Array.from({ length: maxIndex }, (_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              index === i ? "bg-green-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
