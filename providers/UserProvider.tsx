"use client"

import { MyUserContextProvider } from "@/hooks/useUser";
import { ReactNode } from "react"

//create a prop with a property children that has the value of ReactNode
interface UserProviderProps{
    children: ReactNode;
}
//after wards create the actual provider that is going to extract the children in the prop u created above
const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
};

export default UserProvider;
//go back into layout and inside the Supabase provider tag include this userprovider tag as well