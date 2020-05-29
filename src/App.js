import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Component/HomeComponent/Login';
import CreateTicket from './Component/SideBarComponent/Ticket/CreateTicket';
import Tickets from './Component/SideBarComponent/Ticket/Tickets';
import ResolveTicket from './Component/SideBarComponent/Ticket/ResolveTicket';
import CreateCustomer from "./Component/SideBarComponent/Customer/CreateCustomer";
import Customers from "./Component/SideBarComponent/Customer/Customers";
import EditCustomer from "./Component/SideBarComponent/Customer/EditCustomer";
import CreateUser from './Component/SideBarComponent/User/CreateUser';
import CreateTeam from "./Component/SideBarComponent/Team/CreateTeam";
import ViewAllUsers from "./Component/SideBarComponent/User/ViewAllUsers";
import ViewAllTeams from "./Component/SideBarComponent/Team/ViewAllTeams";
import EditUser from './Component/SideBarComponent/User/EditUser';
import AddUserToTeam from './Component/SideBarComponent/UserTeam/AddUserToTeam';
import CreateCompany from './Component/SideBarComponent/Company/CreateCompany';
import ViewAllCompanies from './Component/SideBarComponent/Company/ViewAllCompanies';
import EditCompany from "./Component/SideBarComponent/Company/EditCompany";
import EditTeam from "./Component/SideBarComponent/Team/EditTeam"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( 
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/CreateTicket" component={CreateTicket} />
            <Route exact path="/Tickets" component={Tickets} />
            <Route exact path="/ResolveTicket" component={ResolveTicket} />
            <Route exact path="/CreateCustomer" component={CreateCustomer} />
            <Route exact path="/Customers" component={Customers} />
            <Route exact path="/EditCustomer" component={EditCustomer} />
            <Route exact path="/CreateUser" component={CreateUser} />
            <Route exact path="/CreateTeam" component={CreateTeam} />
            <Route exact path="/ViewAllUsers" component={ViewAllUsers} />
            <Route exact path="/ViewAllTeams" component={ViewAllTeams} />
            <Route exact path="/EditUser" component={EditUser} />
            <Route exact path="/AddUserToTeam" component={AddUserToTeam} />
            <Route exact path="/CreateCompany" component={CreateCompany} />
            <Route exact path="/ViewAllCompanies" component={ViewAllCompanies} />
            <Route exact path="/EditCompany" component={EditCompany} />
            <Route exact path="/EditTeam" component={EditTeam} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;