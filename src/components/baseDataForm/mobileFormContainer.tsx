"use client";

import CashRoiModel from "@/lib/models/cashRoiModel";
import FinanzierungsForm from "./finanzierungsForm";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMobileFormOpenStore } from "@/store";
import { useEffect, useRef, useState } from "react";

type PropTypes = {
  input: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
  showButton?: boolean;
};

export default function MobileFormContainer({ input, setInput, showButton }: PropTypes) {
  const mobileFormState = useMobileFormOpenStore();
  const showMobileForm = mobileFormState.value;
  const setShowMobileForm = mobileFormState.updateValue;
  const [showTrigger, setShowTrigger] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1400) {
        setShowTrigger(true);
      } else {
        setShowTrigger(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative z-30">
      {showTrigger && (
        <div className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2">
          <Drawer
            open={showMobileForm}
            onOpenChange={setShowMobileForm}
            modal={true}
          >
            <DrawerTrigger>
              <div className="sticky bottom-0 rounded-full border border-[var(--grey-accent)] bg-[var(--primary)] px-5 py-2 text-sm shadow transition-all hover:bg-[var(--secondary)] dark:text-[var(--background)]">
                Berechnung anpassen
              </div>
            </DrawerTrigger>
            <DrawerOverlay className="fixed inset-0" />
            <DrawerContent className="fixed w-screen rounded-t-2xl border border-[var(--light-accent)]/20 bg-[var(--ultralight-accent)]/50 backdrop-blur-lg md:hidden">
              <div className="overflow-y-auto">
                <DrawerHeader>
                  <div className="invisible hidden">
                    <DrawerTitle>
                      Formular für Finanzierungsparameter
                    </DrawerTitle>
                    <DrawerDescription>
                      Slider für Eigenkapital, monatliche Rate, Kreditzins und
                      Kreditsumme
                    </DrawerDescription>
                  </div>
                </DrawerHeader>
                <div className="">
                  <div className="rounded-2xl">
                    <div className={``}>
                      <FinanzierungsForm showButton={showButton} values={input} setInput={setInput} />
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
}
