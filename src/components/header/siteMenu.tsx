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

export default function SiteMenu() {
  return (
    <>
    <Drawer direction="right">
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
          <ul className="flex flex-col gap-y-10 text-3xl">
            <AnimatedMenuEntry text="Rechner" selected={true} />
            <AnimatedMenuEntry text="Über Immoly" />
            <AnimatedMenuEntry text="Impressum" />
          </ul>
        </div>
      </DrawerContent>
    </Drawer>

    <Drawer direction="bottom">
      <DrawerTrigger className="md:hidden">
        <Equal />
      </DrawerTrigger>
      <DrawerOverlay className="fixed inset-0 bg-black/40" />
      <DrawerContent className="rounded-l-2xl bg-[var(--ultralight-accent)] dark:bg-[var(--ultra-accent)]">
        <DrawerHeader className="hidden border-b p-6">
          <DrawerTitle className="text-2xl">Menü</DrawerTitle>
          <DrawerDescription>Wohin möchtest du?</DrawerDescription>
        </DrawerHeader>
        <div className="p-14 py-20">
          <ul className="flex flex-col gap-y-10 text-3xl">
            <AnimatedMenuEntry text="Rechner" selected={true} />
            <AnimatedMenuEntry text="Über Immoly" />
            <AnimatedMenuEntry text="Impressum" />
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
    </>
  );
}
