
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Vul je e-mailadres en wachtwoord in.");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Inloggen is mislukt.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#0b2e48] p-8">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-3xl font-bold text-white">
            Inloggen
          </h1>

          {error && (
            <p role="alert" className="w-full text-red-300">
              {error}
            </p>
          )}

          <div className="flex w-full flex-col gap-4">
            <label className="w-full text-white">
              E-mailadres
              <input
                className="mt-2 w-full rounded-full bg-[#F3F4F6] p-3 text-black"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="w-full text-white">
              Wachtwoord
              <input
                className="mt-2 w-full rounded-full bg-[#F3F4F6] p-3 text-black"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </div>

          <button
            className="w-full rounded-full bg-[#3FB950] p-3 text-black disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Bezig met inloggen..." : "Login"}
          </button>

          <button
            className="text-white underline"
            type="button"
            onClick={() => navigate("/forgot-password")}
          >
            Wachtwoord vergeten?
          </button>
        </form>
      </div>
    </div>
  );
}
