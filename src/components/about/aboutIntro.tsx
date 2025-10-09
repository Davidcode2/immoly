import author_coding_grandpa from "/public/images/author_coding_looking_like_a_grandpa.png";
import Image from "next/image";
export default function AboutIntro() {
  return (
      <div className="grid lg:grid-cols-2 gap-10">
        <Image
          src={author_coding_grandpa}
          alt="Picture of the author"
          width={500}
          height={500}
          className="justify-self-center rounded-full"
        />
        <div>
          <h4 className="text-4xl">Hi, ich bin Jakob</h4>
          <p className="py-6">
            Vor einiger Zeit haben wir uns gefragt wie es wäre in den eigenen
            vier Wänden zu wohnen. Also haben wir uns mit Immobilienfinanzierung
            beschäftigt und schnell herausgefunden, dass die Kohle nicht reicht.
            Jedenfalls war ich mit den Tilgungsrechnern die ich online gefunden
            habe nicht zufrieden, da sie entweder nicht schön aussahen oder nur
            meine Daten abgreifen wollten. Ich dachte, es wäre vielleicht ganz
            nett, einen eigenen Rechner zu bauen. Immoly.io ist das Ergebnis.
            Ich hoffe, dass du Spaß damit hast. Du kannst auch unseren
            Immobilientraum unterstützen, indem du auf einen der Affiliate-Links
            klickst.
          </p>
        </div>
      </div>
  );
}
