import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import API from "../../../utils/API";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import Card from "../../../components/Card/Card";

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
  const user = props.user;
  const badgeId = props._id;
  const steps = props.tasks;
  const badgeName = props.badgeName;
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(props.tasks_completed);

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return completed.length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  // const isLastStep = () => {
  //   return activeStep === totalSteps() - 1;
  // };

  // const handleNext = () => {
  //   const newActiveStep =
  //     isLastStep() && !allStepsCompleted()
  //       ? // It's the last step, but not all steps have been completed
  //         // find the first step that has been completed
  //         steps.findIndex((step, i) => !completed.includes(i))
  //       : activeStep + 1;

  //   setActiveStep(newActiveStep);
  // };

  const handleRemove = () => {
    let taskRemove = {
      user_id: user._id,
      badge_id: badgeId,
      task_id: steps[activeStep]._id
    };
    API.put("/badges/task/delete", taskRemove);
    updateRemoved(steps[activeStep]._id);
  };

  async function updateRemoved() {
    let request = {
      params: {
        user_id: user._id,
        badge_id: badgeId
      }
    };
    let res = await API.get("/badges/tasks/completed", request);
    setCompleted(res.data.payload.data.Tasks_Completed);
  }

  const handleStep = step => () => {
    console.log(step);
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (completed.length === totalSteps() - 1) {
    } else {
      let taskComplete = {
        user_id: user._id,
        badge_id: badgeId,
        task_id: steps[activeStep]._id
      };

      const newCompleted = completed;
      newCompleted.push(steps[activeStep]._id);
      setCompleted(newCompleted);
      API.put("/badges/task", taskComplete);
      updateRemoved(steps[activeStep]._id);
      // handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
  };

  function isStepComplete(step) {
    if (!step) {
      return false;
    }
    return completed.includes(step);
  }

  return (
    <Card chart>
      <CardHeader color={"admin"} stats icon>
        <CardIcon color={"admin"}>
          <h3>{user.Username}</h3>
        </CardIcon>
      </CardHeader>
      <CardBody>
        <div className={classes.root}>
          <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((task, index) => {
              const stepProps = {};
              const buttonProps = {};
              return (
                <Step key={task} {...stepProps}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={isStepComplete(task._id)}
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
                <Typography className={classes.instructions}></Typography>
                <div>
                  <Button
                    onClick={handleRemove}
                    className={classes.button}
                    color='secondary'
                    variant='contained'
                  >
                    Remove Task
                  </Button>
                  {activeStep !== steps.length &&
                    (isStepComplete(steps[activeStep]._id) ? (
                      <Typography
                        variant='caption'
                        className={classes.completed}
                      >
                        Step {steps[activeStep].Description} already completed
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
      </CardBody>
      <CardFooter chart>
        <h4>{badgeName}</h4>
        <Button
          variant='contained'
          color='primary'
          // onClick={() => openBadgeDetails(badge)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
