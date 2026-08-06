import "./EmptyState.css";

function EmptyState({
    icon = "📄",
    title,
    description,
    action
}) {
    return (
        <div className="empty-state">

            <div className="empty-icon">
                {icon}
            </div>

            <h2>{title}</h2>

            <p>{description}</p>

            {action}

        </div>
    );
}

export default EmptyState;