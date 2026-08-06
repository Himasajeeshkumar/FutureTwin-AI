export async function analyzeResume(resumeText) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/resume`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                message: resumeText
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "AI service unavailable.");
    }

    return data;
}