
import { Button } from '@mui/material';
import { purple } from '../../styles/colors';
import { Typography } from '@mui/material';

export const PurpleButton = ({ variant, width, margin, text, type, ...overrides }: ButtonProps) => (
    <Button
        variant={variant}
        style={{
            width: width,
            backgroundColor: purple[700],
            margin: margin,
        }}
        {...overrides}
        type={type}
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