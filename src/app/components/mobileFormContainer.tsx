"use client";

import CashRoiModel from "app/lib/models/cashRoiModel";
import FinanzierungsForm from "./baseDataForm/finanzierungsForm";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type PropTypes = {
  input: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function MobileFormContainer({ input, setInput }: PropTypes) {
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState<boolean>(true);

  useEffect(() => {
    if (!showForm) return;
    const param = "form";
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, "open");
    window.history.pushState(null, "", `?${params.toString()}`);

    const handlePopState = () => {
      setShowForm(false);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      // Optionally clean up URL
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete(param);
      window.history.replaceState(null, "", cleanUrl.toString());
    };
  }, [showForm]);

  return (
    <div className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2">
      <Drawer
        modal={true}
        onOpenChange={setShowForm}
        open={showForm}
      >
        <DrawerTrigger>
          <div className="sticky bottom-0 rounded-full border border-[var(--grey-accent)] bg-[var(--background)] px-5 py-2 shadow transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]">
            Eingabefeld öffnen
          </div>
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0" />
        <DrawerContent className="fixed w-screen rounded-t-2xl border border-[var(--light-accent)]/20 bg-[var(--ultralight-accent)]/50 backdrop-blur-lg md:hidden">
          <div className="overflow-y-auto">
            <DrawerHeader>
              <div className="invisible hidden">
                <DrawerTitle>Formular für Finanzierungsparameter</DrawerTitle>
                <DrawerDescription>
                  Slider für Eigenkapital, monatliche Rate, Kreditzins und
                  Kreditsumme
                </DrawerDescription>
              </div>
            </DrawerHeader>
            <div className="">
              <div className="rounded-2xl">
                <div className={``}>
                  <FinanzierungsForm values={input} setInput={setInput} />
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
