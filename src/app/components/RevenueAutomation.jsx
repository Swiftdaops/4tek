"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, MessageCircle, Calendar, Box, Globe, BarChart3, ShieldCheck, Binary } from "lucide-react";

const automationCards = [
  {
    title: "Order Management",
    desc: "Automatically confirm, process, and track orders across WhatsApp, email, and dashboards—no manual intervention.",
    icon: <Zap className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Payment Processing",
    desc: "Automate invoices, recurring billing, and payment reminders. Supports global gateways like Paystack, Stripe, and crypto.",
    icon: <DollarSign className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Customer Support / Chatbots",
    desc: "AI-powered chatbots handle FAQs and inquiries instantly, freeing your team for complex issues.",
    icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Lead & CRM Automation",
    desc: "Automatically capture leads from forms, ads, or emails and route them through follow-ups, scoring, and segmentation.",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Inventory & Supply Chain",
    desc: "Real-time stock updates, automated reorder alerts, and supplier notifications to prevent overstock or stockouts.",
    icon: <Box className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Email & Marketing Automation",
    desc: "Trigger newsletters, drip campaigns, and personalized offers based on user behavior and purchase history.",
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Data Analytics & Reporting",
    desc: "Auto-generate dashboards for sales, revenue, and customer metrics to make informed decisions fast.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Appointment & Scheduling",
    desc: "Customers self-book, reschedule, and get automated reminders—no manual calendar updates.",
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Employee Workflow Automation",
    desc: "Assign tasks, track progress, and automate approvals across teams to keep operations seamless.",
    icon: <Zap className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Document & Compliance Automation",
    desc: "Auto-generate invoices, contracts, and compliance documents from templates, reducing human error.",
    icon: <Binary className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "E-commerce & Checkout Automation",
    desc: "Automate abandoned cart reminders, upsells, cross-sells, and stock updates to maximize revenue.",
    icon: <DollarSign className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Integration Automation",
    desc: "Connect apps via API, Zapier, or Make to synchronize processes and eliminate repetitive data entry.",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
  },
];

export default function RevenueAutomation() {
  return (
    <section id="revenue-automation" className="py-24 gradient text-stone-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Revenue Operations — Automation</h2>
        <p className="text-center text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12">
          Manual processes are costly. Automation eliminates repetitive tasks, reduces errors, and accelerates growth. Here’s how 4Tek transforms business operations:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {automationCards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 p-3 bg-blue-50 w-fit rounded-xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}