import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import TaskCard from './TaskCard';
import { GRID_SIZES } from '../constants/constants';

const TaskList = React.memo(({ tasks, handleTaskUpdate, handleTaskDelete, handleCreateTask, handleToggleTaskStatus }) => {
  const taskCards = useMemo(() => (
    tasks.map((task) => (
      <Grid item xs={GRID_SIZES.xs} sm={GRID_SIZES.sm} md={GRID_SIZES.md} key={task._id}>
        <TaskCard
          task={task}
          handleTaskUpdate={handleTaskUpdate}
          handleTaskDelete={handleTaskDelete}
          handleToggleTaskStatus={handleToggleTaskStatus}
        />
      </Grid>
    ))
  ), [tasks, handleTaskUpdate, handleTaskDelete, handleToggleTaskStatus]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={GRID_SIZES.xs} sm={GRID_SIZES.sm} md={GRID_SIZES.md}>
        <TaskCard handleCreateTask={handleCreateTask} />
      </Grid>
      {taskCards}
    </Grid>
  );
});

export default TaskList;
