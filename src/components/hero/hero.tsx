import CursorSwarm from "./cursor-swarm";
import Logo from "./logo";

export default function Hero() {
  return (
    <div className="rounded-lg border-[var(--accent)]">
      <div className="rounded-lg p-4 md:p-8">
        <div className="absolute left-48">
          <CursorSwarm />
        </div>
        <Logo isLink={false}/>
      </div>
    </div>
  );
}
