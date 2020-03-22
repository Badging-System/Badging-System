import React from "react";
import ProgressStepper from "./ProgressStepper";
import List from "@material-ui/core/List";

export default function ProgressStepperMapper(props) {
  return props.progressData.map(function(data) {
    let completed = data.Tasks_Completed.length || 0;
    return (
      <List>
        <ProgressStepper
          user={data.User}
          progress={data.Badge}
          tasks={data.Badge.Tasks}
          tasks_completed={completed}
        />
      </List>
    );
  });
}
