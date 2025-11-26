import { Check, PlusIcon } from "lucide-react";

type PropTypes = {
  plus?: boolean;
  children: React.ReactNode
};
export default function BulletPointItem({ plus, children }: PropTypes) {
  return (
    <div className="flex gap-x-2 lg:text-sm xl:text-base">
    { plus ?
      <span className="inline-block h-fit rounded-full dark:bg-green-900/20 bg-green-50"><PlusIcon /></span>
    : 
      <span className="inline-block rounded-full h-fit dark:bg-purple-950/40 bg-purple-50"><Check /></span>
    }
    { children }
    </div>
  );
}
