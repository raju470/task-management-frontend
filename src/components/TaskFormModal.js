import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Snackbar, Alert, Box } from '@mui/material';
import { getTaskById } from '../api/api';
import { MESSAGES, FORM_STATUS, MODAL_TITLES, DIALOG_STYLES } from '../constants/constants';

const TaskFormModal = ({ open, handleClose, mode, taskId, handleSubmit }) => {
    const [formData, setFormData] = useState({ title: '', description: '', status: FORM_STATUS.PENDING });
    const [formErrors, setFormErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState('');

    const getToken = useCallback(() => localStorage.getItem('token'), []);

    useEffect(() => {
        const fetchTaskData = async () => {
            if (taskId && mode === 'update') {
                try {
                    const response = await getTaskById(taskId, getToken());
                    const task = response.data;
                    setFormData({
                        title: task.title || '',
                        description: task.description || '',
                        status: task.status || FORM_STATUS.PENDING,
                    });
                } catch (err) {
                    setError(MESSAGES.FETCH_TASK_ERROR);
                    setSnackbarOpen(true);
                }
            } else {
                setFormData({ title: '', description: '', status: FORM_STATUS.PENDING });
            }
        };

        if (open) {
            fetchTaskData();
            setFormErrors({});
        } else {
            setFormData({ title: '', description: '', status: FORM_STATUS.PENDING });
        }
    }, [taskId, mode, open, getToken]);

    const validateForm = () => {
        const errors = {};
        if (!formData.title) errors.title = MESSAGES.FORM_ERROR.TITLE_REQUIRED;
        return errors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await handleSubmit(formData);
            handleClose();
        } catch (err) {
            setError(err.response?.data?.message || MESSAGES.SNACKBAR_ERROR);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: DIALOG_STYLES.PAPER,
                }}
            >
                <DialogTitle sx={{ color: '#fff' }}>
                    {mode === 'create' ? MODAL_TITLES.CREATE : MODAL_TITLES.UPDATE}
                </DialogTitle>
                <DialogContent>
                    <Box sx={DIALOG_STYLES.BOX}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={!!formErrors.title}
                            helperText={formErrors.title}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary" variant="contained">
                        {mode === 'create' ? 'Create Task' : 'Update Task'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={DIALOG_STYLES.ALERT}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
};

export default TaskFormModal;
