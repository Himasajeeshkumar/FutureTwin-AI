function ResumePreview({ resume }) {
    const hasEducation = resume.education.some(
        edu => edu.degree || edu.college || edu.year || edu.cgpa
    );

    const hasExperience = resume.experience.some(
        exp => exp.job || exp.company || exp.duration || exp.description
    );

    const hasProjects = resume.projects.some(
        project =>
            project.title ||
            project.description ||
            project.technologies
    );

    const hasSkills = resume.skills.length > 0;

    const hasCertifications = resume.certifications.some(
        cert =>
            cert.name ||
            cert.issuer ||
            cert.year
    );

    return (
        <div
            className="resume-preview"
            id="resume-preview"
        >
            <div className="resume-header">
                <h1>{resume.personal.name || "YOUR NAME"}</h1>
                    <p className="resume-contact">

                        📍 {resume.personal.location || "Your City"}

                        {" | "}

                        📞 {resume.personal.phone || "+91 XXXXX XXXXX"}

                        {" | "}

                        ✉ {resume.personal.email || "your.email@example.com"}

                    </p>
                <div className="resume-links">

                    <span>
                        {resume.personal.linkedin || "LinkedIn"}
                    </span>

                    <span>•</span>

                    <span>
                        {resume.personal.github || "GitHub"}
                    </span>

                    <span>•</span>

                    <span>
                        {resume.personal.portfolio || "Portfolio"}
                    </span>

                </div>
            </div>

            <hr />
            {resume.summary && (
                <>
                    <h2 className="resume-heading">
                        Professional Summary
                    </h2>

                    <p className="summary-text">
                        {
                            resume.summary ||
                            "Write a short professional summary highlighting your skills, experience, achievements and career goals."
                        }
                    </p>

                    <hr />
                </>
            )}

            {hasEducation && (
                <>
                    <h2 className="resume-heading">Education</h2>
                    {resume.education.map((edu, index) => (
                        <div key={index} className="resume-section-item">
                            <div className="resume-row">
                                <strong>{edu.degree}</strong>
                                <span>{edu.year}</span>
                            </div>
                            {edu.college && (
                                <p className="resume-subtitle">

                                    {edu.college}

                                    {edu.cgpa && (
                                        <> | CGPA: {edu.cgpa}</>
                                    )}

                                </p>
                            )}
                        </div>
                    ))}
                </>
            )}

            {hasExperience && (
                <>
                    <h2 className="resume-heading">Experience</h2>
                    {resume.experience.map((exp, index) => (
                        <div key={index} className="resume-section-item">
                            <div className="resume-row">
                                <strong>{exp.job}</strong>
                                <span>{exp.duration}</span>
                            </div>
                            {exp.company && (
                                <p className="resume-subtitle">
                                    {exp.company}
                                </p>
                            )}

                            {exp.description && (

                                <ul className="experience-description">

                                    {(Array.isArray(exp.description)
                                        ? exp.description
                                        : exp.description.split(".").filter(item => item.trim() !== "")
                                    ).map((item, index) => (

                                        <li key={index}>
                                            {item}
                                        </li>

                                    ))}

                                </ul>

                            )}
                        </div>
                    ))}
                </>
            )}

            {hasProjects && (
                <>
                    <h2 className="resume-heading">Projects</h2>
                    {resume.projects.map((project, index) => (
                        <div key={index} className="resume-section-item">
                            <div className="resume-row">

                                <strong>{project.title}</strong>

                                <div className="project-links">

                                    {project.github && (

                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            GitHub
                                        </a>

                                    )}

                                    {project.live && (

                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Live Demo
                                        </a>

                                    )}

                                </div>

                            </div>
                            {project.description && (

                                <ul className="project-description">

                                    {(Array.isArray(project.description)
                                        ? project.description
                                        : project.description
                                            .split(".")
                                            .filter(item => item.trim() !== "")
                                    ).map((item, index) => (

                                        <li key={index}>
                                            {item.trim()}
                                        </li>

                                    ))}

                                </ul>

                            )}
                            {project.technologies && (
                                <p>
                                    <strong>Tech Stack:</strong>{" "}
                                    {Array.isArray(project.technologies)
                                        ? project.technologies.join(", ")
                                        : typeof project.technologies === "object"
                                        ? Object.values(project.technologies).flat().join(", ")
                                        : project.technologies}
                                </p>
                            )}
                            
                        </div>
                    ))}
                </>
            )}

            {hasSkills && (
                <>
                    <h2 className="resume-heading">
                        Skills
                    </h2>

                    <div className="resume-skills">

                        {resume.skills.map((skill, index) => {

                            if (typeof skill === "string") {

                                return (
                                    <span
                                        key={index}
                                        className="skill-chip"
                                    >
                                        {skill}
                                    </span>
                                );

                            }

                            return (
                                <div key={index} style={{ marginBottom: "12px" }}>

                                    <strong>{skill.category || "Skills"}</strong>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "8px",
                                            marginTop: "6px"
                                        }}
                                    >
                                        {(skill.items || []).map((item, i) => (
                                            <span
                                                key={i}
                                                className="skill-chip"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            );

                        })}

                    </div>

                </>
            )}

            {hasCertifications && (
                <>
                    <h2 className="resume-heading">Certifications</h2>
                    {resume.certifications.map((cert, index) => (
                        <div key={index} className="resume-section-item">
                            <strong>{cert.name}</strong>
                            {cert.issuer && <p>{cert.issuer}</p>}
                            {cert.year && <p>{cert.year}</p>}
                            {cert.credential && (
                                <p>
                                    <a
                                        href={cert.credential}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Credential
                                    </a>
                                </p>
                            )}
                        </div>
                    ))}
                </>
            )}
            <div className="resume-footer">

                <hr />

                <p>
                    This resume was generated using FutureTwin AI Resume Studio.
                </p>

            </div>
        </div>
    );
}

export default ResumePreview;
