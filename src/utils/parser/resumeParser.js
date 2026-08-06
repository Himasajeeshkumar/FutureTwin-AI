export function parseResume(text) {

    const email =
        text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0] || "";

    const phone =
        text.match(/(\+91[- ]?)?[6-9]\d{9}/)?.[0] || "";

    // Extract all URLs
    const urls = text.match(/https?:\/\/[^\s]+/gi) || [];

    // LinkedIn
    const linkedin =
        urls.find(url =>
            url.toLowerCase().includes("linkedin.com")
        ) || "";

    // GitHub
    const github =
        urls.find(url =>
            url.toLowerCase().includes("github.com")
        ) || "";

    // Portfolio (any URL that's not LinkedIn or GitHub)
    const portfolio =
        urls.find(url =>
            !url.toLowerCase().includes("linkedin.com") &&
            !url.toLowerCase().includes("github.com")
        ) || "";

    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

    // Try to find the name near the beginning of the resume
    let name = "";

    for (const line of lines.slice(0, 5)) {

        // Remove email
        let cleaned = line.replace(email, "");

        // Remove phone
        cleaned = cleaned.replace(phone, "");

        // Remove common words
        cleaned = cleaned
            .replace(/linkedin/gi, "")
            .replace(/github/gi, "")
            .replace(/portfolio/gi, "")
            .replace(/bengaluru,?\s*india/gi, "")
            .replace(/\s+/g, " ")
            .trim();

        // Keep only alphabetic words and spaces
        if (
            /^[A-Za-z ]+$/.test(cleaned) &&
            cleaned.split(" ").length >= 2
        ) {
            name = cleaned;
            break;
        }
    }

    return {
        personal: {
            name,
            email,
            phone,
            location:
            text.match(
                /(Bengaluru|Bangalore|Chennai|Hyderabad|Mumbai|Delhi|Pune|Kochi|Kerala|India)/i
            )?.[0] || "",
            linkedin,
            github,
            portfolio
        },

        summary: "",

        education: [{
            degree: "",
            college: "",
            year: "",
            cgpa: ""
        }],

        experience: [{
            job: "",
            company: "",
            duration: "",
            description: ""
        }],

        projects: [{
            title: "",
            description: "",
            technologies: "",
            github: "",
            live: ""
        }],

        skills: [],

        certifications: [{
            name: "",
            issuer: "",
            year: "",
            credential: ""
        }]
    };
}