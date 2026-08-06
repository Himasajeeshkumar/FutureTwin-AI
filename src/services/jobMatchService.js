export async function analyzeJobMatch(resume, jobDescription) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/jobmatch`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                resume,
                jobDescription
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.error || "Unable to analyze job match."
        );

    }

    return data;

}