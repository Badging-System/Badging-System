import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import ProgressBar from 'react-bootstrap/ProgressBar';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

export default function ProgressMobileStepper() {
    const classes = useStyles();
    const badgePercentage = 10;

    return (
        <ProgressBar now={badgePercentage} label={`${badgePercentage}%`} />
    );
}