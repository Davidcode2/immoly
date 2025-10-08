import { Ellipsis } from "lucide-react";

export default function NoData() {
  return (
    <>
      <div className="col-span-full hidden xl:h-full h-96 rounded-lg text-2xl md:flex md:items-center md:justify-center backdrop-blur-lg">
        <div className="px-4 animate-pulse">
            <Ellipsis />
        </div>
      </div>
    </>
  );
}
