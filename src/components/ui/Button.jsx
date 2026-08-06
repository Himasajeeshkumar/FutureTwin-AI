function Button({

    children,

    onClick,

    className="",

    ...props

}){

    return(

        <button

            className={`primary-btn ${className}`}

            onClick={onClick}

            {...props}

        >

            {children}

        </button>

    );

}

export default Button;