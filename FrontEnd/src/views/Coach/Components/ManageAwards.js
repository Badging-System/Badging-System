import React, {useEffect} from "react";
import API from "../../../utils/API";
import ProgressStepperMapper from "./ProgressStepperMapper";

export default function FolderList() {
  const [progress, setProgress] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/badges/5e94d12c31335d0018db6749");
      setProgress(res.data.payload.data);
    }
    fetchData();
  }, []);

  return <ProgressStepperMapper progressData={progress} />;
}
