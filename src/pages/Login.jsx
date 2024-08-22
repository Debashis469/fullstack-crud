import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, isLoading, error} = useLogin() ;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic here
    await login(email, password) ;
    console.log("Email:", email, "Password:", password);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxHeight="100vh"
          pt={"20%"}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            width="100%"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="loginError" style={{ color: "red" }}>
                {error}
              </div>
            )}

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isLoading}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
