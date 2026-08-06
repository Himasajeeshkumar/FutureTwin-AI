import FeatureCard from "./FeatureCard";

function FeatureCards() {

 const features = [
  {
    icon: "📄",
    title: "Resume Analysis",
    description:
      "AI-powered ATS analysis that extracts skills, highlights strengths, and identifies improvement areas.",
  },
  {
    icon: "🎯",
    title: "Job Match",
    description:
      "Compare your resume with job descriptions and receive a match score with missing skills.",
  },
  {
    icon: "📚",
    title: "Skill Gap",
    description:
      "Discover missing technical and soft skills, then follow a personalized learning roadmap.",
  },
  {
    icon: "🚀",
    title: "Future Simulator",
    description:
      "Simulate different career paths and predict your growth based on your current profile.",
  },
  {
    icon: "🤖",
    title: "AI Mentor",
    description:
      "Receive interview preparation, career guidance, and personalized advice from your AI mentor.",
  },
  {
    icon: "🔥",
    title: "Momentum AI",
    description:
      "Track consistency, measure career momentum, and receive smart recommendations to stay on track.",
  },
];

  return (
    <div className="cards">

      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}

    </div>
  );
}

export default FeatureCards;