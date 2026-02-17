// Removed TypeScript-only import; this is a plain JS file.
import HeroSection from "@/app/components/api/ApiHeroSection";
import ProblemSection from "@/app/components/api/ProblemSection";
import CategoryOverview from "@/app/components/api/CategoryOverview";
import AutomationSection from "@/app/components/api/AutomationSection";
import PaymentsSection from "@/app/components/api/PaymentsSection";
import EmailSection from "@/app/components/api/EmailSection";
import AISection from "@/app/components/api/AISection";
import AnalyticsSection from "@/app/components/api/AnalyticsSection";
import AuthSection from "@/app/components/api/AuthSection";
import SeaOfApis from "@/app/components/api/SeaOfApis";
import ArchitectureSection from "@/app/components/api/ArchitectureSection";
import SelfDiagnosis from "@/app/components/api/SelfDiagnosis";
import CTASection from "@/app/components/api/CTASection";
import SectionDivider2 from "@/app/components/SectionDivider2";

export const metadata = {
  title: "API Ecosystem | 4TEK Infrastructure",
  description:
    "Explore 4TEK's API ecosystem integrating payments, AI, automation, analytics, and authentication into a unified business infrastructure.",
  keywords: [
    "API integration",
    "Payment APIs",
    "Automation APIs",
    "AI APIs",
    "Stripe integration",
    "OpenAI integration",
  ],
};

export default function ApiPage() {
  return (
    <>
      <HeroSection />
      <SectionDivider2 />
      <ProblemSection />
      <SectionDivider2 />
      <CategoryOverview />
      <SectionDivider2 />
      <section id="automation"><AutomationSection /></section>
      <SectionDivider2 />
      <section id="payments"><PaymentsSection /></section>
      <SectionDivider2 />
      <section id="ai"><AISection /></section>
      <SectionDivider2 />
      <section id="email"><EmailSection /></section>
      <SectionDivider2 />
      <section id="analytics"><AnalyticsSection /></section>
      <SectionDivider2 />
      <AuthSection />
      <SectionDivider2 />
      <SeaOfApis />
      <SectionDivider2 />
      <ArchitectureSection />
      <SectionDivider2 />
      <SelfDiagnosis />
      <SectionDivider2 />
      <CTASection />
    </>
  );
}