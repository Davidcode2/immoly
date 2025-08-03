export default function NebenkostenDisplay() {
  return (
    <div className="flex md:flex-col overflow-y-auto items-center md:items-start h-24 md:max-h-none md:w-fit md:max-w-58 md:h-48 gap-x-4 gap-y-2 rounded-lg p-3 md:p-8 shadow backdrop-blur-2xl">
      <h1 className="text-2xl font-bold">Nebenkosten</h1>
      <p className="text-lg">Hier werden die Nebenkosten für Ihre Wohnung angezeigt.</p>
      <p className="text-sm text-gray-500">Die Berechnung basiert auf Ihren Eingaben.</p>
    </div>
  )
}
