
import { Box, Button } from '@mui/material';

export const PurpleButton = ({ variant, width, height, margin, children, color, type, backgroundColor, ...overrides }: ButtonProps) => (
    <Button
        variant={variant}
        style={{
            width: width,
            backgroundColor: backgroundColor,
            margin: margin,
            height: height || '100%'
        }}
        {...overrides}
        type={type}
    >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: color || 'white',
            }}
        >
            {children}
        </Box>

    </Button>
);