import React, { useEffect } from "react";
import API from "../../../utils/API";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import Dialog from "./DetailsDialog";
import AssignDialog from "./AssignDialog";
import BadgeForm from "./BadgeForm";

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
    lineHeight: "1",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  buttonStyle: {
    marginBottom: "3em",
  },
  badgeBtn: {
    margin: "auto",
  },
  top: {
    flexGrow: 3,
    display: "flex",
    marginTop: "100px",
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
      minHeight: "auto",
    },
  },
  badgeName: {
    color: "#FFFF",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px !important",
    marginBottom: "0",
    wordWrap: "normal",
  },
}));

export default function FolderList() {
  const classes = useStyles();
  const [refresh, setRefresh] = React.useState(0);
  const [openDetailsDialog, setDialog] = React.useState(false);
  const [openAssignDialog, setAssignDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});
  const [badges, setBadges] = React.useState([]);

  const handleSave = async (badge) => {
    //Handles the additions of new badges
    let newBadge = {
      Name: badge.badge_name,
      Description: badge.Description,
      Tasks: badge.table_data,
      Recipients: [],
      Team: "5e924aea0732230011c755e2",
    };
    let res = await API.post("/badges/insert", newBadge);
    let newBadges = badges;
    newBadges.push(res.data.payload.data[0]);
    setBadges(newBadges);
    setRefresh(refresh + 1);
  };

  const openSelectedDialog = (dialog, badge_info) => {
    setSelectedValue(badge_info);
    dialog ? setDialog(true) : setAssignDialog(true);
  };

  const handleDialog = (item, event) => {
    if (event) {
      //Loop through and remove the badge
      for (let index = 0; index < badges.length; index++) {
        if (item.id === badges[index].id) {
          let updated_badges = badges;
          updated_badges.splice(index, 1);
          setBadges(updated_badges);
        }
      }
    }
    setDialog(false);
  };

  const handleAssignDialog = () => {
    setAssignDialog(false);
  };

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/badges/5e924aea0732230011c755e2");
      setBadges(res.data.payload.data);
    }
    fetchData();
  }, [refresh]);

  return (
    <div>
      <Dialog
        selectedValue={selectedValue}
        open={openDetailsDialog}
        onClose={handleDialog}
      />
      <AssignDialog
        open={openAssignDialog}
        onClose={handleAssignDialog}
        selectedBadge={selectedValue}
      />
      <main className={classes.main}>
        <BadgeForm handleSave={handleSave} />
        <Grid container className={classes.top} spacing={4}>
          {badges.map((badge, index) => (
            <GridItem key={index} xs={12} sm={3}>
              <Card chart>
                <CardHeader color={"admin"} stats icon>
                  <CardIcon color={"admin"}>
                    <h1 className={classes.badgeName}>{badge.Name}</h1>
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <p>{badge.Description}</p>
                </CardBody>
                <CardFooter chart>
                  <Button
                    className={classes.badgeBtn}
                    variant='contained'
                    color='secondary'
                    onClick={() => openSelectedDialog(true, badge)}
                  >
                    View Details
                  </Button>
                  <Button
                    className={classes.badgeBtn}
                    variant='contained'
                    color='secondary'
                    onClick={() => openSelectedDialog(false, badge)}
                  >
                    Assign Badge
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
