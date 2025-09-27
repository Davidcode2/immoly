import Image from "next/image";
export default function Footer() {
  return (
    <div className="grid gap-y-8 bg-[var(--secondary)] p-8 dark:bg-[var(--background)]">
      <div className="flex gap-2">
        <a href="https://github.com/davidcode2">
          <svg
            viewBox="0 0 100 100"
            className="mt-[3px] h-5 w-5 fill-black dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            />
          </svg>
        </a>
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-[4px] h-6 w-[22px] fill-black dark:fill-white"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.55284 3.00012C7.93598 3.00012 7.23841 3.06514 6.57209 3.29224C2.55494 4.60387 1.26341 8.894 2.39877 12.43L2.40354 12.4448L2.40877 12.4595C3.03435 14.2174 4.04226 15.8127 5.35336 17.1249L5.36091 17.1324L5.36862 17.1398C7.23782 18.9323 9.27254 20.4953 11.4756 21.8515L11.9934 22.1703L12.5147 21.8573C14.7226 20.5315 16.7964 18.9254 18.6432 17.1474L18.649 17.1419L18.6547 17.1362C19.9771 15.8215 20.9851 14.2144 21.6015 12.4549L21.6066 12.4402L21.6113 12.4253C22.7251 8.89703 21.4401 4.60176 17.4507 3.30948C16.7976 3.09221 16.1236 3.00012 15.4648 3.00012C13.9828 3.00011 12.8858 3.62064 12.0004 4.25309C11.1219 3.62545 10.0176 3.00012 8.55284 3.00012Z"
            ></path>{" "}
          </g>
        </svg>
        <a href="https://www.linkedin.com/in/jakob-lingel-613976253/">
          <Image
            src="/images/icons/linkedin.png"
            alt="Linkedin Icon"
            width={24}
            height={24}
            className="dark:invert"
          />
        </a>
      </div>
      <div className="grid text-xs">
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
      <div className="flex gap-x-2 text-[var(--dark-accent)]/50 dark:text-[var(--foreground)]">
        Gebaut auf der{" "}
        <Image
          src="/images/icons/icons8-couch-85.png"
          width="25"
          height="25"
          alt="Couch"
        />
      </div>
    </div>
  );
}
