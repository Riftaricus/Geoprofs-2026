import type { UserProfile } from "./model";

export async function getProfile(): Promise<UserProfile> {
  const response = await fetch("/profile/", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Profiel ophalen mislukt");
  }

  return response.json();
}
