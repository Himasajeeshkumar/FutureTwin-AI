import "./EmptyState.css";
import { FileText } from "lucide-react";

function EmptyState({
    icon: Icon = FileText,
    title,
    description,
    action
}) {
    return (
        <div className="empty-state">

            <div className="empty-icon">
                <Icon size={52} strokeWidth={1.8} />
            </div>

            <h2>{title}</h2>

            <p>{description}</p>

            {action}

        </div>
    );
}

export default EmptyState;