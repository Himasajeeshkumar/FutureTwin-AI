import { useNavigate } from "react-router-dom";

function FeatureCard({ title, description, icon: Icon }) {

    const navigate = useNavigate();

    const handleClick = () => {

        switch (title) {

            case "Resume Analysis":
                navigate("/resume-analysis");
                break;

            case "Job Match":
                navigate("/job-match");
                break;

            case "Skill Gap":
                navigate("/skill-gap");
                break;

            case "Future Simulator":
                navigate("/simulator");
                break;

            case "AI Mentor":
                navigate("/mentor");
                break;

            case "Momentum AI":
                navigate("/momentum");
                break;

            default:
                break;
        }
    };

    return (
        <div
            className="card"
            onClick={handleClick}
        >

            <div className="feature-icon">
                <Icon
                    size={30}
                    strokeWidth={2}
                />
            </div>

            <h2>{title}</h2>

            <p>{description}</p>

            <button
                className="feature-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                }}
            >
                Explore
                <span aria-hidden="true">→</span>
            </button>

        </div>
    );
}

export default FeatureCard;