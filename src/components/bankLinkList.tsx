import BankOffer from "./bankOffer";

export default function BankLinkList() {
  return (
    <div className="px-3 py-[100px] 2xl:max-w-[1000px] max-w-screen mx-auto">
      <div className="flex flex-col gap-20">
        <BankOffer
          title="MSB SparDarlehen"
          interest={3.8}
          zinsbindung={20}
          imageSrc="/images/msb_bank.png"
        />
        <BankOffer
          title="SuperBauDarlehen der BKB"
          interest={3.6}
          zinsbindung={10}
          imageSrc="/images/bkb_bank.png"
        />
        <BankOffer
          title="TRD ImmoKredit"
          interest={3.5}
          zinsbindung={10}
          imageSrc="/images/trd_bank.png"
          sondertilgungen={5}
        />
        <BankOffer
          title="Hier könnte Ihr Unternehmen stehen"
          interest={3.4}
          zinsbindung={20}
          imageSrc="/images/ihre_bank.png"
          sondertilgungen={8}
        />
      </div>
    </div>
  );
}
