
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

export const PurpleButton = ({ variant, width, margin, text, type, backgroundColor, ...overrides }: ButtonProps) => (
    <Button
        variant={variant}
        style={{
            width: width,
            backgroundColor: backgroundColor,
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