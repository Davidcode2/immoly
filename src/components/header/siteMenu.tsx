import { Equal } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AnimatedMenuEntry from "./AnimatedMenuEntry";
import { useState } from "react";
import CloseButton from "../utilities/closeButton";

export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger className="hidden md:block">
          <Equal />
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="rounded-l-2xl bg-[var(--ultralight-accent)] dark:bg-[var(--ultra-accent)]">
          <DrawerHeader className="hidden border-b p-6">
            <DrawerTitle className="text-2xl">Menü</DrawerTitle>
            <DrawerDescription>Wohin möchtest du?</DrawerDescription>
          </DrawerHeader>
          <div className="p-14 py-20">
            <CloseButton onClick={() => setOpen(false)} />
            <ul className="flex flex-col gap-y-10 text-3xl">
              <AnimatedMenuEntry href="/" text="Rechner" />
              <AnimatedMenuEntry href="/about" text="Über Immoly"/>
              <AnimatedMenuEntry href="/preise" text="Preise"/>
              <AnimatedMenuEntry href="/impressum" text="Impressum"/>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} direction="bottom">
        <DrawerTrigger className="md:hidden">
          <Equal />
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent className="rounded-t-2xl bg-[var(--ultralight-accent)] dark:bg-[var(--ultra-accent)]">
          <DrawerHeader className="hidden border-b p-6">
            <DrawerTitle className="text-2xl">Menü</DrawerTitle>
            <DrawerDescription>Wohin möchtest du?</DrawerDescription>
          </DrawerHeader>
          <div className="p-14 py-20">
            <ul className="flex flex-col gap-y-10 text-3xl">
              <AnimatedMenuEntry href="/" text="Rechner" onSelect={() => setMobileOpen(false)}/>
              <AnimatedMenuEntry href="/about" text="Über Immoly" onSelect={() => setMobileOpen(false)}/>
              <AnimatedMenuEntry href="/preise" text="Preise" onSelect={() => setMobileOpen(false)}/>
              <AnimatedMenuEntry href="/impressum" text="Impressum" onSelect={() => setMobileOpen(false)}/>
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
