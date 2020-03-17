import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components

// @material-ui/icons

// core components
import {cardIconStyle} from "../../assets/jss/material-dashboard-react/components/cardIconStyle";


export default function CardTitle(props) {
  const classes = cardIconStyle({});
  const { className, type, children, color, title, ...rest } = props;
  let cardIconClasses = null;
  cardIconClasses = classNames({
    [classes.cardTitle]: true,
    [classes[color + "CardHeader"]]: color,
    [className]: className !== undefined
  });

  return (
    <div className={cardIconClasses} {...rest}>
      {title}
    </div>
  );
}

CardTitle.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "admin"
  ]),
  children: PropTypes.node,
  type: PropTypes.string,
  title: PropTypes.string
};
