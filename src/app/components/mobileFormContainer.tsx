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
import { useMobileFormOpenStore } from "app/store";

type PropTypes = {
  input: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function MobileFormContainer({ input, setInput }: PropTypes) {
  const mobileFormState = useMobileFormOpenStore();
  const showMobileForm = mobileFormState.value;
  const setShowMobileForm = mobileFormState.updateValue;

  return (
    <div className="fixed bottom-10 left-1/2 z-30 -translate-x-1/2">
      <Drawer
        open={showMobileForm}
        onOpenChange={setShowMobileForm}
        modal={true}
      >
        <DrawerTrigger>
          <div className="sticky bottom-0 rounded-full border border-[var(--grey-accent)] bg-[var(--primary)] px-5 py-2 dark:text-[var(--background)] text-sm shadow transition-all hover:bg-[var(--secondary)]">
            Berechnung anpassen
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
