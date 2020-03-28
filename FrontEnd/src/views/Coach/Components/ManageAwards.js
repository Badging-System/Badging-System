import React, { useEffect } from "react";
import API from "../../../utils/API";
import ProgressStepperMapper from "./ProgressStepperMapper";

export default function FolderList() {
  const [progress, setProgress] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/badges/5e7e6411844637a6a6c6b4af");
      setProgress(res.data.payload.data);
    }
    fetchData();
  }, []);

  return <ProgressStepperMapper progressData={progress} />;
}
