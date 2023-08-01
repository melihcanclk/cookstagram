export interface SignButtonProps {
    text: string;
    onClick?: () => void;
}

export const SignButton = ({ text, onClick }: SignButtonProps) => (
    <div className="sign-button-wrapper">
        <button onClick={onClick} className="sign-button">
            {text}
        </button>
    </div>
);