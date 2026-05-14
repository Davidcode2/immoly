import SliderInput from "@/components/slider/sliderInput";
import calculateBuyVsRentComparison, {
  getCashRoi,
  getExpectedInflation,
  getExpectedPropertyAppreciation,
  getHoldingPeriodYears,
  getMonthlyBuyNebenkosten,
  getMonthlyRentNebenkosten,
} from "@/lib/calculateBuyVsRentComparison";
import ArmotizationEntry from "@/lib/models/ArmotizationEntry";
import CashRoiModel from "@/lib/models/cashRoiModel";

type PropTypes = {
  input: CashRoiModel;
  table: ArmotizationEntry[];
  nebenkosten: number;
  setInput: (data: CashRoiModel) => void;
};

const formatCurrency = (value: number) =>
  Math.round(value).toLocaleString("de-DE");

export default function BuyVsRentComparisonCard({
  input,
  table,
  nebenkosten,
  setInput,
}: PropTypes) {
  const comparison = calculateBuyVsRentComparison(input, table, nebenkosten);

  const handleInputChange = (name: string, value: number) => {
    setInput({ ...input, [name]: value });
  };

  const differenceIsPositive = comparison.differencePerMonth > 0;

  return (
    <section className="rounded-lg shadow backdrop-blur-2xl dark:shadow-[0_4px_50px_var(--dark-accent)]/20">
      <div className="border-b border-[var(--grey-accent)]/20 px-6 py-5 md:px-8">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--foreground)]/60">
          Vergleich
        </p>
        <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-2xl text-[var(--foreground)] md:text-3xl">
              Kaufen vs. Mieten
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-[var(--foreground)]/70">
              Die Kaufkosten werden auf {comparison.holdingPeriodYears} Jahre Haltedauer verteilt.
              Beim Mieten wird eine positive Ersparnis gegenueber dem Kauf jedes Jahr mit der
              Kapitalrendite angelegt. Alle Vergleichswerte werden in heutiger Kaufkraft gezeigt.
            </p>
          </div>
          <div
            className={`rounded-full px-4 py-2 text-sm ${differenceIsPositive ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "bg-[var(--accent)]/10 text-[var(--accent)]"}`}
          >
            {differenceIsPositive ? "Mieten ist guenstiger" : "Kaufen ist guenstiger"}
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-6 md:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="grid gap-6 md:grid-cols-2">
          <SliderInput
            min={0}
            max={4000}
            step={10}
            value={Number(input.rent) || 0}
            inputName={"rent"}
            label={"Monatliche Kaltmiete"}
            htmlFor={"rentComparison"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={1}
            max={40}
            step={1}
            value={getHoldingPeriodYears(input)}
            inputName={"holding_period_years"}
            label={"Haltedauer bis Verkauf"}
            htmlFor={"holdingPeriodYears"}
            sign={"Jahre"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={0}
            max={10}
            step={0.1}
            value={getCashRoi(input)}
            inputName={"cash_roi"}
            label={"Jaehrliche Kapitalrendite"}
            htmlFor={"cashRoiComparison"}
            sign={"%"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={-2}
            max={10}
            step={0.1}
            value={getExpectedPropertyAppreciation(input)}
            inputName={"expected_property_appreciation"}
            label={"Wertsteigerung Immobilie"}
            htmlFor={"expectedPropertyAppreciation"}
            sign={"%"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={0}
            max={10}
            step={0.1}
            value={getExpectedInflation(input)}
            inputName={"expected_inflation"}
            label={"Erwartete Inflation"}
            htmlFor={"expectedInflation"}
            sign={"%"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={0}
            max={2000}
            step={10}
            value={getMonthlyBuyNebenkosten(input)}
            inputName={"monthly_buy_nebenkosten"}
            label={"Monatliche Nebenkosten Kauf"}
            htmlFor={"monthlyBuyNebenkosten"}
            handleChange={handleInputChange}
          />
          <SliderInput
            min={0}
            max={2000}
            step={10}
            value={getMonthlyRentNebenkosten(input)}
            inputName={"monthly_rent_nebenkosten"}
            label={"Monatliche Nebenkosten Miete"}
            htmlFor={"monthlyRentNebenkosten"}
            handleChange={handleInputChange}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ComparisonStat
            label="Monatlicher Cashflow Kauf"
            value={`${formatCurrency(comparison.monthlyBuyTotalCost)} €`}
            description={`${formatCurrency(comparison.monthlyBuyCashflow)} € Rate + ${formatCurrency(comparison.monthlyBuyNebenkosten)} € Nebenkosten`}
          />
          <ComparisonStat
            label="Monatliche Kosten Miete"
            value={`${formatCurrency(comparison.monthlyRentTotalCost)} €`}
            description={`${formatCurrency(comparison.monthlyRentCost)} € Kaltmiete + ${formatCurrency(comparison.monthlyRentNebenkosten)} € Nebenkosten`}
          />
          <ComparisonStat
            label="Effektive Monatskosten Kauf"
            value={`${formatCurrency(comparison.effectiveMonthlyBuyCost)} €`}
            description="In heutiger Kaufkraft, inkl. Verkauf nach Haltedauer"
          />
          <ComparisonStat
            label="Effektive Monatskosten Miete"
            value={`${formatCurrency(comparison.effectiveMonthlyRentCost)} €`}
            description="In heutiger Kaufkraft, nach Anlage der Miet-Ersparnis"
          />
          <ComparisonStat
            label="Differenz pro Monat"
            value={`${differenceIsPositive ? "+" : ""}${formatCurrency(comparison.differencePerMonth)} €`}
            description={differenceIsPositive ? "Mehrkosten gegenueber Mieten inkl. Anlage" : "Ersparnis gegenueber Mieten inkl. Anlage"}
            emphasized
          />
          <ComparisonStat
            label="Depotwert beim Mieten"
            value={`${formatCurrency(comparison.renterInvestmentBalance)} €`}
            description={`${formatCurrency(comparison.totalRenterSavingsContribution)} € eingezahlte Ersparnis`}
          />
        </div>
      </div>

      <div className="grid gap-4 border-t border-[var(--grey-accent)]/20 px-6 py-5 text-sm text-[var(--foreground)]/70 md:grid-cols-3 md:px-8">
        <SummaryLine
          label="Durchschnittliche Monatsmiete"
          value={`${formatCurrency(comparison.averageMonthlyRentCost)} €`}
        />
        <SummaryLine
          label={`Gesamtkosten Kauf in ${comparison.holdingPeriodYears} Jahren`}
          value={`${formatCurrency(comparison.totalBuyingCost)} €`}
        />
        <SummaryLine
          label="Gesamtkosten Miete"
          value={`${formatCurrency(comparison.totalRentCost)} €`}
        />
        <SummaryLine
          label="Kapitalrendite auf Miet-Ersparnis"
          value={`${comparison.realCashRoi.toFixed(1).replace(".", ",")}% real`}
        />
        <SummaryLine
          label="Auszahlung nach Verkauf"
          value={`${formatCurrency(comparison.saleProceedsAfterLoan)} €`}
        />
        <SummaryLine
          label="Geschaetzter Verkaufspreis"
          value={`${formatCurrency(comparison.estimatedSalePrice)} €`}
        />
        <SummaryLine
          label="Annahmen"
          value={`${comparison.realPropertyAppreciation.toFixed(1).replace(".", ",")}% reale Wertsteigerung / ${comparison.realCashRoi.toFixed(1).replace(".", ",")}% reale Rendite`}
        />
      </div>
    </section>
  );
}

function ComparisonStat({
  label,
  value,
  description,
  emphasized = false,
}: {
  label: string;
  value: string;
  description: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-[var(--grey-accent)]/15 p-4 ${emphasized ? "bg-[var(--accent)]/5" : "bg-transparent"}`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/55">
        {label}
      </p>
      <p className="mt-3 text-3xl text-[var(--foreground)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--foreground)]/65">{description}</p>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/50">
        {label}
      </p>
      <p className="mt-2 text-xl text-[var(--foreground)]">{value}</p>
    </div>
  );
}
