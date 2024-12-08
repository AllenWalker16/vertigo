"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa"

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}
const ListItem : React.FC<ListItemProps> = ({image, name, href}) => {
    const router = useRouter();
    const onClick = () => {
        //add authentication before push
        router.push(href);
    }
    return (
        <button onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image className="object-cover" fill src={image} alt="Image"/>
            </div>
            <p className="text-white font-medium truncate py-5">{name}</p>

            <div className="opacity-0 transition absolute flex rounded-full items-center justify-center bg-emerald-500 p-4 drop-shadow-md hover:scale-110 group-hover:opacity-100 right-4">
                <FaPlay className="text-black" />
            </div>
        </button>

    );
}
 
export default ListItem;