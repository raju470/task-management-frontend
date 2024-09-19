import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { getTasks, createTask, updateTask, deleteTask } from '../api/api';
import { Snackbar, Alert, Box, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { GRADIENT_BACKGROUND } from '../constants/styles';

const getToken = () => localStorage.getItem('token');

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(getToken());
                setTasks(response.data);
            } catch (err) {
                handleError(err, 'Failed to fetch tasks');
            }
        };
        fetchTasks();
    }, []);

    const handleTaskUpdate = async (taskId, updatedTask) => {
        try {
            console.log(updatedTask);
            const response = await updateTask(taskId, updatedTask, getToken());
            setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
        } catch (err) {
            handleError(err, 'Failed to update task');
        }
    };

    const handleTaskDelete = async (taskId) => {
        try {
            await deleteTask(taskId, getToken());
            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (err) {
            handleError(err, 'Failed to delete task');
        }
    };

    const handleError = (err, defaultMessage) => {
        const message = err.response?.data?.msg || defaultMessage;
        setError(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const filteredTasks = tasks.filter((task) => {
        console.log(filter);
        if (filter === 'all') return true;
        if (filter === 'pending') return task.status === 'pending';
        if (filter === 'completed') return task.status === 'completed';
        return true;
    });

    const handleFilterChange = (e) => {
        if (e.target.value !== null) {
            setFilter(e.target.value);
        }
    };

    const openCreateTaskModal = () => {
        setModalMode('create');
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const openUpdateTaskModal = (task) => {
        setModalMode('update');
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (modalMode === 'create') {
                await createTask(formData, getToken());
            } else {
                await updateTask(selectedTask, formData, getToken());
            }
            setIsModalOpen(false);
            const response = await getTasks(getToken());
            setTasks(response.data);
        } catch (err) {
            handleError(err, 'Failed to save task');
        }
    };

    return (
        <Box
            sx={{
                background: GRADIENT_BACKGROUND,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                p: 3
            }}
        >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Grid item>
                    <ToggleButtonGroup
                        value={filter}
                        exclusive
                        onChange={handleFilterChange}
                        aria-label="task filter"
                    >
                        <ToggleButton value="all" aria-label="show all tasks" sx={{ color: 'black' }}>
                            All
                        </ToggleButton>
                        <ToggleButton value="pending" aria-label="show pending tasks" sx={{ color: 'black' }}>
                            Pending
                        </ToggleButton>
                        <ToggleButton value="completed" aria-label="show completed tasks" sx={{ color: 'black' }}>
                            Completed
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>

            <Box flex={1}>
                <TaskList
                    tasks={filteredTasks}
                    handleTaskUpdate={openUpdateTaskModal}
                    handleTaskDelete={handleTaskDelete}
                    handleCreateTask={openCreateTaskModal}
                    handleToggleTaskStatus={(taskId, taskStatus) => handleTaskUpdate(taskId, { status: taskStatus })}
                />
            </Box>

            <TaskFormModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                mode={modalMode}
                taskId={selectedTask}
                handleSubmit={handleFormSubmit}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Tasks;
