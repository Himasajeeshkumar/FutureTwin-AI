import jsPDF from "jspdf";

const checkPage = (doc, y) => {

    if (y > 270) {

        doc.addPage();

        return 20;

    }

    return y;

};

export const downloadReport = (aiResult) => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("FutureTwin AI",20,20);

    doc.setFontSize(16);
    doc.text("Resume Analysis Report",20,30);

    doc.line(20,35,190,35);

    doc.setFontSize(12);

    doc.text(`Resume Score: ${aiResult.resumeScore}%`,20,50);

    doc.text(`ATS Score: ${aiResult.atsScore}%`,20,60);

    doc.text(`Recruiter Score: ${aiResult.recruiterScore}%`,20,70);

    doc.text(`Interview Readiness: ${aiResult.interviewReadiness}%`,20,80);

    doc.setFontSize(16);

    doc.text("Recruiter Verdict",20,100);

    doc.setFontSize(12);

    doc.text(aiResult.verdict,20,110);

    doc.line(20,115,190,115);

    let y = 130;

    doc.setFontSize(16);
    doc.text("Detected Skills",20,y);

    y += 10;

    doc.setFontSize(16);
    doc.text("Detected Skills", 20, y);

    y += 10;

    doc.setFontSize(12);

    aiResult.skills.forEach((skill) => {

        y = checkPage(doc, y);

        doc.text(`• ${skill}`, 25, y);

        y += 8;

    });

    y += 5;
    doc.setFontSize(16);
    doc.text("Strengths", 20, y);

    y += 10;

    doc.setFontSize(12);

    aiResult.strengths.forEach((strength) => {

        y = checkPage(doc, y);

        doc.text(`• ${strength}`, 25, y);

        y += 8;

    });

    y += 5;
    doc.setFontSize(16);
    doc.text("Weaknesses", 20, y);

    y += 10;

    doc.setFontSize(12);

    aiResult.weaknesses.forEach((weakness) => {

        y = checkPage(doc, y);

        doc.text(`• ${weakness}`, 25, y);

        y += 8;

    });

    y += 5;
    doc.setFontSize(16);
    doc.text("Missing Skills", 20, y);

    y += 10;

    doc.setFontSize(12);

    aiResult.missingSkills.forEach((skill) => {

        y = checkPage(doc, y);

        doc.text(`• ${skill}`, 25, y);

        y += 8;

    });

    y += 5;
    doc.setFontSize(16);
    doc.text("AI Suggestions", 20, y);

    y += 10;

    doc.setFontSize(12);

    aiResult.suggestions.forEach((suggestion) => {

        y = checkPage(doc, y);

        doc.text(`• ${suggestion}`, 25, y);

        y += 8;

    });

    y += 5;

    doc.setFontSize(16);
    doc.text("Career Recommendation", 20, y);

    y += 10;

    doc.setFontSize(12);

    const careerText = doc.splitTextToSize(
        aiResult.careerRecommendation,
        160
    );

    doc.text(careerText, 25, y);

    y += 20;

    y = checkPage(doc, y);

    doc.setFontSize(10);

    doc.setTextColor(120);

    doc.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        20,
        y
    );

        doc.save("FutureTwin_Resume_Report.pdf");

    };