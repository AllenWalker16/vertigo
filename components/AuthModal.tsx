"use client";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Modal from "./Modal";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

//uses client
const AuthModal = () => {
    const SupabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen} = useAuthModal();

    useEffect(() => {
      if(session){
        router.refresh();
        onClose();
      }
    }, [session, router, onClose])
    

    const onChange = (open: boolean) => {
        if (!open){
            onClose();
        }
    }
    // we create a variable in the authModal to not keep the login popup active by default. with properties {onClose and isOpen}. then create variable onChange to track the changes 
    // if the dialog is not open then it should be closed.
    return ( 
        //the modal itself will be a boilerplate to use login functionalities with the text welcome back and Login into your account as its headers
        //then we import Auth from supabase/ui-react
        //this Auth will give us a default Login template which we can then set the providers into whatever providers we want
        //we change the theme to ThemeSupa, and we can then modify some values in our variables in the case we want to change things like colors
        //variables --> default --> colors (all are objects btw) then under colors we enter a key of brand and current brand and provide with it an equivalent hexcode
        //we can add a magic link as well by adding the magic link to the auth component
        // the magic link we grant us an avenue to login without using our actual passwords to login
        // the link would be sent to either email or via phone etc

        <Modal title="Welcome Back!" description="Login into your account" isOpen={isOpen} onChange={onChange}>
            <Auth supabaseClient={SupabaseClient} theme="dark" magicLink providers={["github", "google"]} appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22cbbe'
                        }
                    }
                }
            }}
        />
        </Modal>
     );
}
 
export default AuthModal;