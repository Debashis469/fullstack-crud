import React, { useState } from "react";
import useSignup from "../hooks/useSignup";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform signup logic here
    console.log("Email:", email, "Password:", password);
    await signup(email, password);
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
          Signup
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
            type="email"
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

          {error && <div className="signupError" style={{color: "red"}} >{error}</div>}

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default Signup;
