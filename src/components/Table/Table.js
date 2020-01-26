import React from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

/**
 * Material Table example came from https://material-ui.com/components/tables/
 */


export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
        { field: 'username', title: 'Username', editable:'false'},
        { field: 'email', title: 'Email', editable:'false'},
        { field: 'name', title: 'Full Name', editable:'false'},
        { field: 'roles', title: 'Roles', lookup: { 0: 'Admin', 1: 'Coach', 2:'User' }},
        { field: 'createdOn', title: 'Created On', editable:'false'},
        { field: 'lastActivity', title: 'Last Activity', editable:'false'},
        { field: 'active', title: 'Active', lookup: { 1: 'true', 0: 'false' }}
    ],
    data: [
      { username: 'msrober3', email: 'msrober3@asu.edu', name: 'Mitchell Roberts', roles: 0, createdOn: moment().format(), lastActivity: moment().format(), active: 1},
      { username: 'gdeshpa', email: 'gdeshpa@asu.edu', name: 'Garuav Deshpande', roles: 1, createdOn: moment().format(), lastActivity: moment().format(), active: 1},
      { username: 'dmaitha', email: 'dmaitha@asu.edu', name: 'David Maitha', roles: 2, createdOn: moment().format(), lastActivity: moment().format(), active: 1},
      { username: 'rtonthat', email: 'rtonthat@asu.edu', name: 'Ryan Tonthat', roles: 2, createdOn: moment().format(), lastActivity: moment().format(), active: 0}
    ],
  });

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="User Management"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}