import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { grey, purple } from './colors';

export const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 350px;
    max-width: 100%;
    min-width: 100%;
    max-height: 420px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${purple[900]};
    box-shadow: 0px 1px 1px ${theme.palette.mode === 'dark' ? purple[900] : purple[100]};
  
    &:hover {
      border-color: ${purple[400]};
    }
  
    &:focus {
      border-color: ${purple[400]};
      outline: none;
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? purple[500] : purple[200]};
    }
  `,
);