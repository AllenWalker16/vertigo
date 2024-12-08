import React from "react";
import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebaritemProps {
    icon: IconType;
    label:  string;
    active?: boolean;
    href: string;
}
const SidebarItem: React.FC<SidebaritemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return ( 
        <Link href={href} className={twMerge("flex flex-row h-auto items-center w-full font-medium gap-x-4 cursor-pointer hover:text-white transition text-neutral-500 py-1", active && "text-white")}>
            <Icon size={24} />
            <p className="truncate w-full">{label}</p>
        </Link>
     );
}
 
export default SidebarItem;