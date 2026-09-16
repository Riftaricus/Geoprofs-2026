import { useState } from "react";

export default function Login() {
    const [error, setError] = useState("");
    const [tries, setTries] = useState(0);

    function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (tries == 3){
            // simulate lockout logic, refresh alows for retries as of now
            alert("try again later");
            return
        }

        setTries(tries + 1);

        let username: string = event.target.username.value;
        let password: string = event.target.password.value;

        if (username == "" || password == "") {
            setError("Username or password empty");
        } else {
            // temp alert until login endpoints
            setError("");
            alert(`username: ${event.target.username.value}\npassword: ${event.target.password.value}`)
        }
    }

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className='h-[50%] w-[40%] flex justify-center items-center rounded-2xl bg-[#0b2e48]'>
                <form className="flex flex-col items-center justify-around w-[80%] h-[90%]" method="POST" onSubmit={(e) => { onSubmit(e) }}>
                    <img className="rounded-2xl" src="https://placehold.co/600x400" alt="placeholder" />

                    {
                        error ? <p className="text-red-600 text-xl">{error}</p> : <p></p>
                    }

                    <div className="h-[20%] w-[90%] flex flex-col justify-around text-xl">
                        <input className="w-full h-[40%] text-black bg-[#F3F4F6] rounded-full pl-2 focus:border-0 focus:outline-0" type="text" name="username" placeholder="Gebruikersnaam" />
                        <input className="w-full h-[40%] text-black bg-[#F3F4F6] rounded-full pl-2 focus:border-0 focus:outline-0" type="password" name="password" placeholder="Wachtwoord" />
                    </div>

                    <div className="h-[10%] w-[90%] flex justify-between items-center">
                        <button className="w-[45%] h-[80%] bg-[#3FB950] rounded-full text-black text-xl" type="submit">Login</button>
                        <button className="w-[45%] h-[80%] bg-[#2b8036] rounded-full text-black text-xl" type="submit">Forgot</button>
                    </div>
                </form>
            </div>
        </div>
    )
}