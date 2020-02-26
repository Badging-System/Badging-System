import moment from "moment";

export default function TableMapper(props) {
  const users = props;
  return users.map(user => ({
    username: user.Username || "",
    email: user.Email || "",
    name: user.First_name + " " + user.Last_name || "",
    roles: user.Role || "",
    createdOn: moment().format(),
    lastActivity: moment().format(),
    active: user.Active || ""
  }));
}
