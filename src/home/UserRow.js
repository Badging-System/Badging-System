import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import FolderIcon from "@material-ui/icons/Folder";

export default function UserRow(props) {
  console.log(props);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      {/* <ListItemText primary='test' /> */}
    </ListItem>
  );
}
