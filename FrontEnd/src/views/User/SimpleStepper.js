import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Card from "../../components/Card/Card";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    backButton: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const activeStep = props.tasks_completed;
    const steps = props.details.tasks;

    return (
        <Card chart>
            <CardHeader color={"admin"} stats icon>
                <CardIcon color={"admin"}>
                    <h3>{props.details.badge_name}</h3>
                </CardIcon>
            </CardHeader>
            <CardBody>
                <Typography>{props.details.desc}</Typography>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} alternativeLabel orientation="horizontal">
                        {steps.map((task, index) => (
                            <Step key={index}>
                                <StepLabel>{task.desc}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            </CardBody>
            <CardFooter chart></CardFooter>
        </Card>
    );
}
