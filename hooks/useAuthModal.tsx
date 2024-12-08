import {create} from 'zustand'

//isOpen would be a property with type boolean
//onOpen would be void by default but would be set to Open if the isOpen property is set to true
//reverse is the case for the onclose as it would be void by default but would be closed when the isOpen property is set to faulse

//create modal store which would serve as a props to house the auth modal and its properr
interface AuthModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: ()=> void;
}
const useAuthModal = create<AuthModalStore> ((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () =>set({isOpen: false})
}))

export default useAuthModal;