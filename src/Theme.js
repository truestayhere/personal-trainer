import { createTheme } from '@mui/material/styles';

// https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=eee2dc&secondary.color=123c69&primary.text.color=AC3B61&secondary.text.color=EEE2DC

const theme = createTheme({
    palette: {
        primary: {
            main: "#123c69",
            light: "#476697",
            dark: "#00173e",
            contrastText: "#ffffff",
        },

        secondary: {
            main: "#eee2dc",
            light: "#ffffff",
            dark: "#bcb0aa",
            contrastText: "#123c69",
        },

        text: {
            main: "#000000",
            v1: "#ac3b61"
        },

        background: {
            default: "#ffffff",
        }
    },
    shape: {
        borderRadius: 3,
    }
})

export default theme;