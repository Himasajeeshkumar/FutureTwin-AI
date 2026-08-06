import { useState } from "react";

function useToast() {

    const [toast, setToast] = useState({
        show: false,
        type: "success",
        message: ""
    });

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

    return {
        toast,
        setToast,
        showToast
    };

}

export default useToast;