import { createTheme } from "@mui/material";
import { colors } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            dark: colors.teal[800],
             main: colors.teal[500],
            // main: "#356859"
            light: colors.teal[100],
            bg: colors.teal[50]
        },
        secondary: {
            main: "#FD5523"
        }
    },
    typography: {
        fontFamily: 'Verdana,Geneva,Tahoma,sans-serif'
    }
})

export default theme;