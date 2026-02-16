import { Workflow } from "lucide-react";

const apis = [
  {
    name: "Zapier",
    desc: "Automate repetitive tasks across 5,000+ apps.",
    hover: "Use if: Your team manually copies data between tools.",
  },
  {
    name: "HubSpot API",
    desc: "Automate lead capture, pipelines, and follow-ups.",
    hover: "Use if: You lose leads due to inconsistent follow-ups.",
  },
  {
    name: "Make",
    desc: "Build advanced logic-based workflows visually.",
    hover: "Use if: You need conditional automation across systems.",
  },
  {
    name: "Twilio",
    desc: "Automated SMS and communication triggers.",
    hover: "Use if: Customers need instant updates or alerts.",
  },
];

export default function AutomationSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold text-stone-950 mb-6">
            Automate Operations. Eliminate Repetition.
          </h2>
          <p className="text-stone-700">
            Connect your systems so orders, payments, emails, and updates
            trigger automatically — without human intervention.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {apis.map((api, i) => (
            <div
              key={i}
              className="card p-6 text-white transition hover:scale-105"
            >
              <h4 className="font-semibold mb-2">{api.name}</h4>
              <p className="text-sm">{api.desc}</p>
              <p className="text-xs mt-3 opacity-80">{api.hover}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}