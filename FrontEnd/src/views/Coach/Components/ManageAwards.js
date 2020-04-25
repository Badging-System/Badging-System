import React, {useEffect} from "react";
import API from "../../../utils/API";
import ProgressStepperMapper from "./ProgressStepperMapper";

export default function FolderList() {
  const [progress, setProgress] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/badges/5ea0a6c140c4550019ab6104");
      setProgress(res.data.payload.data);
    }
    fetchData();
  }, []);

  return <ProgressStepperMapper progressData={progress} />;
}
