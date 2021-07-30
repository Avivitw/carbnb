import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../providers/authProvider";
import {
  AppBar,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Toolbar,
  Menu,
  Avatar,
  MenuItem,
} from "@material-ui/core";

import { makeStyles, alpha } from "@material-ui/core/styles";

import MuiAlert from "@material-ui/lab/Alert";

import "./TopNav.scss";

const useStyles = makeStyles((theme) => ({
  login: {
    font: "Trebuchet MS",
    fontSize: "larger",
  },
  topnav__logo: {
    font: "Trebuchet MS",
  },
  // icon: {
  //   width: theme.spacing(8),
  //   height: theme.spacing(8),
  // },
  iconButton: {
    font: "Trebuchet MS",
    minWidth: "48px",
    textAlign: "center",
    flex: "0 0 auto",
    fontSize: theme.typography.pxToRem(22),
    padding: 12,
    borderRadius: "16px",
    overflow: "visible",
    textTransform: "none",
    // Explicitly set the default value to solve a bug on IE 11.
    color: theme.palette.action.active,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shortest,
    }),
    "&:hover": {
      color: "#fff",
      backgroundColor: (0, alpha)(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity
      ),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&:disabled": {
      backgroundColor: "transparent",
      color: theme.palette.action.disabled,
    },
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    boxShadow: theme.shadows[8],
    marginLeft: "8px",
  },
  topnav__logo: {
    fontWeight: "500",
    fontSize: "30px",
  },
}));

const TopNav = (props) => {
  const { login, register, logout, auth, user } = useContext(authContext);
  const history = useHistory();
  const classes = useStyles();

  //
  // Loding Form state and methods
  //
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  // Close login dialog and clear form
  const handleLoginClose = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginErrorMessage("");
    setLoginOpen(false);
  };

  // Submit the login form
  const loginSubmit = async (event) => {
    event.preventDefault();
    const { result, error } = await login(loginEmail, loginPassword);
    if (result === "success") {
      handleLoginClose();
      setSnackOpen(true);
    } else {
      setLoginErrorMessage(error.response.data.error);
    }
  };

  //
  // Registration state and methods
  //

  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] =
    useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerImage, setRegisterImage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const handleRegisterClose = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterPasswordConfirmation("");
    setRegisterName("");
    setRegisterPhone("");
    setRegisterImage("");
    setRegisterErrorMessage("");
    setRegisterOpen(false);
  };

  const registerSubmit = async (event) => {
    event.preventDefault();
    // Make sure password and confirmation match.
    if (registerPassword !== registerPasswordConfirmation) {
      return setRegisterErrorMessage("Passwords must match");
    }

    const formData = {
      name: registerName,
      email: registerEmail,
      image: registerImage,
      password: registerPassword,
      phone: registerPhone,
    };
    const { result, error } = await register(formData);

    if (result === "success") {
      // TODO: add a toast notification to show success.
      handleRegisterClose();
    } else {
      console.log(error.response);
      setRegisterErrorMessage("There was an error creating your account");
    }
  };

  // Snackbars: state and methods
  const [snackOpen, setSnackOpen] = useState(false);
  const [loggedOutOpen, setLoggedOutOpen] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    snackOpen && setSnackOpen(false);
    loggedOutOpen && setLoggedOutOpen(false);
  };

  const handleLogout = () => {
    logout();
    setLoggedOutOpen(true);
    closeMenu();
    history.push("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const menuIsOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleUserDashboard = () => {
    history.push("/user-dashboard");
    closeMenu();
  };

  const handleHostDashboard = () => {
    history.push("/host-dashboard");
    closeMenu();
  };

  const handleMessages = () => {
    history.push("/messages");
    closeMenu();
  };

  return (
    <nav>
      <AppBar position="fixed">
        <Toolbar className="topnav__toolbar">
          <div className="topnav__toolbar--left">
            <Typography
              variant="h5"
              onClick={() => history.push("/")}
              className={classes.topnav__logo}
            >
              Share My Ride
            </Typography>
          </div>
          <div>
            {!auth && (
              <>
                <Button
                  className={classes.login}
                  color="inherit"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
                <Button
                  className={classes.login}
                  color="inherit"
                  onClick={() => setRegisterOpen(true)}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {auth && (
            <div>
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.iconButton}
              >
                {user.name}
                <Avatar
                  alt={user.name}
                  src={user.image}
                  className={classes.large}
                />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={menuIsOpen}
                onClose={closeMenu}
              >
                <MenuItem onClick={handleUserDashboard}>
                  User Dashboard
                </MenuItem>
                <MenuItem onClick={handleMessages}>Messages</MenuItem>
                {user.hosts && (
                  <MenuItem onClick={handleHostDashboard}>
                    Host Dashboard
                  </MenuItem>
                )}

                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="login-dialog"
      >
        <form id="dsub" onSubmit={loginSubmit}>
          <DialogTitle id="login-dialog">Login</DialogTitle>
          <DialogContent className="topnav__login--error">
            {loginErrorMessage && (
              <DialogContentText>{loginErrorMessage}</DialogContentText>
            )}
            <TextField
              margin="dense"
              id="login-email"
              type="email"
              label="Email Address"
              fullWidth
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              required
              autoFocus
            />
            <TextField
              margin="dense"
              id="login-password"
              type="password"
              label="Password"
              fullWidth
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoginClose} variant="contained">
              Cancel
            </Button>
            <Button
              type="submit"
              form="dsub"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={registerOpen}
        onClose={handleRegisterClose}
        aria-labelledby="register-dialog"
      >
        <form id="rform" onSubmit={registerSubmit}>
          <DialogTitle id="register-dialog">Register</DialogTitle>
          <DialogContent className="topnav__login--error">
            {registerErrorMessage && (
              <DialogContentText>{registerErrorMessage}</DialogContentText>
            )}
            <TextField
              margin="dense"
              id="register-email"
              type="email"
              label="Email Address"
              fullWidth
              value={registerEmail}
              onChange={(event) => setRegisterEmail(event.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="register-name"
              type="input"
              label="Full Name"
              fullWidth
              value={registerName}
              onChange={(event) => setRegisterName(event.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="register-phone"
              type="input"
              label="Phone Number"
              fullWidth
              value={registerPhone}
              onChange={(event) => setRegisterPhone(event.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="register-image"
              type="input"
              label="Avatar Image"
              fullWidth
              value={registerImage}
              onChange={(event) => setRegisterImage(event.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="register-password"
              type="password"
              label="Password"
              value={registerPassword}
              onChange={(event) => setRegisterPassword(event.target.value)}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="register-password-confirm"
              type="password"
              label="Confirm Password"
              value={registerPasswordConfirmation}
              onChange={(event) =>
                setRegisterPasswordConfirmation(event.target.value)
              }
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRegisterClose} variant="contained">
              Cancel
            </Button>
            <Button
              type="submit"
              form="rform"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <MuiAlert
          onClose={handleCloseSnack}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Successfully logged in as {user.name}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={loggedOutOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <MuiAlert
          onClose={handleCloseSnack}
          severity="info"
          elevation={6}
          variant="filled"
        >
          Logged out
        </MuiAlert>
      </Snackbar>
    </nav>
  );
};

export default TopNav;
