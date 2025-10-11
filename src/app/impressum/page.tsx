import Image from "next/image";
export default function Impressum() {
  return (
    <main className="mb-20 max-w-full px-10 md:px-24 py-16">
      <h1 className="mb-6 text-3xl font-bold">Impressum</h1>
      <div className="grid lg:grid-cols-2">
        <div>
          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mb-1 font-medium">Immoly.io</p>
            <p>Jakob Lingel</p>
            <p>Amselweg 3</p>
            <p>73560 Böbingen an der Rems</p>
            <p>Deutschland</p>
          </section>
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Vertreten durch</h2>
            <p>Jakob Lingel</p>
          </section>
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Kontakt</h2>
            <div className="flex items-center gap-x-2">
              <span>LinkedIn</span>
              <a
                className="inline-block text-center"
                href="https://www.linkedin.com/in/jakob-lingel-613976253/"
              >
                <Image
                  src="/images/icons/linkedin.png"
                  alt="Linkedin Icon"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </a>
            </div>
            <p>
              Website:{" "}
              <a
                href="https://immoly.io"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://immoly.io
              </a>
            </p>
          </section>
        </div>
        <div>
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
              <br />
              TBD
            </p>
          </section>
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>Jakob Lingel</p>
            <p>Amselweg 3</p>
            <p>73560 Böbingen an der Rems</p>
            <p>Deutschland</p>
          </section>
        </div>
      </div>
      <section>
        <h2 className="mb-2 text-lg font-semibold">Haftungsausschluss</h2>
        <p>
          Die auf dieser Website bereitgestellten Informationen und
          Berechnungen, insbesondere die Ergebnisse des Tilgungsrechners, dienen
          ausschließlich zu Informationszwecken und stellen keine Finanz- oder
          Anlageberatung dar. Trotz sorgfältiger Prüfung und regelmäßiger
          Aktualisierung übernehmen wir keine Gewähr für die Richtigkeit,
          Vollständigkeit und Aktualität der bereitgestellten Inhalte. Die
          Nutzung des Rechners erfolgt auf eigene Verantwortung.
        </p>
        <p>
          Eine Haftung für eventuelle Schäden, die direkt oder indirekt aus der
          Nutzung des Tilgungsrechners entstehen, ist ausgeschlossen.
        </p>
        <p>
          Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber
          verantwortlich.
        </p>
      </section>
    </main>
  );
}
