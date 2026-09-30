import type { UserProfile } from "./model";

export async function editProfile(
  data: Partial<UserProfile>,
): Promise<UserProfile> {
  const response = await fetch("/profile/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Profiel aanpassen mislukt");
  }

  return response.json();
}
