import DarkModeToggle from "../darkModeToggle";
import SiteMenu from "./siteMenu";

export default function IconsHeader() {

  return (
    <div className="flex gap-2">
      <DarkModeToggle/>
      <SiteMenu/>
    </div>
  );
}
