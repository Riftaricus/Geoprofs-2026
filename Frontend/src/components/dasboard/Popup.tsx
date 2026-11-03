import type { ReactNode } from "react"

type PopUpProps = {
    children: ReactNode;
    closerCallback: CallableFunction;
}

export function PopUp({ children, closerCallback }: PopUpProps) {
    function closePopUp(elements: React.MouseEvent<HTMLDivElement, MouseEvent>){
        let notif = document.getElementById("notif");
        let bg = document.getElementById("notifBG");

        if (elements.target != notif && elements.target == bg){
            closerCallback()
        }
    }
    
    return (
        <div id="notifBG" onClick={(elms) => closePopUp(elms)} className="h-full w-full absolute top-0 left-0 z-100 flex justify-center items-center bg-[#00000036]">
            <div id="notif" className="bg-[#eae9e9] border border-slate-200 flex justify-center items-center h-fit w-fit rounded-2xl p-2">
                {children}
            </div>
        </div>

    )
}