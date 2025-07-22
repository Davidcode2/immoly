import ArmotizationEntry from "app/lib/models/ArmotizationEntry";

type PropTypes = {
  data: ArmotizationEntry[] | null;
};
export default function NoData(data: PropTypes) {
  return (
    <>
      {!data && (
        <div className="hidden border border-slate-600 h-full md:flex md:justify-center md:items-center text-2xl col-span-full rounded-lg">
          <div className="px-4">
            Gib deine Daten ein oder wähle ein Szenario...
          </div>
        </div>
      )}
    </>
  );
}
