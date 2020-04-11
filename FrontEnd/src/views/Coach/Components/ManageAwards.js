import React, { useEffect } from "react";
import API from "../../../utils/API";
import ProgressStepperMapper from "./ProgressStepperMapper";

export default function FolderList() {
  const [progress, setProgress] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/badges/manage/5e82afe9bef80bbc899c7f55");
      setProgress(res.data.payload.data);
    }
    fetchData();
  }, []);

  return <ProgressStepperMapper progressData={progress} />;
}
