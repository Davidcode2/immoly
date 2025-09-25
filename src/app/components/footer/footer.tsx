import Image from "next/image";
export default function Footer() {
  return (
    <div className="dark:bg-[var(--background)] bg-[var(--secondary)]">
      <div className="flex justify-center gap-x-2 p-8 dark:text-[var(--foreground)] text-[var(--dark-accent)]/50">
        Gebaut auf der{" "}
        <Image
          src="/images/icons/icons8-couch-85.png"
          width="25"
          height="25"
          alt="Couch"
        />
      </div>
      <div className="text-xs grid p-8">
        <span>
          Icons by{" "}
          <a href="https://www.icons8.de" title="Flaticon">
            Icons8
          </a>
        </span>
        <a
          href="https://www.flaticon.com/free-icons/attention"
          title="attention icons"
        >
          Attention icon created by Good Ware - Flaticon
        </a>
        <a href="https://www.flaticon.com/free-icons/maps" title="maps icons">
          House icon created by Rahman Haryanto - Flaticon
        </a>
      </div>
    </div>
  );
}
