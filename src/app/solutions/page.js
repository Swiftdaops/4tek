import InfrastructureSection from "../components/InfrastructureSection";
import SearchEngineering from "../components/SearchEngineering";
import RevenueAutomation from "../components/RevenueAutomation";
import FinancialSystemsSection from "../components/FinancialSystemsSection";
import ConversionScienceSection from "../components/ConversionScienceSection";
import SectionDivider from "../components/SectionDivider";

export default function SolutionsPage() {
	return (
		<main>
			<InfrastructureSection />
			<SectionDivider />
			<SearchEngineering />
			<SectionDivider invert />
			<RevenueAutomation />
			<SectionDivider />
			<FinancialSystemsSection />
			<SectionDivider invert />
			<ConversionScienceSection />
            
		</main>
	);
}

