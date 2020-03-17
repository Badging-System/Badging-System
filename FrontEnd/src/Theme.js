import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: { main: "#1B73D3" },
    secondary: { main: "#D5AD36" },
    textPrimary: { main: "#fffff" }
  }
});
export default Theme;
