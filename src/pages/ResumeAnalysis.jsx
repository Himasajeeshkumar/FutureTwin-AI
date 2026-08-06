import ResumeUpload from "../components/ResumeUpload";
import ResumeBuilder from "../components/ResumeBuilder/ResumeBuilder";

function ResumeAnalysis({
  setSkills,
  setResumeText,
  setParsedResume,
  parsedResume
}) {
  return (
    <>
      <ResumeUpload
        setSkills={setSkills}
        setResumeText={setResumeText}
        setParsedResume={setParsedResume}
      />

      <ResumeBuilder
        parsedResume={parsedResume}
      />
    </>
  );
}

export default ResumeAnalysis;