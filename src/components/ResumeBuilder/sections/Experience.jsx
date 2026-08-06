import DynamicSection from "../DynamicSection";

function Experience({ resume, setResume }) {
  return (
    <DynamicSection
      title="💼 Experience"
      data={resume.experience}
      setData={(experience) =>
        setResume({
          ...resume,
          experience,
        })
      }
    emptyItem={{
        job: "",
        company: "",
        duration: "",
        description: [],
    }}
      fields={[
        {
          name: "job",
          placeholder: "Job Title",
        },
        {
          name: "company",
          placeholder: "Company",
        },
        {
          name: "duration",
          placeholder: "Duration (Jan 2024 - Mar 2024)",
        },
        {
          name: "description",
          placeholder: "Work Description",
        },
      ]}
      addButtonText="➕ Add Experience"
    />
  );
}

export default Experience;