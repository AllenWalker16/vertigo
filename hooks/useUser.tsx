import { UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { Subscription } from "@supabase/auth-js";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined //by default
); 

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    //using supabase to fetch from database
    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trial', 'active']).single();

    useEffect(() => {
        //if user is currently logged in but its not loading data and we cant get user details or subscriptions then set isLoadingData to be true
      if (user && !isLoadingData && !userDetails && !subscription){
        setIsLoadingData(true)
        //promises here ensure that once everything is settled you should get user details and subscription details. since both these data are in the array we call an arbitrary arrow function (result) which would fetch them in correspondence. userDetailsPromise would fetch for the first result and subscriptionPromise would get the other result i.e indexes 0 and 1
        Promise.allSettled([getUserDetails() ,getSubscription()]).then(
            (results) => {
                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];
                //if the above parameters for userDetails and subscription were met & fufilled then u can set the value of both promised data as the original data and then make setIsLoadingData as false since we're no longer fetching any data
                if(userDetailsPromise.status === "fulfilled"){
                    setUserDetails(userDetailsPromise.value.data as UserDetails);
                }
                if(subscriptionPromise.status === "fulfilled"){
                    setSubscription(subscriptionPromise.value.data as Subscription);
                }
                setIsLoadingData(false);
            }
        );
        //if user isnt logged in and it isnt trying to load neither the user or the data then 
      } else if (!user && !isLoadingUser && !isLoadingData){
        setUserDetails(null);
        setSubscription(null);

      }
    }, [getSubscription, getUserDetails, isLoadingData, isLoadingUser, subscription, user, userDetails]);
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingData || isLoadingUser,
        subscription
    }
    //return the values of the user context that was created initially using createContext
    return <UserContext.Provider value={value} {...props}/>
}

//exporting the hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined){
        throw new Error('useUser must be used within a MyUserContextProvider');
    }
    return context;
};