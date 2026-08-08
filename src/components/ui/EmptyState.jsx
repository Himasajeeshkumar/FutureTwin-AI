import "./EmptyState.css";
import {
    FileText
} from "lucide-react";

import {
    isValidElement
} from "react";

function EmptyState({
    icon = FileText,
    title,
    description,
    action
}) {

    const renderIcon = () => {

        // 1. JSX element
        // Example: icon={<FileText />}
        if (isValidElement(icon)) {

            return icon;

        }

        // 2. String / emoji
        // Example: icon="🎯"
        if (typeof icon === "string") {

            return (
                <span className="empty-icon-text">
                    {icon}
                </span>
            );

        }

        // 3. Lucide component
        // Example: icon={FileText}
        if (typeof icon === "function") {

            const Icon = icon;

            return (
                <Icon
                    size={52}
                    strokeWidth={1.8}
                />
            );

        }

        // 4. Fallback
        return (
            <FileText
                size={52}
                strokeWidth={1.8}
            />
        );

    };


    return (

        <div className="empty-state">

            <div className="empty-icon">

                {renderIcon()}

            </div>


            <h2>
                {title}
            </h2>


            <p>
                {description}
            </p>


            {action}

        </div>

    );

}

export default EmptyState;
