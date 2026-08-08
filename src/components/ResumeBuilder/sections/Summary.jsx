import { useState } from "react";

function Summary({ resume, setResume }) {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const generateSummary = async () => {

        setError("");

        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/generate-summary`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        resume
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Unable to generate summary."
                );

            }


            setResume({
                ...resume,
                summary: data.summary
            });


        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to generate AI summary."
            );


        } finally {

            setLoading(false);

        }

    };


    return (
        <div className="editor-card">

            <textarea
                rows="6"
                placeholder="Write a short professional summary..."
                value={resume.summary || ""}
                onChange={(e) =>
                    setResume({
                        ...resume,
                        summary: e.target.value
                    })
                }
            />


            <button
                type="button"
                onClick={generateSummary}
                disabled={loading}
            >
                {loading
                    ? "Generating..."
                    : "Generate with AI"}
            </button>


            {error && (
                <p className="error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default Summary;