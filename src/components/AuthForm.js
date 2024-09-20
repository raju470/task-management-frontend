import React, { useState, useContext, useMemo, useCallback } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../api/api';
import { SnackbarContext } from '../context/SnackbarContext';
import { validateForm } from '../utility/validation';
import { FORM_LABELS } from '../constants/formLabels';

const AuthForm = React.memo(() => {
    const [isLogin, setLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const showSnackbar = useContext(SnackbarContext);

    const handleChange = useCallback((e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const errors = useMemo(() => validateForm(formData, isLogin), [formData, isLogin]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
            } else {
                setFormErrors({});
            }

            try {
                if (!isLogin) {
                    await register(formData);
                    showSnackbar('User has registered successfully. Please log in.', 'success');
                    setFormData({ username: '', email: '', password: '' });
                    setLogin(true);
                } else {
                    const response = await login(formData);
                    localStorage.setItem('token', response.data.token);
                    showSnackbar('Logged in successfully', 'success');
                    navigate('/tasks');
                }
            } catch (err) {
                const errorMessage = err.response?.data?.msg || 'An error occurred, please try again';
                showSnackbar(errorMessage, 'error');
            }
        },
        [formData, isLogin, errors, showSnackbar, navigate]
    );

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                background: 'linear-gradient(135deg, #74ebd5 30%, #ACB6E5 90%)',
            }}
        >
            <form onSubmit={handleSubmit} noValidate>
                <Box
                    display="flex"
                    flexDirection="column"
                    maxWidth={300}
                    alignItems="center"
                    justifyContent="center"
                    margin="auto"
                    padding={3}
                    borderRadius={4}
                    boxShadow="5px 5px 10px #ccc"
                    bgcolor="#f2f2f2"
                    sx={{
                        ":hover": {
                            boxShadow: '10px 10px 20px #ccc',
                        },
                    }}
                >
                    <Typography variant="h4" padding={2} textAlign="center">
                        {isLogin ? FORM_LABELS.login : FORM_LABELS.signup}
                    </Typography>
                    <TextField
                        label={FORM_LABELS.username}
                        name="username"
                        type="text"
                        margin="normal"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        error={!!formErrors.username}
                        helperText={formErrors.username}
                        fullWidth
                        size="small"
                    />
                    {!isLogin && (
                        <TextField
                            label={FORM_LABELS.email}
                            name="email"
                            type="email"
                            margin="normal"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            fullWidth
                            size="small"
                        />
                    )}
                    <TextField
                        label={FORM_LABELS.password}
                        name="password"
                        type="password"
                        margin="normal"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        fullWidth
                        size="small"
                    />
                    <Button
                        type="submit"
                        sx={{ marginTop: 2, borderRadius: 2 }}
                        variant="contained"
                        color="warning"
                        fullWidth
                    >
                        {isLogin ? FORM_LABELS.login : FORM_LABELS.signup}
                    </Button>
                    <Button
                        onClick={() => {
                            setLogin((prev) => !prev);
                            setFormData({ username: '', email: '', password: '' });
                            setFormErrors({});
                        }}
                        color="primary"
                        sx={{ marginTop: 1 }}
                    >
                        {isLogin ? FORM_LABELS.changeToSignup : FORM_LABELS.changeToLogin}
                    </Button>
                </Box>
            </form>
        </Box>
    );
});

export default AuthForm;
