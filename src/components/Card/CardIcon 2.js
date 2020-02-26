import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components

// @material-ui/icons

// core components
import {cardIconStyle} from "../../assets/jss/material-dashboard-react/components/cardIconStyle";


export default function CardIcon(props) {
  const classes = cardIconStyle({});
  const { className, type, children, color, ...rest } = props;
  let cardIconClasses = null;
  if(type === 'list') {
    cardIconClasses = classNames({
      [classes.cardIconList]: true,
      [classes[color + "CardHeader"]]: color,
      [className]: className !== undefined
    });
  } else {
    cardIconClasses = classNames({
      [classes.cardIcon]: true,
      [classes[color + "CardHeader"]]: color,
      [className]: className !== undefined
    });
  }

  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "admin"
  ]),
  children: PropTypes.node,
  type: PropTypes.string
};
