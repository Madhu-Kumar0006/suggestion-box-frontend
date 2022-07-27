import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
             main: '#009688',
            // main: "#356859"
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