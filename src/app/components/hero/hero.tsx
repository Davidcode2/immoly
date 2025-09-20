import IconsHeader from "../iconsHeader";
import CursorSwarm from "./cursor-swarm";

export default function Hero() {
  return (
    <div className="rounded-lg border-[var(--accent)]">
      <div className="rounded-lg p-4 backdrop-blur md:p-8">
        <div className="absolute left-48">
          <CursorSwarm />
        </div>
        <h1 className="text-6xl font-extrabold">Immoly</h1>
        <div className="p-2">
          <IconsHeader />
        </div>
      </div>
    </div>
  );
}
