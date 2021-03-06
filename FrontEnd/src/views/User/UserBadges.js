import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Dialog from "./Dialog";
import { getUserBadges } from "../../helpers/users";

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
  const [openDialog, setDialog] = React.useState(false);
  const username = "bobbo";
  const [currentValue, setSelectedValue] = React.useState({
    id: null,
    badge_name: "",
    completed: 0,
    tasks: [{ id: null, desc: "" }],
  });
  const [badges, setBadges] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      let res = await getUserBadges(username);
      const handleSave = (badge) => {
        //Handles the additions of new badges

        let tempArray = [];
        badge.forEach((item) => {
          console.log(item);
          item.Badge.Tasks.forEach((task) => {
            tempArray.push([{ id: task._id, desc: task.Description }]);
          });
          badges.push({
            id: item.Badge._id,
            badge_name: item.Badge.Name,
            completed: item.Tasks_Completed.length,
            tasks: tempArray,
            badge_desc: item.Badge.Description,
          });
        });

        setBadges(badges);
      };
      console.log(res);
      handleSave(res);
      setSelectedValue(res);
    }
    fetchData();
  }, [badges, username]);

  const openBadgeDetails = (badge_info) => {
    setSelectedValue(badge_info);
    setDialog(true);
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

  return (
    <div>
      <Dialog
        selectedValue={currentValue}
        open={openDialog}
        onClose={handleDialog}
      />
      <main className={classes.main}>
        <Grid container className={classes.top} spacing={4}>
          {badges.map((badge, index) => (
            <GridItem key={index} xs={12} sm={3}>
              <Card chart>
                <CardHeader color={"admin"} stats icon>
                  <CardIcon color={"admin"}>
                    <h1 className={classes.badgeName}>{badge.badge_name}</h1>
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <p>
                    {badge.badge_desc}
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Posuere morbi leo urna molestie. */}
                  </p>
                </CardBody>
                <CardFooter chart>
                  <Button
                    className={classes.badgeBtn}
                    variant='contained'
                    color='secondary'
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
