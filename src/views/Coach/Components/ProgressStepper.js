import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  const [progress, setProgress] = React.useState(props.progress);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(
    getCompleted(props.tasks_completed)
  );
  const stepDescriptions = getSteps(props.tasks);
  const steps = props.tasks;

  useEffect(() => {
    setProgress(props.progress);
    setUser(props.user);
  }, [props.user, props.progress]);

  function getSteps(tasks) {
    let strippedDescriptionString = [];
    if (!tasks) {
      return [];
    }
    tasks.forEach(element => {
      strippedDescriptionString.push(element.description);
    });
    return strippedDescriptionString;
  }

  function getCompleted(tasks) {
    let set = new Set();
    for (let i = 0; i < tasks; i++) {
      set.add(i);
    }
    return set;
  }

  function getStepContent(step) {
    return stepDescriptions[step];
  }

  const totalSteps = () => {
    return stepDescriptions.length;
  };
  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    console.log(completedSteps() + " : " + totalSteps());
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
          stepDescriptions.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);
    if (completed.size !== totalSteps()) {
      handleNext();
    }
  };
  //change to handle complete!!!!!!!!!!!!!
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
        {stepDescriptions.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          return (
            <Step key={index} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
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
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>

              {activeStep !== stepDescriptions.length &&
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
