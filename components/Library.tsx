"use client";
import {TbPlaylist} from "react-icons/tb"
import {AiOutlinePlus} from "react-icons/ai"

const Library = () => {
    const onClick = () => {
        //handle song uploads later
        //triggered by the + sign to upload songs
        return "a"
    }
    return ( 
        <div className="flex flex-col">
            <div className="flex justify-between items-center py-4 px-5">
                <div className="inline-flex gap-x-2 items-center text-neutral-400">
                    <TbPlaylist size={24} />
                    <p className="font-medium"> Your Library</p>
                </div>
                <AiOutlinePlus size={18} className="cursor-pointer text-neutral-400 transition hover:text-white" onClick ={onClick}/>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                list of songs
            </div>
        </div>
     );
}
 
export default Library;