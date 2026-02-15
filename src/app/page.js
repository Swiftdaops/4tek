import HeroSection from "./components/HeroSection";
import TagCloud from "./components/TagCloud";
import SolutionSection from "./components/SolutionSection";
import ProblemSection from "./components/ProblemSection";
import HowItWorksSection from "./components/HowItWorksSection";
import SectionDivider from "./components/SectionDivider";
import FinalPushCTA from "./components/FinalPushCTA";
import Solutions from "./components/Solutions";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <TagCloud />

      <SectionDivider />
      <ProblemSection className="" />

      <SectionDivider invert />
      <SolutionSection className="" />

      <SectionDivider />
      <HowItWorksSection className="" />
      <SectionDivider invert />
      <Solutions className="" />
      <SectionDivider />
      <FinalPushCTA className="" />
    </main>
  );
}
