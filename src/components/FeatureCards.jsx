import {
    FileText,
    Target,
    BookOpen,
    Rocket,
    Bot,
    Flame
} from "lucide-react";

import FeatureCard from "./FeatureCard";

function FeatureCards() {

    const features = [

        {
            icon: FileText,
            title: "Resume Analysis",
            description:
                "AI-powered ATS analysis that extracts skills, highlights strengths, and identifies improvement areas."
        },

        {
            icon: Target,
            title: "Job Match",
            description:
                "Compare your resume with job descriptions and receive a match score with missing skills."
        },

        {
            icon: BookOpen,
            title: "Skill Gap",
            description:
                "Discover missing technical and soft skills, then follow a personalized learning roadmap."
        },

        {
            icon: Rocket,
            title: "Future Simulator",
            description:
                "Simulate different career paths and predict your growth based on your current profile."
        },

        {
            icon: Bot,
            title: "AI Mentor",
            description:
                "Receive interview preparation, career guidance, and personalized advice from your AI mentor."
        },

        {
            icon: Flame,
            title: "Momentum AI",
            description:
                "Track consistency, measure career momentum, and receive smart recommendations to stay on track."
        }

    ];

    return (

        <div className="cards">

            {features.map((feature) => (

                <FeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                />

            ))}

        </div>

    );

}

export default FeatureCards;
