import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import GroupWork from '@material-ui/icons/GroupWork';

// core components/views for public layout
import Overview from "./views/Admin/Overview";
import Users from "./views/Admin/Users";
import Teams from "./views/Admin/Teams";

const dashboardRoutes = [
  {
    path: "/overview",
    name: "Overview",
    icon: HomeIcon,
    component: Overview,
    layout: "/admin",
    displaySidebar: true
  },
  {
    path: "/users",
    name: "User Management",
    icon: PeopleIcon,
    component: Users,
    layout: "/admin",
    displaySidebar: true
  },
  {
    path: "/teams",
    name: "Team Management",
    icon: GroupWork,
    component: Teams,
    layout: "/admin",
    displaySidebar: true
  }
];

export default dashboardRoutes;
