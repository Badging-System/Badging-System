import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: "#11cb5f" },
    secondary: { main: "#11cb5f" },
    textPrimary: { main: "#fffff" }
  }
});
export default Theme;
