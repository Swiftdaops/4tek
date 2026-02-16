import { Workflow, CreditCard, Brain, Mail, BarChart3, Shield } from "lucide-react";

const categories = [
  { title: "Automation & Workflow", icon: Workflow },
  { title: "Payments & Fintech", icon: CreditCard },
  { title: "AI & Digital Sales Reps", icon: Brain },
  { title: "Email & Communication", icon: Mail },
  { title: "Analytics & Intelligence", icon: BarChart3 },
  { title: "Authentication & Identity", icon: Shield },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 px-6 gradient text-center">
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i} className="card p-10 text-white hover:scale-105 transition">
              <Icon className="w-10 h-10 mx-auto mb-6" />
              <h3 className="text-xl font-semibold">{cat.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}