import { InsightsGenerator } from "@/components/ai-insights/insights-generator";
import { Header } from "@/components/layout/header";

export default function AiInsightsPage() {
    return (
        <div className="fade-in space-y-6">
            <Header title="AI-Powered Insights" />
            <InsightsGenerator />
        </div>
    );
}
