"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx"
import router from "next/router";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import Image from "next/image";
import useAuthModal from "@/hooks/useAuthModal";


interface HeaderProps {
    children : React.ReactNode;
    className? : string;
}

const Header: React.FC<HeaderProps> = ({children, className}) => {
    //to use the authModal login pop up when login or signup is clicked add it to the header component
    //const {} = useAuthmodal()
    const authModal = useAuthModal();
    const routes = useRouter();

    const handleLogout = () =>{
        //handle logging out in the future
    }
    return ( 
        <div className={twMerge("h-fit bg-gradient-to-r from-emerald-800 p-6 relative", className)}>
            <div className="flex items-center justify-between w-full mb-4">
                <div className=" hidden md:flex gap-x-2 items-center z-20">
                    <button className="flex items-center justify-center rounded-full hover:opacity-75 bg-black transition" onClick={ () => router.back}>
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button className="flex items-center justify-center rounded-full hover:opacity-75 bg-black transition" onClick={ ()=> router.forward}>
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="md:hidden flex gap-x-2 items-center z-20">
                    <button className="bg-white p-2 rounded-full flex items-center justify-center hover:opacity-75 transition">
                        <HiHome size={20} className="text-black" />
                    </button>
                    <button className="bg-white p-2 rounded-full flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch size={20} className="text-black" />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4 z-20">
                    <>
                        <div>
                            <Button className="bg-transparent text-white font-medium" onClick={authModal.onOpen}>
                                Sign Up
                            </Button>
                        </div>
                        <div>
                            <Button className="bg-white px-6 py-2 font-medium" onClick={authModal.onOpen}>
                                Login
                            </Button>
                        </div>
                    </>

                </div>
            </div>
            <div className="z-10">
               <Image src={"/images/Frame-13-p-1600.png"} fill className="object-contain object-right blur-[1px]" alt={"background"} />
            </div>
            {children}
        </div>
     );
}
 
export default Header;