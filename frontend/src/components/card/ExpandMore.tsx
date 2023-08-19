import { Box, Card, CardContent, Collapse, IconButton, IconButtonProps, Typography, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

interface ExpandMoreProps {
    children?: React.ReactNode;
    title: string;
}

interface ExpandMoreMuiProps extends IconButtonProps {
    expandedMui: boolean;
}

const ExpandMoreMui = styled((props: ExpandMoreMuiProps) => {
    const { expandedMui, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expandedMui }) => ({
    transform: !expandedMui ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const ExpandMore = (props: ExpandMoreProps) => {
    const { children, title, ...other } = props;
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
            <Card
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    p: 2,
                    boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.2)',
                    mb: 2,
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        fontWeight: 'bold'
                    }}
                >
                    {title}
                </Typography>
                <ExpandMoreMui
                    expandedMui={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    {...other}
                >
                    <ExpandMoreIcon />
                </ExpandMoreMui>
            </Card>

            {children && (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {children}
                    </CardContent>
                </Collapse>
            )}
        </Box>
    )
}