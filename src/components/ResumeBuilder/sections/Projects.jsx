import DynamicSection from "../DynamicSection";

function Projects({ resume, setResume }) {
  return (
    <DynamicSection
      title="🚀 Projects"
      data={resume.projects}
      setData={(projects) =>
        setResume({
          ...resume,
          projects,
        })
      }
      emptyItem={{
          title: "",
          description: [],
          technologies: [],
          github: "",
          live: "",
      }}
      fields={[
        {
          name: "title",
          placeholder: "Project Title",
        },
        {
          name: "description",
          placeholder: "Project Description",
        },
        {
          name: "technologies",
          placeholder: "Technologies Used",
        },
        {
          name: "github",
          placeholder: "GitHub URL",
        },
        {
          name: "live",
          placeholder: "Live Demo URL",
        },
      ]}
      addButtonText="➕ Add Project"
    />
  );
}

export default Projects;