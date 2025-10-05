"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import IconsHeader from "./iconsHeader";

export default function Header() {
  const [position, setPosition] = useState("bottom");
  const { theme, setTheme } = useTheme();

  const onValueChange = (value: string) => {
    setPosition(value);
    if (!theme) {
      setTheme(value);
    }
    setTheme(
      theme!.includes("dark") ? value!.split("light")[0] + "dark" : value,
    );
  };

  const brushIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-paintbrush-vertical-icon lucide-paintbrush-vertical"
    >
      <path d="M10 2v2" />
      <path d="M14 2v4" />
      <path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" />
      <path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1" />
    </svg>
  );

  const brushIconCurvy = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-paintbrush-icon lucide-paintbrush"
    >
      <path d="m14.622 17.897-10.68-2.913" />
      <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
      <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
    </svg>
  );
  const themes = [
    { value: "hearth-stone-light", color: "#6b4c4c" },
    { value: "green-mist-light", color: "hsl(172, 25%, 55%)" },
    { value: "blue-dream-light", color: "#0066cc" },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-3 items-center py-10 text-center">
        <div className="col-start-2 flex justify-center text-center max-md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <div className="px-5">{brushIcon}</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[var(--background)] text-[var(--foreground)]">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={onValueChange}
              >
                {themes.map((theme) => (
                  <DropdownMenuRadioItem
                    key={theme.value}
                    value={theme.value}
                    className="capitalize"
                  >
                    {theme.value.replace("-light", "").replace("-", " ")}
                    {theme.color && (
                      <span
                        className="float-right rounded-full p-1"
                        style={{ color: theme.color }}
                      >
                        {brushIconCurvy}
                      </span>
                    )}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex ml-auto mr-10">
          <IconsHeader />
        </div>
      </div>
    </div>
  );
}
