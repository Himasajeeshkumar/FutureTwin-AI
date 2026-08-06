import "./ConfirmDialog.css";

function ConfirmDialog({

    open,

    title,

    message,

    onConfirm,

    onCancel

}) {

    if (!open) return null;

    return (

        <div className="confirm-overlay">

            <div className="confirm-dialog">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-actions">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >

                        Cancel

                    </button>

                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >

                        Confirm

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmDialog;