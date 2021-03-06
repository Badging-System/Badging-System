import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
    margin: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    maxHeight: 440,
  },
  save: {
    float: "right",
    margin: ".5em",
  },
  cancel: {
    float: "right",
    margin: ".5em",
    "background-color": "red",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: open ? 1 : 0,
    },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function BadgeForm(props) {
  const { handleSave } = props;
  const classes = useStyles();
  const [inputValues, setInputValues] = useState({
    badge_name: "",
    Description: "",
    table_data: [],
  });

  const [data, setData] = React.useState({
    columns: [
      { field: "task_number", title: "Task Number", type: "numeric" },
      { field: "Description", title: "Description" },
    ],
    data: [],
  });

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const getData = () => {
    handleSave(inputValues);
    setInputValues({
      badge_name: "",
      Description: "",
      table_data: [],
    });
  };
  /**
   * Get the values from the text field wand store the value in the binded variable
   * @param {*} event
   */
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <Paper>
      <div className={classes.paper}>
        <Typography variant='h6' gutterBottom>
          Create Badge
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id='badge_name'
              name='badge_name'
              label='Badge Name'
              fullWidth
              defaultValue={inputValues.badge_name}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id='standard-multiline-static'
              label='Description'
              name='Description'
              multiline
              fullWidth={true}
              rows='2'
              defaultValue={inputValues.Description}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.root}>
              <MaterialTable
                options={{
                  sorting: false,
                  search: false,
                  actionsColumnIndex: -1,
                  draggable: false,
                  detailPanelColumnAlignment: "left",
                  headerStyle: {
                    width: "50%",
                    backgroundColor: "#ddd",
                    height: 10,
                    textAlign: "center",
                  },
                  cellStyle: { textAlign: "center" },
                  rowStyle: { textAlign: "center" },
                }}
                icons={tableIcons}
                title={"Add Tasks"}
                columns={data.columns}
                data={data.data}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setData((prevState) => {
                          const data = [...prevState.data];
                          data.push(newData);
                          setInputValues({
                            ...inputValues,
                            table_data: data,
                          });
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (oldData) {
                          setData((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            setInputValues({
                              ...inputValues,
                              table_data: data,
                            });
                            return { ...prevState, data };
                          });
                        }
                      }, 600);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setData((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          setInputValues({
                            ...inputValues,
                            table_data: data,
                          });
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              className={classes.save}
              variant='contained'
              color='primary'
              onClick={getData}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
