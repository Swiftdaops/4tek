import OperationalSaaSPage from "../components/OperationalSaaSPage";
import WhatIsSaaSSection from "../components/WhatIsSaaSSection";
import SystemBlueprintSection from "../components/SystemBlueprintSection";
import FinalCTASection from "../components/FinalCTASection";

export default function SaasPage() {
	return (
		<main>
			<OperationalSaaSPage />
			<WhatIsSaaSSection />
			<SystemBlueprintSection />
            <FinalCTASection />
		</main>
	);
}

