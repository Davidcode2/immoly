import Image from "next/image";
import EditIcon from "/public/images/icons/icons8-edit-48.png";

type PropTypes = {
  setShowModal: (arg1: boolean) => void;
};
export default function EditIconComponent({ setShowModal }: PropTypes) {
  return (
    <div
      className="absolute top-5 right-4 cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      <div className="group z-30 inline-block rounded-xl border-[var(--dark-accent)] md:p-1 md:px-2 text-xs transition-colors hover:bg-[var(--dark-accent)] hover:text-[var(--secondary)] md:border">
        <div className="hidden pr-1 md:inline-block">Mehr</div>
        <Image
          className="hidden opacity-50 group-hover:opacity-60 group-hover:invert md:inline-block dark:invert"
          src={EditIcon}
          width={14}
          height={14}
          alt="Bearbeiten"
        />
        <div className="inline-block opacity-50 group-hover:opacity-60 group-hover:invert md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
