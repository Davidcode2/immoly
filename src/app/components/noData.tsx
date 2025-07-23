import ArmotizationEntry from "app/lib/models/ArmotizationEntry";

type PropTypes = {
  data: ArmotizationEntry[] | null;
};
export default function NoData(data: PropTypes) {
  return (
    <>
      {!data && (
        <div className="col-span-full hidden h-full rounded-lg border border-slate-600 text-2xl md:flex md:items-center md:justify-center">
          <div className="px-4">
            Gib deine Daten ein oder wähle ein Szenario...
          </div>
        </div>
      )}
    </>
  );
}
