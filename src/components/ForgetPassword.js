import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import './ForgetPassword.css';

// Styled container
const ForgetPasswordContainer = styled(Box)(({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
}));

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

   const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) {
    setMessage('Please enter a valid email address.');
    return;
  }

  try {
    const response = await fetch('https://learningtrackingsystem.up.railway.app/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      // Use response.text() for plain text responses
      const result = await response.text();
      setMessage(result || 'Password reset instructions have been sent to your email.');
    } else {
      const result = await response.json().catch(() => null);
      setMessage(result?.message || 'Error processing your request. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    setMessage('An error occurred. Please try again later.');
  }
};


    return (
        <ForgetPasswordContainer>
            <Typography variant="h4" component="h1" gutterBottom>
                Forgot Password
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
                Enter your email address to reset your password.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} className="forget-password-form">
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    margin="normal"
                    variant="outlined"
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Submit
                </Button>
            </Box>
            {message && (
                <Typography
                    variant="body2"
                    color={message.toLowerCase().includes('sent') ? 'green' : 'error'}
                    sx={{ marginTop: 2 }}
                >
                    {message}
                </Typography>
            )}
            <Link href="/signin" underline="hover" color="primary" sx={{ marginTop: 2 }}>
                Back to Sign In
            </Link>
        </ForgetPasswordContainer>
    );
};

export default ForgetPassword;
