import React, { useState, useEffect } from "react";
import Table from "../../../components/Table/Table";
import API from "../../../utils/API";
export default function ManageTeam(props) {
  const [table_data, setData] = React.useState({
    columns: [
      { field: "username", title: "Username", editable: "false" },
      { field: "email", title: "Email", editable: "false" },
      { field: "name", title: "Full Name", editable: "false" },
      {
        field: "roles",
        title: "Roles",
        lookup: { 0: "Admin", 1: "Coach", 2: "User" }
      },
      { field: "createdOn", title: "Created On", editable: "false" },
      { field: "lastActivity", title: "Last Activity", editable: "false" },
      { field: "active", title: "Active", lookup: { 1: "true", 0: "false" } }
    ],
    data: []
    // data: [
    //   {
    //     username: "msrober3",
    //     email: "msrober3@asu.edu",
    //     name: "Mitchell Roberts",
    //     roles: 0,
    //     createdOn: moment().format(),
    //     lastActivity: moment().format(),
    //     active: 1
    //   },
    //   {
    //     username: "gdeshpa",
    //     email: "gdeshpa@asu.edu",
    //     name: "Garuav Deshpande",
    //     roles: 1,
    //     createdOn: moment().format(),
    //     lastActivity: moment().format(),
    //     active: 1
    //   },
    //   {
    //     username: "dmaitha",
    //     email: "dmaitha@asu.edu",
    //     name: "David Maitha",
    //     roles: 2,
    //     createdOn: moment().format(),
    //     lastActivity: moment().format(),
    //     active: 1
    //   },
    //   {
    //     username: "rtonthat",
    //     email: "rtonthat@asu.edu",
    //     name: "Ryan Tonthat",
    //     roles: 2,
    //     createdOn: moment().format(),
    //     lastActivity: moment().format(),
    //     active: 0
    //   }
    // ]
  });

  useEffect(() => {
    fetchUsers();
  });
  async function fetchUsers() {
    let res = await API.get("/users/coach/5e4b5a48464661862aa61614");
    console.log(res.data.payload.data.Members);
  }
  return <Table title={"My Team"} table_data={table_data} />;
}
