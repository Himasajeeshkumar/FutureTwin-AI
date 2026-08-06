import "./Workflow.css";

import {
    FileText,
    Bot,
    Target,
    BookOpen,
    Rocket,
    Trophy
} from "lucide-react";

function Workflow() {

    const steps = [

    {
        number: "01",
        icon: FileText,
        title: "Upload Resume",
        description: "Upload your latest resume"
    },

    {
        number: "02",
        icon: Bot,
        title: "AI Analysis",
        description: "Extract skills & ATS score"
    },

    {
        number: "03",
        icon: Target,
        title: "Job Match",
        description: "Compare with job roles"
    },

    {
        number: "04",
        icon: BookOpen,
        title: "Skill Gap",
        description: "Identify missing skills"
    },

    {
        number: "05",
        icon: Rocket,
        title: "Roadmap",
        description: "Generate your learning plan"
    },

    {
        number: "06",
        icon: Trophy,
        title: "Placement Ready",
        description: "Track your progress"
    }

];
    return (

        <section className="workflow">

            <span className="section-tag">
                How It Works
            </span>

            <h2>
                Your Journey with FutureTwin
            </h2>

            <p>
                Six simple steps from uploading your resume to becoming
                placement-ready.
            </p>

            <div className="workflow-line">

                {steps.map((step, index) => (

                    <div
                        className="workflow-step"
                        key={index}
                    >
                        <div className="workflow-number">
                            {step.number}
                        </div>

                        <div className="workflow-circle">
                            <step.icon size={34} strokeWidth={2.2} />
                        </div>

                        <h4>{step.title}</h4>

                         <p className="workflow-text">
                            {step.description}
                        </p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Workflow;