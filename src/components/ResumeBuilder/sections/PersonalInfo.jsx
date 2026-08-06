function PersonalInfo({ resume, setResume }) {

  const updateField = (field, value) => {

    setResume({
      ...resume,
      personal: {
        ...resume.personal,
        [field]: value
      }
    });

  };

  return (
    <>
      <input
        placeholder="Full Name"
        value={resume.personal.name}
        onChange={(e) => updateField("name", e.target.value)}
      />

      <input
        placeholder="Email"
        value={resume.personal.email}
        onChange={(e) => updateField("email", e.target.value)}
      />

      <input
        placeholder="Phone"
        value={resume.personal.phone}
        onChange={(e) => updateField("phone", e.target.value)}
      />

      <input
        placeholder="Location"
        value={resume.personal.location}
        onChange={(e) => updateField("location", e.target.value)}
      />

      <input
        placeholder="LinkedIn URL"
        value={resume.personal.linkedin}
        onChange={(e) => updateField("linkedin", e.target.value)}
      />

      <input
        placeholder="GitHub URL"
        value={resume.personal.github}
        onChange={(e) => updateField("github", e.target.value)}
      />

      <input
        placeholder="Portfolio URL"
        value={resume.personal.portfolio}
        onChange={(e) => updateField("portfolio", e.target.value)}
      />

    </>
  );

}

export default PersonalInfo;