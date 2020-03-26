import React from "react";
import ProgressStepper from "./ProgressStepper";
import List from "@material-ui/core/List";

export default function ProgressStepperMapper(props) {
    console.log(props.progressData);
    function getCompletedTasks(completedTasks) {
        return completedTasks;
    }

    function badgeName(badgeName) {
        return badgeName;
    }

    function badgeId(id) {
        return id;
    }
    if (props.progressData.length !== 0) {
        var data = props.progressData;
        var completed = data.Tasks_Completed.length || 0;
        var name = data.Badge.Name || "";
        var id = data.Badge._id;
        // console.log(`this is the badge id: ${id}`);
    }
    return (

        <ProgressStepper
            badgeID={badgeId(id)}
            badgeName={badgeName(name)}
            // progress={data.Badge}
            // tasks={data.Badge.Tasks}
            tasks_completed={getCompletedTasks(completed)}
        />

    );

}
