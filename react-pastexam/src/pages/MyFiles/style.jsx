import { createTheme } from '@mui/material/styles';
export const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Switches the theme to dark mode
        // You can also customize other theme aspects like primary and secondary colors
    },
    // Add any other theme customizations here
    typography: {
        // Apply the gray color to all text variants
        allVariants: {
          color: 'rgba(255, 255, 255, 1)', // Custom gray color
        },
      },
});
export const ButtonStyle = {
    color: 'lightgray',
    fontSize: '1.3rem',
    // margin: '0.5%',
    borderColor: 'rgba(228, 219, 233, 0.5)',
    borderWidth: '3px',
    borderRadius: '3px',
    ":hover": {
        borderColor: 'rgba(228, 219, 233, 0.25)',
        borderWidth: '3px',
        color: '#90caf9'
    }
}