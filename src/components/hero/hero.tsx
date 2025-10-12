import CursorSwarm from "./cursor-swarm";

export default function Hero() {
  return (
    <div className="rounded-lg border-[var(--accent)]">
      <div className="rounded-lg p-4 md:p-8">
        <div className="absolute left-48">
          <CursorSwarm />
        </div>
        <h1 className="text-6xl font-extrabold">Immoly</h1>
      </div>
    </div>
  );
}
