import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  buttonsContainer,
  forgotPassword,
  h4,
  socialButtons,
  span,
} from "./signInUp-style";
import { auth } from "../firebase";
import firebase from "firebase";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { teal } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { signIn } from "../reducers/actions/action";
import {useSelector} from "react-redux";

const headerStyle = {
  fontWeight: "bold",
  fontSize: "20px",
};

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then();
};
const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then();
};
const signInWithGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  auth.signInWithPopup(provider).then();
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(-1);
  const account = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signIn(data));
  };

  React.useEffect(()=>{
    if(Object.keys(account).length !== 0)
      navigate('/')
  }, [account]);

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
            marginTop: "-20px",
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
              Please log in to proceed!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "E-mail address is empty!",
                })}
                error={Boolean(errors["email"])}
                helperText={errors["email"]?.message}
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is empty!",
                })}
                error={Boolean(errors["password"])}
                helperText={errors["password"]?.message}
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: teal[400], padding: "10px" }}
              >
                Sign In
              </Button>
              {err === 0 && (
                <Alert
                  severity="error"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  The email you entered isn’t connected to an account.
                </Alert>
              )}
              {err === 1 && (
                <Alert
                  severity="error"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  The password you’ve entered is incorrect.
                </Alert>
              )}
              <h4 style={h4}>
                <span style={span}>Or</span>
              </h4>
              <div style={buttonsContainer}>
                <button
                  onClick={signInWithGoogle}
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
                  onClick={signInWithFacebook}
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
                  onClick={signInWithGithub}
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
              <Grid container>
                <Grid item xs>
                  <Link href="#" sx={forgotPassword}>
                    <Typography variant="body2">Forgot password?</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: "14px", display: "inline" }}>
                    Don't have an account?
                  </Typography>
                  &nbsp;{" "}
                  <Link
                    onClick={() => navigate("/signup")}
                    sx={{ cursor: "pointer" }}
                  >
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
