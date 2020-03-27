import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import API from "../../../utils/API";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function HorizontalNonLinearAlternativeLabelStepper(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState(props.user);
  const [badgeId, setBadgeId] = React.useState(props._id);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(
    getCompleted(props.tasks_completed)
  ); //change this to an array if you can.
  // const steps = props.tasks;
  const [steps, setStep] = React.useState(props.tasks);

  useEffect(() => {
    setBadgeId(props._id);
    setUser(props.user);
  });

  function getCompleted(tasks) {
    let set = new Set();
    for (let i = 0; i < tasks; i++) {
      set.add(i);
    }
    return set;
  }

  function getStepContent(step) {
    return steps[step].Description;
  }

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    let taskRemove = {
      user_id: user._id,
      badge_id: badgeId,
      task_id: steps[activeStep]._id
    };
    API.put("/badges/task/delete", taskRemove);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
    console.log(completed.size + " " + totalSteps());
    if (completed.size === totalSteps() - 1) {
    } else {
      let taskComplete = {
        user_id: user._id,
        badge_id: badgeId,
        task_id: steps[activeStep]._id
      };
      API.put("/badges/task", taskComplete);
      updateTasksCompleted();
      handleNext();
    }
  };

  async function updateTasksCompleted() {
    let request = {
      params: { user_id: user._id, badge_id: badgeId }
    };
    let res = await API.get("/badges/task/completed", request);
    console.log(res.data);
  }

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((task, index) => {
          const stepProps = {};
          const buttonProps = {};
          return (
            <Step key={index} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {task.Description}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                onClick={handleBack}
                className={classes.button}
                color='secondary'
                variant='contained'
              >
                Remove Task
              </Button>
              {/* <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button> */}

              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant='caption' className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
