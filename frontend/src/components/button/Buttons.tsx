
import { Box, Button } from '@mui/material';

export const PurpleButton = ({ variant, width, margin, text, color, type, backgroundColor, ...overrides }: ButtonProps) => (
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
        <Box
            sx={{
                color: color || 'white',
            }}
        >
            {text}
        </Box>

    </Button>
);