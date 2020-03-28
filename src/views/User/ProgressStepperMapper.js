// import React from "react";
// import ProgressStepper from "./ProgressStepper";
// import List from "@material-ui/core/List";

// export default function ProgressStepperMapper(props) {
//     function getCompletedTasks(completedTasks) {
//         return completedTasks;
//     }

//     function badgeName(badgeName) {
//         return badgeName;
//     }

//     function badgeId(id) {
//         return id;
//     }

//     function badgeTasks(totalTasks) {
//         return totalTasks;
//     }
//     if (props.progressData.length !== 0) {
//         var data = props.progressData;
//         var completed = data.Tasks_Completed.length || 0;
//         var tasks = data.Badge.Tasks || [{id: null, desc: ""}];
//         var name = data.Badge.Name || "";
//         var id = data.Badge._id;
//         // console.log(`this is the badge id: ${id}`);
//     }
//     return (
//         <List>


//             <ProgressStepper
//                 badgeID={badgeId(id)}
//                 badgeName={badgeName(name)}
//                 // progress={data.Badge}
//                 tasks={badgeTasks(tasks)}
//                 tasks_completed={getCompletedTasks(completed)}
//             />
//         </List>
//     );

// }
