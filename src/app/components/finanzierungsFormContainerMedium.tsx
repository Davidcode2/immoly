import { Button } from "@/components/ui/button";
import FinanzierungsForm from "./baseDataForm/finanzierungsForm";
import Hero from "./hero/hero";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CashRoiModel from "app/lib/models/cashRoiModel";

type PropTypes = {
  formValues: CashRoiModel | null;
  setInput: (data: CashRoiModel) => void;
  showForm: boolean;
  setShowForm: (arg: boolean) => void;
};
export default function FinanzierungsFormContainerMedium({
  formValues,
  setInput,
  showForm,
  setShowForm,
}: PropTypes) {
  return (
    <div
      className={`hidden md:block 2xl:hidden lg:dark:shadow-[10px_4px_20px_var(--dark-accent)]/5`}
    >
      <Drawer
        open={showForm}
        onOpenChange={setShowForm}
        modal={false}
        direction={"left"}
        dismissible={false}
      >
        <DrawerTrigger>
          <Button className="rounded-full text-sm text-[var(--foreground)] border border-[var(--grey-accent)] bg-[var(--background)] px-5 py-2 shadow-sm transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]">
            Eingabefeld öffnen
          </Button>
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0" />
        <DrawerContent className="bg-[var(--ultralight-accent)]/50 backdrop-blur-lg">
          <div className="px-4">
            <div className="mt-20 justify-center">
              <Hero />
            </div>
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
                    <button className="fixed top-10 left-10 rounded-full text-sm border border-[var(--grey-accent)] bg-[var(--background)] px-5 py-2 shadow transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]" onClick={() => setShowForm(false)}>
                      Schließen
                    </button>
                    <FinanzierungsForm
                      values={formValues}
                      setInput={setInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
