
import { Button } from '@mui/material';
import { purple } from '../../styles/colors';

export const PurpleButton = ({ variant, width, margin, text, onClick, ...overrides }: ButtonProps) => (
    <Button
        variant={variant}
        style={{
            width: width,
            backgroundColor: purple[700],
            margin: margin,
            ...overrides
        }}
        onClick={onClick}
    >
        {text}
    </Button>
);