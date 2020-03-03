import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SpringModal from "./Modal";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import Dialog from "./Dialog";

const title = {
  color: "#3C4858",
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  float: "left",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: "#777",
    fontWeight: "400",
    lineHeight: "1"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper
  },
  buttonStyle: {
    marginBottom: "3em"
  },
  badgeBtn: {
    margin: "auto"
  },
  top: {
    flexGrow: 3,
    display: "flex"
    // minHeight: '30vh',
  },
  cardTitle: {
    ...title,
    marginTop: "0",
    marginBottom: "3px",
    minHeight: "auto",
    "& a": {
      ...title,
      marginTop: ".625rem",
      marginBottom: "0.75rem",
      minHeight: "auto"
    }
  },
  badgeName: {
    color: "#FFFF",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px !important",
    marginBottom: "0",
    wordWrap: "normal"
  }
}));

export default function FolderList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({
    badge_name: "",
    desc: "",
    tasks: [{ id: null, desc: "", tableData: {} }]
  });
  const [badges, setBadges] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = badge => {
    console.log(badge);

    badges.push({
      badge_name: badge.badge_name,
      desc: badge.desc,
      tasks: badge.table_data
    });
    console.log(badges);
    setBadges(badges);
    setOpen(false);
  };

  const openBadgeDetails = badge_info => {
    setSelectedValue(badge_info);
    setDialog(true);
  };

  const handleDialog = () => {
    setDialog(false);
  };

  return (
    <div>
      <Button
        className={classes.buttonStyle}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Create Badge
      </Button>
      <SpringModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
      <Dialog
        selectedValue={selectedValue}
        open={openDialog}
        onClose={handleDialog}
      />
      <main className={classes.main}>
        <Grid container className={classes.top} spacing={4}>
          {badges.map((badge, index) => (
            <GridItem key={index} xs={12} sm={4}>
              <Card chart>
                <CardHeader color={"admin"} stats icon>
                  <CardIcon color={"admin"}>
                    <h1 className={classes.badgeName}>{badge.badge_name}</h1>
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <p>{badge.desc}</p>
                </CardBody>
                <CardFooter chart>
                  <Button
                    className={classes.badgeBtn}
                    variant="contained"
                    color="secondary"
                    onClick={() => openBadgeDetails(badge)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </main>
    </div>
  );
}
