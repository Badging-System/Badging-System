import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList} from 'react-window';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function HorizontalNonLinearAlternativeLabelStepper(props) {

    const [tasks, setTasks] = React.useState(props.tasks);
    const classes = useStyles();

    useEffect(() => {
        setTasks(props.tasks);
    }, [props.tasks]);

    function renderRow(props) {
        const {index, style} = props;

        return (
            <ListItem button style={style} key={index}>
                <ListItemText primary={`Step ${index + 1}:   ${tasks[index][0].desc}`} />
            </ListItem>
        );
    }



    renderRow.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };





    return (


        <div className={classes.root}>
            <FixedSizeList height={400} width={500} itemSize={80} itemCount={tasks.length}>
                {renderRow}
            </FixedSizeList>
        </div>


    );
}
