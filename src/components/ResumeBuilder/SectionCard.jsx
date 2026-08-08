import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

function SectionCard({
    title,
    children,
    defaultOpen = true
}) {

    const [open, setOpen] = useState(defaultOpen);

    const toggleSection = () => {
        setOpen((prev) => !prev);
    };

    const ChevronIcon = open
        ? ChevronDown
        : ChevronRight;

    return (
        <div className="section-card">

            <button
                type="button"
                className="section-header"
                onClick={toggleSection}
                aria-expanded={open}
            >

                <ChevronIcon
                    size={20}
                    strokeWidth={2}
                />

                <h2>
                    {title}
                </h2>

            </button>


            {open && (
                <div className="section-content">
                    {children}
                </div>
            )}

        </div>
    );
}

export default SectionCard;