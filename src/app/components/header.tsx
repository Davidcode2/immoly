"use client";
import ColorSwitcher from "./colorSwitcher";
import IconsHeader from "./iconsHeader";

export default function Header() {
  return (
    <div>
      <div className="grid items-center py-10 text-center md:grid-cols-3">
        <div className="col-start-2 flex justify-center text-center max-md:hidden">
          <ColorSwitcher />
        </div>
        <div className="mr-10 ml-auto flex">
          <IconsHeader />
        </div>
      </div>
    </div>
  );
}
