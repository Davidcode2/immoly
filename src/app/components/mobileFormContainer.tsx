"use client";

import CashRoiModel from "app/lib/models/cashRoiModel";
import FinanzierungsForm from "./baseDataForm/finanzierungsForm";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type PropTypes = {
  input: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
};

export default function MobileFormContainer({ input, setInput }: PropTypes) {
  return (
    <Drawer defaultOpen={true} modal={false}>
      <DrawerTrigger>
        <div className="my-10 rounded-full border border-[var(--grey-accent)] p-5 shadow transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]">
          Eingabefeld öffnen
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-screen rounded-t-2xl border border-[var(--light-accent)]/20 bg-[var(--ultralight-accent)]/50 backdrop-blur-lg md:hidden">
        <DrawerHeader>
          <div className="invisible hidden">
            <DrawerTitle>Formular für Finanzierungsparameter</DrawerTitle>
            <DrawerDescription>Slider für Eigenkapital, monatliche Rate, Kreditzins und Kreditsumme</DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="">
          <div className="rounded-2xl">
            <div className={``}>
              <FinanzierungsForm values={input} setInput={setInput} />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
