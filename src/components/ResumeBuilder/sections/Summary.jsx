function Summary({ resume, setResume }) {

  return (

    <div className="editor-card">

      <textarea

        rows="6"

        placeholder="Write a short professional summary..."

        value={resume.summary}

        onChange={(e)=>

          setResume({

            ...resume,

            summary:e.target.value

          })

        }

      />

      <button>

        ✨ Generate with AI

      </button>

    </div>

  );

}

export default Summary;