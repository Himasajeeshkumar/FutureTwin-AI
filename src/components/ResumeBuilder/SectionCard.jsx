import { useState } from "react";

function SectionCard({ title, children, defaultOpen = true }) {

    const [open, setOpen] = useState(defaultOpen);

    return (

        <div className="section-card">

            <div
                className="section-header"
                onClick={() => setOpen(!open)}
            >

                <h2>

                    {open ? "▼" : "▶"} {title}

                </h2>

            </div>

            {open && (

                <div className="section-content">

                    {children}

                </div>

            )}

        </div>

    );

}

export default SectionCard;