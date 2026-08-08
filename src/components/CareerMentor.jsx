import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import EmptyState from "../components/ui/EmptyState";
import "./CareerMentor.css";
import Toast from "../components/ui/Toast";
import ConfirmDialog from "../components/ui/ConfirmDialog";

function CareerMentor({ selectedCareer }) {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: ""
});
const [showConfirm, setShowConfirm] = useState(false);
const showToast = (type, message) => {

    setToast({
        show: true,
        type,
        message
    });

    setTimeout(() => {

        setToast(prev => ({
            ...prev,
            show: false
        }));

    }, 3000);

};

  const generateAnswer = async () => {
     if (loading) return;

    if (question.trim() === "") return;
    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/mentor`,{

          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

        body: JSON.stringify({

          message: `
          Career:
          ${selectedCareer}

          Question:
          ${question}

        Answer as an experienced career mentor.

        Rules:
        - Give practical advice.
        - Use headings and bullet points.
        - Recommend projects.
        - Recommend technologies to learn.
        - Suggest interview preparation.
        - Mention internships if relevant.
        - Keep the answer around 200 words.
        - End with one motivational sentence.
        Never return JSON.
        Reply only in plain text.
        `
        })

      });

      const data = await response.json();

      if (!response.ok) {


        setMessages(prev => [
          ...prev,
          {
            sender: "ai",
            text: "❌ Something went wrong. Please try again."
          }
        ]);

        showToast(
          "error",
          "Unable to generate AI response."
      );

        return;
      }
      

      // Success
      const userQuestion = question.trim();
      setMessages(prev => [
        ...prev,
        {
          sender: "user",
          text: userQuestion
        },
        {
          sender: "ai",
          text: data.reply
        }
      ]);

      setQuestion("");


      }
      catch (error) {

      console.log(error);


      
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Something went wrong. Please try again."
        }
      ]);

      showToast(
          "error",
          "Unable to generate AI response."
      );

    }
    finally {
        setLoading(false);
    }

  };
  const chatEndRef = useRef(null);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({
          behavior: "smooth"
      });
  }, [messages, loading]);

  return (

    <div className="mentor-card">

    <h1 className="section-title">
        AI Career Mentor
    </h1>

    <div className="chat-box">

        {messages.length === 0 && (
            <EmptyState
                icon="AI"
                title="Start a Conversation"
                description="Ask FutureTwin AI about careers, interviews, projects, skills, or your learning roadmap."
            />
        )}

        {messages.map((msg, index) => (
            <div
                key={index}
                className={
                    msg.sender === "user"
                        ? "user-message"
                        : "ai-message"
                }
            >
                <strong>
                    {msg.sender === "user"
                        ? "You"
                        : "FutureTwin AI"}
                </strong>

                <ReactMarkdown>
                    {msg.text}
                </ReactMarkdown>
            </div>
        ))}

        {loading && (
            <div className="ai-message typing">
                <strong>FutureTwin AI</strong>

                <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )}

        <div ref={chatEndRef} />

    </div>


    {/* CHAT INPUT */}

    <div className="chat-input-area">

        <textarea
            placeholder="Ask anything about your career..."
            value={question}
            onChange={(e) =>
                setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
                if (
                    e.key === "Enter" &&
                    !e.shiftKey
                ) {
                    e.preventDefault();
                    generateAnswer();
                }
            }}
        />

        <div className="chat-actions">

            <button
                onClick={generateAnswer}
                disabled={loading || !question.trim()}
            >
                {loading ? "Thinking..." : "Send"}
            </button>

            <button
                className="secondary-btn"
                onClick={() => setShowConfirm(true)}
            >
                Clear Chat
            </button>

        </div>

    </div>


    {showConfirm && (
        <ConfirmDialog
            title="Clear Chat?"
            message="This will permanently remove the current conversation."
            onConfirm={() => {
                setMessages([]);
                setShowConfirm(false);
            }}
            onCancel={() =>
                setShowConfirm(false)
            }
        />
    )}

    {toast.show && (
        <Toast
            type={toast.type}
            message={toast.message}
            onClose={() =>
                setToast(prev => ({
                    ...prev,
                    show: false
                }))
            }
        />
    )}

</div>

  );

} 
export default CareerMentor;