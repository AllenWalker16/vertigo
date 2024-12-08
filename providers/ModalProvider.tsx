//we make our provider use client instead of server
"use client";

import AuthModal from "@/components/AuthModal";
//custom import
import Modal from "@/components/Modal";
//package import
import { useEffect, useState } from "react";

//we create a sfc called ModalProvider and then we use a useState hook to set mount status.

const ModalProvider = () => {
    //we set the initial value of our mounted state to be false.
    const [isMounted, setIsMounted] = useState(false);

    //then we set the state to true so far the condition in the if statement below isnt met.
    useEffect( () => {
        setIsMounted(true);
    }, []);

    //i.e if its not mounted return null/nothing. 
    if (!isMounted) {
        return null
    }
    return ( 
        <AuthModal />
     );
}
 
export default ModalProvider;