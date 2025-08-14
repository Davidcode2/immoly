import Image from "next/image";
export default function Footer() {
  return (
    <div className="bg-[var(--secondary)]">
      <div className="flex justify-center gap-x-2 p-8 text-[var(--dark-accent)]/50">
        Gebaut auf der{" "}
        <Image
          src="/images/icons/icons8-couch-85.png"
          width="25"
          height="25"
          alt="Sofa"
        />
      </div>
      <div className="grid p-8">
        <a
          href="https://www.flaticon.com/free-icons/attention"
          title="attention icons"
        >
          Attention icons created by Good Ware - Flaticon
        </a>
        <span>Icons by <a href="https://www.icons8.de" title="Flaticon">Icons8</a></span> 
      </div>
    </div>
  );
}
