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
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
  const searchParams = useSearchParams();

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
          <div className="hover:bg-[var(--secondary) flex items-center gap-x-4 rounded-full border border-[var(--grey-accent)] bg-[var(--primary)] px-5 py-2 text-sm dark:text-[var(--background)] shadow-sm transition-all">
            <PanelLeftOpen strokeWidth={"1"} />
            Berechnung anpassen
          </div>
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 bg-black/80" />
        <DrawerContent className="bg-[var(--ultralight-accent)]/50 backdrop-blur-lg">
          <DrawerHeader>
            <div className="invisible hidden">
              <DrawerTitle>Formular für Finanzierungsparameter</DrawerTitle>
              <DrawerDescription>
                Slider für Eigenkapital, monatliche Rate, Kreditzins und
                Kreditsumme
              </DrawerDescription>
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto px-4">
            <div className="mt-10 justify-center">
              <Hero />
            </div>
            <button
              className="fixed top-9 left-72 rounded-full border-[var(--grey-accent)] px-5 py-2 text-sm transition-all hover:bg-[var(--primary)] hover:text-[var(--background)]"
              onClick={() => setShowForm(false)}
            >
              <PanelRightOpen strokeWidth={"1"} />
            </button>
            <FinanzierungsForm values={formValues} setInput={setInput} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
