import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 800,
    },
  },
  palette: {
    primary: {
      main: blue[300],
    },
    secondary: {
      main: "#11cb5f",
    },
    palette: {
      background: {
        default: "#ffffff",
      },
    },
  },
});

function CarTheme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
export default CarTheme;
