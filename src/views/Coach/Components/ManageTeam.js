import React, { useState, useEffect } from "react";
import Table from "../../../components/Table/CoachTable";
import API from "../../../utils/API";
import TableMapper from "./TableMapper";

export default function ManageTeam() {
  const [table_data, setData] = useState({
    columns: [
      { field: "username", title: "Username", editable: "false" },
      { field: "email", title: "Email", editable: "false" },
      { field: "name", title: "Full Name", editable: "false" },
      {
        field: "roles",
        title: "Roles",
        lookup: { Admin: "Admin", Coach: "Coach", User: "User" }
      },
      { field: "createdOn", title: "Created On", editable: "false" },
      { field: "lastActivity", title: "Last Activity", editable: "false" },
      {
        field: "active",
        title: "Active",
        lookup: { true: "true", false: "false" }
      }
    ],
    data: []
  });

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/users/coach/5e7e6411844637a6a6c6b4ae");
      setData({
        columns: table_data.columns,
        data: TableMapper(res.data.payload.data.Members)
      });
      console.log(res);
    }
    fetchData();
  }, [table_data.columns]);

  return <Table title={"My Team"} table_data={table_data} />;
}
