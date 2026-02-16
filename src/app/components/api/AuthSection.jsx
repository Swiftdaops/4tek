"use client";

import { KeyRound, ShieldCheck, Smartphone } from "lucide-react";

const authApis = [
  {
    name: "Clerk",
    description: "Modern passwordless authentication.",
    icon: KeyRound,
  },
  {
    name: "Auth0",
    description: "Enterprise-grade identity management.",
    icon: ShieldCheck,
  },
  {
    name: "Firebase Auth",
    description: "Simple authentication for web & mobile apps.",
    icon: Smartphone,
  },
];

export default function AuthSection() {
  return (
    <section
      id="auth"
      className="py-24 px-6 bg-white"
      aria-labelledby="auth-heading"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div>
          <h2
            id="auth-heading"
            className="text-4xl md:text-5xl font-bold text-stone-950 mb-6"
          >
            Remove Login Friction. Increase Access.
          </h2>

          <p className="text-lg text-stone-700 max-w-xl">
            Modern identity infrastructure that reduces user drop-off,
            eliminates password fatigue, and secures your platform at scale.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-8">
          {authApis.map((api, index) => {
            const Icon = api.icon;

            return (
              <div
                key={index}
                className="card p-8 text-white transition-all duration-300 hover:scale-[1.02]"
              >
                <Icon className="w-10 h-10 mb-6 text-blue-300" />

                <h3 className="text-xl font-semibold mb-3">
                  {api.name}
                </h3>

                <p className="text-sm opacity-90">
                  {api.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}