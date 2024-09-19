import React, { useCallback, useMemo } from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import { MAX_DESCRIPTION_LENGTH, COLORS, TASK_CARD } from '../constants/constants';

const TaskCard = (({ task, handleTaskUpdate, handleTaskDelete, handleToggleTaskStatus, handleCreateTask }) => {
  const taskInfo = useMemo(() => task || {}, [task]);

  const isDescriptionLong = useMemo(
    () => taskInfo?.description?.length > MAX_DESCRIPTION_LENGTH,
    [taskInfo?.description]
  );

  const onToggleStatus = useCallback(() => {
    const newStatus = taskInfo.status === 'completed' ? 'pending' : 'completed';
    console.log(newStatus);
    handleToggleTaskStatus(taskInfo._id, newStatus);
  }, [handleToggleTaskStatus, taskInfo._id, taskInfo.status]);

  const onEditTask = useCallback(() => {
    handleTaskUpdate(taskInfo._id, { ...taskInfo });
  }, [handleTaskUpdate, taskInfo]);

  const onDeleteTask = useCallback(() => {
    handleTaskDelete(taskInfo._id);
  }, [handleTaskDelete, taskInfo._id]);

  if (!task) {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          height: TASK_CARD.HEIGHT,
          bgcolor: COLORS.createTaskBg,
        }}
        onClick={handleCreateTask}
      >
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h6">Create New Task</Typography>
          <AddIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: taskInfo.status === 'completed' ? COLORS.completedBg : COLORS.pendingBg, // Use constants
        border: `1px solid ${taskInfo.status === 'completed' ? COLORS.completedBorder : COLORS.pendingBorder}`, // Use constants
        height: TASK_CARD.HEIGHT,
      }}
    >
      <CardContent>
        <Typography variant="h6">{taskInfo.title}</Typography>
        <Tooltip title={isDescriptionLong ? taskInfo.description : ''}>
          <Typography
            color="textSecondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {isDescriptionLong
              ? `${taskInfo.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
              : taskInfo.description}
          </Typography>
        </Tooltip>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
        <Tooltip title={taskInfo.status === 'completed' ? 'Mark as pending' : 'Mark as complete'}>
          <IconButton
            aria-label={taskInfo.status === 'completed' ? 'mark as pending' : 'mark as complete'}
            onClick={onToggleStatus}
            sx={{ color: taskInfo.status === 'completed' ? COLORS.completeIcon : COLORS.pendingIcon }}
          >
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit task">
          <IconButton
            aria-label="edit"
            onClick={onEditTask}
            sx={{ color: COLORS.editIcon }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete task">
          <IconButton
            aria-label="delete"
            onClick={onDeleteTask}
            sx={{ color: COLORS.deleteIcon }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
});

export default TaskCard;
