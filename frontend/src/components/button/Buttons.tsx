export const SignButton = ({ text, onClick }: SignButtonProps) => (
    <button onClick={onClick} className="sign-button-wrapper">
        {text}
    </button>
);