import { useEffect, useState } from "react";
import ResumePreview from "./ResumePreview";
import "./ResumeBuilder.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { extractPDFText } from "../../utils/parser/pdfParser";

import PersonalInfo from "./sections/PersonalInfo";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Certifications from "./sections/Certifications";
import Links from "./sections/Links";
import Summary from "./sections/Summary";
import SectionCard from "./SectionCard";

function ResumeBuilder({ parsedResume}) {
    const [resume, setResume] = useState(() => parsedResume || {

        personal: {
            name: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            github: "",
            portfolio: ""
        },
        summary: "",

        education: [
            {
                degree: "",
                college: "",
                year: "",
                cgpa: ""
            }
        ],

        experience: [
        {
            job: "",
            company: "",
            duration: "",
            description: [],
        },
        ],
        projects: [
        {
            title: "",
            description: [],
            technologies: [],
            github: "",
            live: "",
        },
        ],

        skills: [
        {
            category: "",
            items: []
        }
        ],

        certifications: [
        {
            name: "",
            issuer: "",
            year: "",
            credential: "",
        }
        ]
    });

    useEffect(() => {
        // Only update when parsedResume is provided
        if (parsedResume) {
            setResume(parsedResume);
        }
    }, [parsedResume]);
    const downloadPDF = async () => {

    const resume = document.getElementById("resume-preview");

    const canvas = await html2canvas(resume,{

        scale:3,

        backgroundColor:"#ffffff",

        useCORS:true

    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
    );

    const pdfWidth = 210;
    const pdfHeight =
        (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );

    pdf.save("Resume.pdf");

};
    const handleUpload = async (e) => {

        try {

            const file = e.target.files[0];

            if (!file) return;

            const text = await extractPDFText(file);
            console.log(text);

            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/resume`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    message: text

                })

            });

            if (!response.ok) {

                throw new Error("Failed to parse resume.");

            }

            const analysis = await response.json();

            setResume(analysis.parsedResume);

        }

        catch (error) {

            console.error(error);

            alert("Unable to parse resume.");

        }

    };

    console.log("parsedResume:", parsedResume);
    console.log("resume:", resume);

  return (

    <div className="resume-builder">

      <h1 className="section-title">
        ✨ AI Resume Studio
      </h1>
        <div className="builder-container">

        <div className="builder-editor">

            <SectionCard title="👤 Personal Information">

                <PersonalInfo
                    resume={resume}
                    setResume={setResume}
                />

            </SectionCard>
            <SectionCard title="📝 Summary">
                <Summary
                    resume={resume}
                    setResume={setResume}
                />
            </SectionCard>

            <SectionCard title="🎓 Education">
                <Education
                    resume={resume}
                    setResume={setResume}
                />
            </SectionCard>

            <SectionCard title="💼 Experience">
                <Experience
                    resume={resume}
                    setResume={setResume}
                />
            </SectionCard>

            <SectionCard title="🏗️ Projects">
                <Projects
                    resume={resume}
                    setResume={setResume}
                />
            </SectionCard>

            <SectionCard title="🛠️ Skills">
                <Skills
                    resume={resume}
                    setResume={setResume}
                />
            </SectionCard>

            <SectionCard title="📜 Certifications">
                <Certifications
                    resume={resume}
                    setResume={setResume}
                />
            </SectionCard>

            <SectionCard title="🔗 Links">
                <Links
                    resume={resume}
                    setResume={setResume}
                />
            </SectionCard>

        </div>
        <div className="preview-container">

        <div className="builder-toolbar">

            <label className="upload-btn">

                📂 Upload Existing Resume

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUpload}
                    hidden
                />

            </label>

            <button
                className="download-btn"
                onClick={downloadPDF}
            >
                📄 Download PDF
            </button>

        </div>

        <div className="preview-header">

            <h2>📄 Live Resume Preview</h2>

            <p>
                Changes appear instantly as you edit your resume.
            </p>

        </div>
        <ResumePreview resume={resume}/>

        </div>
        {/* RIGHT SIDE */}

    </div>
    </div>

  );

}
export default ResumeBuilder;