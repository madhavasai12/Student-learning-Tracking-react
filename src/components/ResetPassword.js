import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query parameters
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  };

  const token = getTokenFromUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setMessage('Please enter a new password.');
      return;
    }

    if (!token) {
      setMessage('Invalid or missing token.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('http://localhost:8080/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }), // Send both token and password in the body
      });

      if (response.ok) {
        setMessage('Password reset successful. Redirecting to sign in...');
        setTimeout(() => navigate('/signin'), 2000); // Redirect to sign-in page after 2 seconds
      } else {
        const result = await response.json().catch(() => null);
        const errorMessage = result?.message || 'Error resetting password.';
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing token.');
    }
  }, [token]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f9f9f9"
      padding="16px"
    >
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} width="300px">
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
      {message && (
        <Typography
          color={message.includes('successful') ? 'green' : 'error'}
          sx={{ mt: 2, textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ResetPassword;
