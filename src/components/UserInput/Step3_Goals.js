import React, { useContext ,useState } from 'react';
import { AppContext } from '../../context/AppContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, TextField, Button, Stack, Paper,IconButton } from '@mui/material';

const Step3Goals = () => {
  const { nextStep, prevStep, userInput, addGoal, handleGoalChange,removeGoal } = useContext(AppContext);
  const [errors, setErrors] = useState([]);

  const validate = () => {
    let newErrors = [];

    userInput.goals.forEach((goal, index) => {
      let goalErrors = {};

      if (!goal.name.trim()) goalErrors.name = "Goal name is required";

      if (!goal.target_amount) goalErrors.target_amount = "Target amount is required";
      else if (goal.target_amount <= 0) goalErrors.target_amount = "Amount must be positive";

      if (!goal.timeline_years) goalErrors.timeline_years = "Timeline is required";
      else if (goal.timeline_years <= 0) goalErrors.timeline_years = "Timeline must be positive";

      newErrors[index] = goalErrors;
    });

    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5" align="center" gutterBottom>
         Your Goals
      </Typography>
      
      {userInput.goals.map((goal, index) => (
        <Paper key={index} elevation={2} sx={{ p: 2, mt: 1 }}>
          <IconButton
            color="error"
            onClick={() => removeGoal(index)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            disabled={userInput.goals.length === 1} // prevent deleting last goal
          >
            <DeleteIcon />
          </IconButton>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Goal {index + 1}</Typography>
            <TextField
              label="Goal Name"
              name="name"
              value={goal.name}
              onChange={(e) => handleGoalChange(index, e)}
              variant="outlined"
              error={errors[index]?.name}
              helperText={errors[index]?.name}
              
            />
            <TextField
              label="Target Amount (₹)"
              name="target_amount"
              type="number"
              value={goal.target_amount}
              onChange={(e) => handleGoalChange(index, e)}
              variant="outlined"
              error={errors[index]?.target_amount}
              helperText={errors[index]?.target_amount}
              
            />
            <TextField
              label="Timeline (in years)"
              name="timeline_years"
              type="number"
              value={goal.timeline_years}
              onChange={(e) => handleGoalChange(index, e)}
              variant="outlined"
              error={errors[index]?.timeline_years}
              helperText={errors[index]?.timeline_years}
              
            />
          </Stack>
        </Paper>
      ))}

      <Button variant="outlined" onClick={addGoal} sx={{ mt: 2 }}>
        Add Another Goal
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={prevStep}>Back</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
      </Box>
    </Stack>
  );
};

export default Step3Goals;