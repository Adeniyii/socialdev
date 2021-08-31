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
    fontWeight: "700",
    borderRadius: "5px",
  },
  buttonsec: {
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: "700",
    backgroundColor: "#42b72a",
    color: "#fff",
    borderRadius: "5px",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#2f8c1c",
    },
  },
  link: {
    fontSize: "0.9rem",
  },
  linkTypo: {
    margin: "15px 0",
  },
  navbar: {
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 0 0 rgb(0 0 0 / 10%), 0 0 10px rgb(0 0 0 / 10%)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
}));
