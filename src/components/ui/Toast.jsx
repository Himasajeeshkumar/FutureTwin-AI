import "./Toast.css";

function Toast({
    type = "success",
    message,
    onClose
}) {

    return (
        <div className={`toast toast-${type}`}>

            <div className="toast-content">

                <div className="toast-icon">

                    {type === "success" && "✅"}
                    {type === "error" && "❌"}
                    {type === "warning" && "⚠️"}
                    {type === "info" && "ℹ️"}

                </div>

                <div className="toast-message">

                    {message}

                </div>

            </div>

            <button
                className="toast-close"
                onClick={onClose}
            >
                ✕
            </button>

        </div>
    );

}

export default Toast;