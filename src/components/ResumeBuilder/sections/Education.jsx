import DynamicSection from "../DynamicSection";

function Education({ resume, setResume }) {

    return (

        <DynamicSection

            data={resume.education}

            setData={(education)=>

                setResume({

                    ...resume,

                    education

                })

            }

            emptyItem={{

                degree:"",

                college:"",

                year:"",

                cgpa:""

            }}

            fields={[

                {

                    name:"degree",

                    placeholder:"Degree"

                },

                {

                    name:"college",

                    placeholder:"College"

                },

                {

                    name:"year",

                    placeholder:"Passing Year"

                },

                {

                    name:"cgpa",

                    placeholder:"CGPA"

                }

            ]}

            addButtonText="➕ Add Education"

        />

    );

}

export default Education;