export default function PrimaryButton({
    className = "",
    disabled,
    children,
    onClick = () => {},
    onSubmit = () => {},
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center bg-transparent border-2 border-footer-color text-footer-color rounded-md font-bold hover:text-white hover:bg-footer-color uppercase focus:footer-color focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
            onClick={onClick}
            onSubmit={onSubmit}
        >
            {children}
        </button>
    );
}
