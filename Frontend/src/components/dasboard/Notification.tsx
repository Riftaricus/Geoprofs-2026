type NotificationType = {
    reason_sm?: string | undefined,
    subject: string,
    status: string
}

type MotificationProps = {
    message: NotificationType
}

const colors: Record<string, string> = {
    "rejected": "bg-red-400",
    "pending": "bg-orange-400",
    "accepted": "bg-green-400",
};

export function Notification({ message }: MotificationProps) {
    return (
        <div className="h-[15vh] w-full p-2 grid grid-cols-3 rounded-2xl text-center text-xl bg-[#d4d0d078]">
            <p>{message.subject}</p>

            {
                message.reason_sm ?? <p>{message.reason_sm}</p>
            }
            
            <p>
                <span className={`w-fit px-3 py-0.5 text-md rounded-full ${colors[message.status]}`}>
                    <b>{message.status}</b>
                </span>
            </p>
        </div>
    );
}