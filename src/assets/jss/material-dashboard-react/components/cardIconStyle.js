import {
  adminCardHeader,
  grayColor
} from "../../material-dashboard-react";

import { makeStyles } from "@material-ui/core/styles";

export const cardIconStyle = makeStyles({
  cardIcon: {
    "&$adminCardHeader": {
      borderRadius: "3px",
      backgroundColor: grayColor[0],
      padding: "5px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left"
    }
  },
  cardIconList: {
    "&$adminCardHeader": {
      borderRadius: "3px",
      backgroundColor: grayColor[0],
      padding: "5px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left"
    }
  },
  cardTitle: {
    "&$adminCardHeader": {
      borderRadius: "3px",
      backgroundColor: grayColor[0],
      padding: "10px 15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "right",
      fontSize: '18px'
    }
  },
  adminCardHeader,
});

