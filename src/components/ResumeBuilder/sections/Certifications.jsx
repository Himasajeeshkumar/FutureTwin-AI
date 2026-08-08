import DynamicSection from "../DynamicSection";

function Certifications({ resume, setResume }) {

    return (
        <DynamicSection

            title="Certifications"

            data={resume.certifications}

            setData={(certifications) =>
                setResume({
                    ...resume,
                    certifications
                })
            }

            emptyItem={{
                name: "",
                issuer: "",
                year: "",
                credential: ""
            }}

            fields={[
                {
                    name: "name",
                    placeholder: "Certification Name"
                },
                {
                    name: "issuer",
                    placeholder: "Issued By"
                },
                {
                    name: "year",
                    placeholder: "Year"
                },
                {
                    name: "credential",
                    placeholder: "Credential URL (Optional)"
                }
            ]}

            addButtonText="Add Certification"

        />
    );
}

export default Certifications;