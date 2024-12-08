//import everything in radix dialog
import * as Dialog from "@radix-ui/react-dialog";
import { Chilanka } from "next/font/google";
import {IoMdClose} from "react-icons/io"

//create a prop for the modal component
//include all the properties and values we would need in our modal
interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

//extract the props here
const Modal: React.FC<ModalProps> = ({
    isOpen, onChange, title, description, children
}) => {
    return ( 
        //we make use of inbuilt properties of the Dialog.root i.e Open default open and openChange. then we set it to be the props we created earlier
        //root will be the mother tag then in root we'll have portal--> overlay --> content --> title --> description --> children --> close
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
                <Dialog.Content className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md p-[25px] bg-neutral-800 focus:outline-none">
                    <Dialog.Title className=" text-xl text-center font-bold mb-4">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="mb-5 text-sm leading-normal text-center">
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex appearance-none w-[25px] h-[25px] items-center justify-center rounded-full focus:outline-none">
                            <IoMdClose/>
                        </button>
                    </Dialog.Close>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
     );
}
export default Modal;
