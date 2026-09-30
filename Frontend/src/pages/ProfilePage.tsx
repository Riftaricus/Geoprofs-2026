import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { getProfile } from "../api/profile/get";
import type { UserProfile } from "../api/profile/model";

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch {
        setError("Profiel kon niet worden opgehaald.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="worker">
        <div className="p-6">Profiel laden...</div>
      </DashboardLayout>
    );
  }

  if (error || !profile) {
    return (
      <DashboardLayout role="worker">
        <div className="p-6 text-red-600">
          {error ?? "Profiel niet gevonden."}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="worker">
      <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_220px]">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                Voor en achternaam
              </label>

              <div className="rounded-lg border border-slate-200 bg-[#F3F4F6] px-4 py-3 text-sm text-slate-800">
                {profile.first_name} {profile.last_name}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                E-mailadres
              </label>

              <div className="rounded-lg border border-slate-200 bg-[#F3F4F6] px-4 py-3 text-sm text-slate-800">
                {profile.email}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                Telefoonnummer
              </label>

              <div className="rounded-lg border border-slate-200 bg-[#F3F4F6] px-4 py-3 text-sm text-slate-800">
                {profile.phone_number || "Niet ingevuld"}
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-[#F3F4F6]">
              {profile.profile_photo ? (
                <img
                  src={profile.profile_photo}
                  alt="Profielfoto"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-slate-400">
                  Profielfoto
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-2 text-sm font-semibold text-[#0E3A5B]">
            Verlofsaldo
          </h2>

          <div className="rounded-lg border border-slate-200 bg-[#F3F4F6] px-4 py-3 text-sm text-slate-800">
            {profile.leaves} dagen
          </div>
        </div>

        <div className="mt-4">
          <h2 className="mb-3 text-sm font-semibold text-[#0E3A5B]">
            Verlof agenda
          </h2>

          {/* We moeten nog een globale agenda maken waarbij je
              verlofdagen kunt bewerken en inzien
              Dit is iets voor de volgende sprint */}
          <div className="min-h-75 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex h-full min-h-65 items-center justify-center rounded-lg bg-[#F3F4F6]">
              <p className="text-sm text-slate-400">
                Verlof agenda UNDER CONSTRUCTION
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
