
import { Button } from '@mui/material';
import { purple } from '../../styles/colors';
import { Typography } from '@mui/material';

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
        type='submit'
    >
        <Typography
            variant='button'
            sx={{
                color: 'white'
            }}
        >
            {text}
        </Typography>

    </Button>
);