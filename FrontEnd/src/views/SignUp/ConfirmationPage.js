import React from 'react';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
// import SignUp from './SignUp';
export default function ConfirmationPage(props) {
    // const loggedIn = props.loggedIn;
    // console.log(props.signedUp);
    // signedUp = props.signedUp;
    // if (!signedUp) {
    //     return (<React.Fragment />);
    // } else return (<Typography>
    //     I made it to the confirmation page
    // </Typography>);
    return (<Typography>I made it to the confirmation page</Typography>);

}


ConfirmationPage.propTypes = {
    loggedIn: PropTypes.bool.isRequired
};