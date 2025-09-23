import CashRoiModel from "app/lib/models/cashRoiModel";
import { NebenkostenCalculatorForNebenkostenComponent } from "app/services/nebenkostenCalculationService";
import { useEffect, useRef, useState } from "react";
import CenteredModal from "../centeredModal";
import PieChartNebenkosten from "./pieChartNebenkosten";
import NebenkostenModal from "./nebenkostenModal";
import { screenWidthMobile } from "app/utils/screenWidth";
import {
  useBundeslandStore,
  useMaklergebuehrStore,
  useNebenkostenStore,
  useGrundbuchkostenStore,
  useNotarkostenStore,
  useMaklergebuehrPercentageStore,
  useNotarkostenPercentageStore,
  useGrundbuchkostenPercentageStore,
} from "app/store";
import EditIconComponent from "./editIconComponent";
import { DEFAULT_BUNDESLAND } from "app/constants";
import {
  AbsoluteNebenkostenModel,
  CompleteNebenkostenModel,
  RelativeNebenkostenModel,
} from "./nebenkostenFrontendModel";
import { getGrundsteuer } from "app/services/nebenkostenGrundsteuer";

type PropTypes = {
  calculationData: CashRoiModel | null;
};

export default function NebenkostenDisplay({ calculationData }: PropTypes) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const bundesland = useBundeslandStore((state) => state.value);
  const [nebenkostenObject, setNebenkostenObject] = useState<
    CompleteNebenkostenModel[]
  >([]);
  const sumNebenkosten = useRef<number>(0);

  const maklergebuehr = useMaklergebuehrStore((state) => state.value);
  const notarkosten = useNotarkostenStore((state) => state.value);
  const grundbuchkosten = useGrundbuchkostenStore((state) => state.value);

  const maklergebuehrPercentage = useMaklergebuehrPercentageStore(
    (state) => state.value,
  );
  const notarkostenPercentage = useNotarkostenPercentageStore(
    (state) => state.value,
  );
  const grundbuchkostenPercentage = useGrundbuchkostenPercentageStore(
    (state) => state.value,
  );

  const updateMaklergebuehrPercentage = useMaklergebuehrPercentageStore((state) => state.updateValue);
  const updateNotarkostenPercentage = useNotarkostenPercentageStore((state) => state.updateValue);
  const updateGrundbuchkostenPercentage = useGrundbuchkostenPercentageStore((state) => state.updateValue);

  if (!calculationData) {
    throw new Error("No calculation data available");
  }
  const nebenkostenCalculator =
    new NebenkostenCalculatorForNebenkostenComponent(
      calculationData?.principal,
      parseFloat(maklergebuehrPercentage.replace(",", ".")),
      notarkosten,
      grundbuchkosten,
    );

  const handleMouseEnter = (index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const updateNebenkosten = useNebenkostenStore((state) => state.updateValue);
  const updateBundesland = useBundeslandStore((state) => state.updateValue);

  useEffect(() => {
    const nebenkostenResult = [
      {
        name: "Notarkosten",
        value: notarkosten,
      },
      {
        name: "Grundbuchkosten",
        value: grundbuchkosten,
      },
      {
        name: "Grunderwerbsteuer",
        value: nebenkostenCalculator.calcGrunderwerbsteuer(bundesland),
      },
      {
        name: "Maklergebühr",
        value: maklergebuehr
      },
    ];
    const nebenkostenWithPercentage =
      mapToNebenkostenWithPercentage(nebenkostenResult);
    sumNebenkosten.current = nebenkostenCalculator.calcSumme();
    setNebenkostenObject(nebenkostenWithPercentage);
    updateNebenkosten(sumNebenkosten.current);
  }, [calculationData, notarkosten, grundbuchkosten, maklergebuehr]);

  useEffect(() => {
    nebenkostenCalculator.bundesland = bundesland;
    updateBundesland(bundesland || DEFAULT_BUNDESLAND);
    setNebenkostenObject((prev) => {
      const grundsteuerValue = nebenkostenCalculator.calcGrunderwerbsteuer(bundesland);
      const grundsteuerPercentage = getGrundsteuer(bundesland);
      const grundsteuerIndex = prev.findIndex((item) => item.name === "Grunderwerbsteuer");
      const newArray = [...prev];
      newArray[grundsteuerIndex].percentage = grundsteuerPercentage;
      newArray[grundsteuerIndex].value = grundsteuerValue;
      return newArray;
    });
    let newSum = nebenkostenObject.reduce((acc, current) => {
      return acc + current.value;
    }, 0);
    newSum -= nebenkostenObject.find((item) => item.name === "Grunderwerbsteuer")?.value || 0;
    newSum += nebenkostenCalculator.calcGrunderwerbsteuer(bundesland);
    sumNebenkosten.current = newSum;
    updateNebenkosten(sumNebenkosten.current);
  }, [bundesland]);

  useEffect(() => {
    const nebenkostenResult = [
      {
        name: "Notarkosten",
        percentage: Number.parseFloat(notarkostenPercentage.replace(",", "."))
      },
      {
        name: "Grundbuchkosten",
        percentage: Number.parseFloat(grundbuchkostenPercentage.replace(",", "."))
      },
      {
        name: "Grunderwerbsteuer",
        percentage: getGrundsteuer(bundesland),
      },
      {
        name: "Maklergebühr",
        percentage: Number.parseFloat(maklergebuehrPercentage.replace(",", "."))
      },
    ];
    const completeNebenkosten = mapToNebenkostenWithAbsoluteValues(nebenkostenResult);
    const newSum = completeNebenkosten.reduce((acc, current) => { 
      return acc + current.value;
    }, 0);
    sumNebenkosten.current = newSum;
    updateNebenkosten(sumNebenkosten.current);
    setNebenkostenObject(completeNebenkosten);
  }, [
    maklergebuehrPercentage,
    notarkostenPercentage,
    grundbuchkostenPercentage,
  ]);

  const mapToNebenkostenWithAbsoluteValues = (
    relativeNebenkosten: RelativeNebenkostenModel[],
  ): CompleteNebenkostenModel[] => {
    const res = relativeNebenkosten.map((item: RelativeNebenkostenModel) => ({
      name: item.name,
      percentage: item.percentage,
      value: Math.round((item.percentage / 100) * calculationData.principal),
      setPercentage: getPercentageUpdater(item.name),
      setAbsolute: getAbsoluteUpdater(item.name),
    }));
    res.forEach((item) => {
      item.setAbsolute(item.value);
    });
    return res;
  };

  const getPercentageUpdater = (name: string) => {
    switch (name) {
      case "Notarkosten":
        return updateNotarkostenPercentage
      case "Grundbuchkosten":
        return updateGrundbuchkostenPercentage
      case "Maklergebühr":
        return updateMaklergebuehrPercentage
      default:
        return () => {};
    }
  }

  const getAbsoluteUpdater = (name: string) => {
    switch (name) {
      case "Notarkosten":
        return useNotarkostenStore.getState().updateValue
      case "Grundbuchkosten":
        return useGrundbuchkostenStore.getState().updateValue
      case "Maklergebühr":
        return useMaklergebuehrStore.getState().updateValue
      default:
        return () => {};
    }
  }

  const mapToNebenkostenWithPercentage = (
    nebenkostenObject: AbsoluteNebenkostenModel[],
  ): CompleteNebenkostenModel[] => {
    const res = nebenkostenObject.map((item: AbsoluteNebenkostenModel) => {
      let percentage = 0;
      if (sumNebenkosten.current > 0) {
        percentage =
          Math.round(((item.value * 100) / calculationData.principal) * 100) /
          100;
      }
      const setPercentage = getPercentageUpdater(item.name);
      const setAbsolute = getAbsoluteUpdater(item.name);
      return { ...item, percentage, setPercentage, setAbsolute };
    });
    return res;
  };

  const openModalOnMobile = () => {
    if (screenWidthMobile() && !showModal) {
      setShowModal(true);
    }
  };

  return (
    <div className="max-h-56 rounded-lg px-6 pt-6 text-xs shadow backdrop-blur-2xl md:col-span-2 md:pt-8 md:text-base">
      <div className="mb-0 text-xs md:mb-0">Nebenkosten</div>
      <div className="mb-5 md:relative">
        <div className="text-3xl md:absolute">
          {sumNebenkosten.current.toLocaleString("de")}
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-between md:flex-row md:justify-start md:gap-6"
        onClick={openModalOnMobile}
      >
        {showModal && (
          <CenteredModal onClose={() => setShowModal(false)}>
            <NebenkostenModal
              setBundesland={updateBundesland}
              bundesland={bundesland}
              nebenkostenArray={nebenkostenObject}
              setNebenkostenArray={setNebenkostenObject}
              sumNebenkosten={sumNebenkosten.current}
              activeIndex={activeIndex}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </CenteredModal>
        )}
        <EditIconComponent setShowModal={setShowModal} />
        <div className="absolute -bottom-[5px] h-40 w-40 md:static md:hidden md:h-48 md:w-48">
          <PieChartNebenkosten
            data={nebenkostenObject}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
        <div className="order-first hidden h-20 w-full flex-col gap-12 overflow-y-scroll pb-4 md:grid md:h-fit md:grid-cols-2 md:gap-2 md:p-0">
          {nebenkostenObject.map((entry, index) => (
            <div
              key={entry.name}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`flex cursor-pointer flex-col transition-opacity ${activeIndex === index
                  ? "text-[var(--accent)] opacity-100"
                  : "opacity-90"
                }`}
            >
              <div className="flex items-center">
                <span
                  className="mr-2 inline-block h-3 min-w-3 rounded-sm"
                  style={{
                    backgroundColor: `var(--${index === 0 ? "dark-accent" : index === 1 ? "neutral-accent" : index === 2 ? "accent" : "light-accent"})`,
                  }}
                />
                <div className="inline-block overflow-hidden text-lg overflow-ellipsis md:text-xs">
                  {entry.name}:
                </div>
              </div>
              <div className="text-2xl md:text-lg">
                €{entry.value.toLocaleString("de")}
              </div>
            </div>
          ))}
        </div>
        <div className="relative bottom-4 z-20 hidden h-40 w-40 md:block md:h-38 md:w-48">
          <PieChartNebenkosten
            data={nebenkostenObject}
            activeIndex={activeIndex}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
}
