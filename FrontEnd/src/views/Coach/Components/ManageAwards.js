import React, { useEffect } from "react";
import API from "../../../utils/API";
import ProgressStepperMapper from "./ProgressStepperMapper";

export default function FolderList() {
  const [progress, setProgress] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/badges/manage/5e91706738ab6f0c6556abae");
      setProgress(res.data.payload.data);
    }
    fetchData();
  }, []);

  return <ProgressStepperMapper progressData={progress} />;
}
