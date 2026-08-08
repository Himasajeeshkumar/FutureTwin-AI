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
        <article
            className="card"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    handleClick();
                }

            }}
        >

            <div className="feature-icon">

                {typeof Icon === "function" ? (
                    <Icon
                        size={30}
                        strokeWidth={2}
                    />
                ) : null}

            </div>

            <h2>
                {title}
            </h2>

            <p>
                {description}
            </p>

            <button
                type="button"
                className="feature-btn"
                onClick={(event) => {

                    event.stopPropagation();
                    handleClick();

                }}
            >

                Explore

                <span aria-hidden="true">
                    →
                </span>

            </button>

        </article>
    );

}

export default FeatureCard;
