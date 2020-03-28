import React from "react";
import ProgressStepper from "./ProgressStepper";
import List from "@material-ui/core/List";

export default function ProgressStepperMapper(props) {
  return props.progressData.map(function(data) {
    console.log(data.Tasks_Completed.length);
    return (
      <List>
        <ProgressStepper
          user={data.User}
          _id={data.Badge._id}
          tasks={data.Badge.Tasks}
          tasks_completed={data.Tasks_Completed}
        />
      </List>
    );
  });
}
