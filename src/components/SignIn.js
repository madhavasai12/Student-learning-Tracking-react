import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import signInImage from './images/signin.jpeg'; // Adjust the relative path as needed
import './SignIn.css';

// Styled container for the sign-in box
const SignInContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '80%',
    height: '90vh',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
});

// Styled MUI Box for the image
const ImageBox = styled(Box)({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
});

// Styled MUI Box for the form
const FormBox = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    backgroundColor: '#ffffff',
});

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        captcha: '',
    });
    const [captcha, setCaptcha] = useState('');
    const navigate = useNavigate();

    const generateCaptcha = () => {
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
        setCaptcha(randomNum);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, captcha } = formData;

        if (captcha !== String(captcha)) {
            alert('Incorrect CAPTCHA');
            return;
        }

        if (!email || !password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await fetch('https://learningtrackingsystem.up.railway.app/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                const { name, role } = result;
                localStorage.setItem('userDetails', JSON.stringify({ name, email, role }));

                if (role === 'teacher') {
                    navigate('/teacherhome');
                } else if (role === 'student') {
                    navigate('/studenthome');
                }
            } else {
                alert(result.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <SignInContainer>
            <ImageBox>
                <img src={signInImage} alt="Sign In Visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ImageBox>
            <FormBox>
                <Typography variant="h4" component="h1" gutterBottom>
                    <h1 style={{ color: "blue" }}>... WELCOME ...</h1>
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <div className="captcha-box">
                        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                            CAPTCHA: {captcha}
                        </Typography>
                        <TextField
                            fullWidth
                            id="captcha"
                            name="captcha"
                            label="Enter CAPTCHA"
                            value={formData.captcha}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2, padding: '0.8rem', fontSize: '1rem' }}
                    >
                        Sign In
                    </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                    Don't have an account?{' '}
                    <Link href="/signup" underline="hover" color="primary">
                        Sign up here
                    </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                    <Link href="/forgot-password" underline="hover" color="primary">
                        Forgot Password?
                    </Link>
                </Typography>
            </FormBox>
        </SignInContainer>
    );
};

export default SignIn;
