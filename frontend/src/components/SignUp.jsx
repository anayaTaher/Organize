import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  buttonsContainer,
  h4,
  headerStyle,
  socialButtons,
  span,
} from "./signInUp-style";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import emailjs from "emailjs-com";
import { teal } from "@mui/material/colors";

export default function SignUp() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [userN, setUserN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [confirmCode, setConfirmCode] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const [event, setEvent] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const onSubmit = (data, e) => {
    if (password === confirmPassword) {
      axios
        .post("http://localhost:4000/signup", { ...data, check: true })
        .then((res) => {
          if (res.data) {
            setErr(false);
            setRandomNumber(Math.floor(100000 + Math.random() * 900000));
            setSubmitData(data);
            emailjs.sendForm(
              "service_zc1dobn",
              "template_dsbvup6",
              e.target,
              "user_r4CdEfbns077oecJccQBI"
            );
            setOpen(true);
          } else {
            setErr(true);
          }
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          style={{
            backgroundColor: "#FFF",
            paddingBottom: "20px",
            borderRadius: "5px",
            marginTop: "-3%",
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: teal[400], marginTop: "30Px" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={headerStyle}>
              Sign up to Organize!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...register("firstName", {
                      required: "First Name is required.",
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message: "Invalid First Name",
                      },
                    })}
                    error={Boolean(errors["firstName"])}
                    helperText={errors["firstName"]?.message}
                    value={first}
                    onInput={(e) => setFirst(e.target.value)}
                  />
                </Grid>
                <Grid hidden>
                  <input
                    name="confirmationCode"
                    readOnly
                    value={randomNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    {...register("lastName", {
                      required: "Last Name is required.",
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message: "Invalid Last Name",
                      },
                    })}
                    error={Boolean(errors["lastName"])}
                    helperText={errors["lastName"]?.message}
                    value={last}
                    onInput={(e) => setLast(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    {...register("username", {
                      required: "Username is required.",
                      pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Invalid Username",
                      },
                    })}
                    error={Boolean(errors["username"])}
                    helperText={errors["username"]?.message}
                    value={userN}
                    onInput={(e) => setUserN(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email Address is required.",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid Email",
                      },
                    })}
                    error={Boolean(errors["email"])}
                    helperText={errors["email"]?.message}
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required.",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                        message: "Invalid Password",
                      },
                    })}
                    error={Boolean(errors["password"])}
                    helperText={errors["password"]?.message}
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                      required: "Confirm is required.",
                      pattern: {
                        value: password,
                        message: "Passwords is mismatch",
                      },
                    })}
                    error={
                      Boolean(errors["confirmPassword"]) ||
                      confirmPassword !== password
                    }
                    helperText={errors["confirmPassword"]?.message}
                    value={confirmPassword}
                    onInput={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ display: "inline", fontSize: "12px" }}>
                    By clicking Sign Up, you agree to the Organize{" "}
                    <Link>Terms & Conditions</Link>
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1, bgcolor: teal[400], padding: "10px" }}
              >
                Sign Up
              </Button>
              {err && (
                <Alert
                  severity="error"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  The email address is already being used.
                </Alert>
              )}
              <h4 style={h4}>
                <span style={span}>Or</span>
              </h4>
              <div style={buttonsContainer}>
                <button
                  className="social-buttons"
                  type="submit"
                  style={socialButtons}
                >
                  <img
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt=""
                    style={{ width: "80%" }}
                  />
                </button>
                <button
                  className="social-buttons"
                  type="submit"
                  style={socialButtons}
                >
                  <img
                    src="https://img.icons8.com/ios-filled/48/1778F2/facebook-new.png"
                    alt=""
                    style={{ width: "80%" }}
                  />
                </button>
                <button
                  className="social-buttons"
                  type="submit"
                  style={socialButtons}
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/twitter--v1.png"
                    alt=""
                    style={{ width: "80%" }}
                  />
                </button>
                <button
                  className="social-buttons"
                  type="submit"
                  style={socialButtons}
                >
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/github.png"
                    alt=""
                    style={{ width: "80%" }}
                  />
                </button>
              </div>
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography style={{ display: "inline", marginLeft: "-3%" }}>
                    Already have an account?
                    <Link
                      onClick={() => navigate("/login")}
                      style={{ cursor: "pointer" }}
                      sx={{ ml: 1 }}
                    >
                      Login
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Dialog open={open}>
            <DialogTitle>Email Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We just sent a confirmation code to <b>{email}</b>
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="confirmationCode"
                label="confirmationCode"
                type="confirmationCode"
                fullWidth
                variant="standard"
                value={confirmCode}
                onInput={(e) => setConfirmCode(e.target.value)}
              />
              {confirmError && (
                <Alert
                  severity="error"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  The code entered is incorrect.
                </Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (randomNumber === Number(confirmCode)) {
                    axios
                      .post("http://localhost:4000/signup", submitData)
                      .then((_) => {
                        navigate("/login");
                      });
                  } else {
                    setConfirmError(true);
                  }
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
}
