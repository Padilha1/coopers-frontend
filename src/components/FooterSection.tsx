export default function FooterSection() {
  return (
    <footer className="relative w-full mt-32">
      <div className="bg-black transform -skew-y-2 py-16">
        <div className="transform skew-y-2 text-white text-center z-10">
          <p className="text-xl font-semibold mb-7">Need help?</p>
          <p className="text-lg font-semibold mb-[18px]">coopers@coopers.pro</p>
          <p className="text-sm ">© 2021 Coopers. All rights reserved.</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[500px] h-6 bg-green-500 -skew-x-6 z-20 shadow-md" />
    </footer>
  );
}
