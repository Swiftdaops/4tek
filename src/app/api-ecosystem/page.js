// Removed TypeScript-only import; this is a plain JS file.
import HeroSection from "@/components/api/HeroSection";
import ProblemSection from "@/components/api/ProblemSection";
import CategoryOverview from "@/components/api/CategoryOverview";
import AutomationSection from "@/components/api/AutomationSection";
import PaymentsSection from "@/components/api/PaymentsSection";
import AISection from "@/components/api/AISection";
import AnalyticsSection from "@/components/api/AnalyticsSection";
import AuthSection from "@/components/api/AuthSection";
import SeaOfApis from "@/components/api/SeaOfApis";
import ArchitectureSection from "@/components/api/ArchitectureSection";
import SelfDiagnosis from "@/components/api/SelfDiagnosis";
import CTASection from "@/components/api/CTASection";

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
      <ProblemSection />
      <CategoryOverview />
      <AutomationSection />
      <PaymentsSection />
      <AISection />
      <AnalyticsSection />
      <AuthSection />
      <SeaOfApis />
      <ArchitectureSection />
      <SelfDiagnosis />
      <CTASection />
    </>
  );
}