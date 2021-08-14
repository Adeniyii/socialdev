import { makeStyles } from "@material-ui/core/styles";

// Styles for material-ui components
export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  button: {
    // padding: "13px",
    textTransform: "none",
    fontSize: "1.2rem",
    fontWeight: "500",
    borderRadius: "8px",
  },
  buttonsec: {
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: "500",
    backgroundColor: "#42b72a",
    color: "#fff",
    borderRadius: "8px",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#2f8c1c",
    },
  },
  link: {
    fontSize: "0.9rem",
  },
  linkTypo: {
    margin: "20px 0",
  },
  input: {
    borderRadius: "10px",
  },
}));
