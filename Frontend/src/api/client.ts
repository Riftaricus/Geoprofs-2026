const API_URL = import.meta.env.VITE_API_URL ?? "";

//fout van de API, met de status en de body van het antwoord erbij zodat
//pagina's veldfouten (bijv. validatie van een formulier) kunnen tonen
export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function saveToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("auth_token");
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = getToken();

  if (token) {
    headers.set("Authorization", `Token ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new ApiError(
      body?.detail ?? `API-fout: ${response.status}`,
      response.status,
      body,
    );
  }

  if (response.status == 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
