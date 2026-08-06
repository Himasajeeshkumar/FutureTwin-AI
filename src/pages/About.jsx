import "./About.css";

function About() {
  const features = [
    {
      icon: "📄",
      title: "Smart Resume Analysis",
      description:
        "AI analyzes your resume, extracts skills, and provides ATS-friendly recommendations.",
    },
    {
      icon: "🎯",
      title: "Career Intelligence",
      description:
        "Measure career readiness, identify gaps, and understand where you stand.",
    },
    {
      icon: "🤖",
      title: "AI Mentor",
      description:
        "Receive personalized career guidance, interview preparation, and learning advice.",
    },
    {
      icon: "🚀",
      title: "Future Simulator",
      description:
        "Explore different career paths and predict future growth using AI.",
    },
  ];

  return (
    <section className="about-section">

      <span className="section-tag">
        Why FutureTwin?
      </span>

      <h2 className="about-title">
        Your AI Career Companion
      </h2>

      <p className="about-description">
        FutureTwin combines Artificial Intelligence, resume analysis,
        career intelligence, and personalized mentoring into one
        platform that helps students become placement-ready with
        confidence.
      </p>

      <div className="about-grid">

        {features.map((feature, index) => (

          <div
            className="about-card"
            key={index}
          >

            <div className="about-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default About;