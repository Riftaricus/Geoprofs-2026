import { NavLink } from "react-router";

type NotificationType = {
    reason_sm?: string,
    subject: string
}

type NotificationProps = {
    message: NotificationType
}

export function NotificationManager({ message }: NotificationProps) {
    return(
        <div className="max-h-[15vh] w-full p-2 grid grid-cols-3 rounded-2xl text-center text-xl place-items-center bg-[#d4d0d078]">
            <p>{message.subject}</p>

            {
                <p>{message.reason_sm || "geen reden"}</p>
            }

            <NavLink className="h-fit w-fit" to={"/beoordeel"}>
                <span className="w-fit flex justify-center px-3 py-0.5 text-md rounded-full bg-orange-400">
                    <b>Beoordeel</b>
                </span>
            </NavLink>
        </div>
    );
}