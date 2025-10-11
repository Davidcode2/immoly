import author_coding_grandpa from "/public/images/author_coding_looking_like_a_grandpa.webp";
import Image from "next/image";
export default function AboutIntro() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Image
        src={author_coding_grandpa}
        alt="Picture of the author"
        width={500}
        height={500}
        className="justify-self-center rounded-full"
      />
      <div className="text-lg">
        <h4 className="text-4xl">Hi, ich bin Jakob</h4>
        <p className="py-6">
          Vor einiger Zeit haben wir uns gefragt, wie es wohl wäre, endlich in
          den eigenen vier Wänden zu wohnen. Also haben wir angefangen, uns
          intensiver mit dem Thema Immobilienfinanzierung zu beschäftigen –
          voller Motivation und mit vielen Fragen im Kopf. Relativ schnell
          mussten wir allerdings feststellen, dass der Traum vom Eigenheim gar
          nicht so einfach zu finanzieren ist. Die Zahlen haben uns ziemlich
          schnell auf den Boden der Tatsachen zurückgeholt.
        </p>
        <p>
          Auf der Suche nach einem guten Tilgungsrechner bin ich dann durch
          einige Online-Tools gegangen. So richtig zufrieden war ich mit keinem
          davon. Viele beantworteten nur die Frage: &ldquo;Was kann ich mir
          leisten?&rdquo;. Andere wollten direkt meine persönlichen Daten, bevor
          überhaupt eine Berechnung möglich war. Also habe ich mir gedacht:
          Warum nicht selbst einen Rechner bauen, der modern aussieht,
          transparent funktioniert und Spaß macht?
        </p>
        <p>
          Aus dieser Idee ist <strong>Immoly.io</strong> entstanden – ein
          Projekt aus echtem Interesse und mit viel Liebe zum Detail. Ich hoffe,
          dass du damit genauso gerne herumrechnest, wie ich daran gearbeitet
          habe. Und falls du unseren Traum vom Eigenheim ein kleines Stück mit
          unterstützen möchtest, kannst du das tun, indem du auf einen unserer
          Affiliate-Links klickst. So hilfst du uns, ohne dass es dich etwas
          kostet.
        </p>
        <p>Viel Spaß beim Rechnen und Planen.</p>
      </div>
    </div>
  );
}
