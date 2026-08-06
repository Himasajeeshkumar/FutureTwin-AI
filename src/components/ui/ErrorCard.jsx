import "./ErrorCard.css";

function ErrorCard({

    title = "Something went wrong",

    message,

    onRetry

}) {

    return (

        <div className="error-card">

            <div className="error-icon">

                ⚠️

            </div>

            <h2>{title}</h2>

            <p>{message}</p>

            {onRetry && (

                <button onClick={onRetry}>

                    Try Again

                </button>

            )}

        </div>

    );

}

export default ErrorCard;