import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { css } from 'glamor';

class SidebarComponent extends React.Component {

  state={
    userData:[

    ],
    userRole:""
  }

  UNSAFE_componentWillMount (){
    let userData = JSON.parse(window.localStorage.getItem("userData"));
    this.setState({userData, userRole:userData.user_Role}); 
  }
  adminSideBar = () =>{
    return (
      <div className="menu-and-user">
        <ToastContainer />
        <div class="logged-user-w">
          <div class="avatar-w">
            <img alt="" src="img/avatar1.jpg"/>
          </div>
          <div class="logged-user-info-w">
            <div class="logged-user-name">{this.state.userData.first_Name} {this.state.userData.last_Name}</div>
            <div class="logged-user-role">Administrator</div>
          </div>
        </div>
        <ul className="main-menu">
          <li class="has-sub-menu">
            <a href="">
              <div class="icon-w">
                <div className="os-icon os-icon-ui-02"></div>
              </div>
              <span>Ticket</span>
            </a>
            <ul class="sub-menu">
              <li>
                <Link to="/CreateTicket" className="nav-link">
                  Create Ticket
                </Link>
              </li>
              <li>
                <Link to="/Tickets" className="nav-link">
                  View Tickets
                </Link>
              </li>
            </ul>
          </li>
          <li class="has-sub-menu">
            <a href="">
              <div class="icon-w">
                <div className="os-icon os-icon-ui-02"></div>
              </div>
              <span>User</span>
            </a>
            <ul class="sub-menu">
              <li>
                <Link to="/CreateUser" className="nav-link">
                  Create User
                </Link>
              </li>
              <li>
                <Link to="/ViewAllUsers" className="nav-link">
                  View Users
                </Link>
              </li>
            </ul>
          </li>
          <li class="has-sub-menu">
            <a href="">
              <div class="icon-w">
                <div className="os-icon os-icon-ui-02"></div>
              </div>
              <span>Customer</span>
            </a>
            <ul class="sub-menu">
              <li>
                <Link to="/CreateCustomer" className="nav-link">
                  Create Customer
                </Link>
              </li>
              <li>
                <Link to="/Customers" className="nav-link">
                  View Customers
                </Link>
              </li>
            </ul>
          </li>         
          <li class="has-sub-menu">
            <a href="">
              <div class="icon-w">
                <div className="os-icon os-icon-ui-02"></div>
              </div>
              <span>Teams</span>
            </a>
            <ul class="sub-menu">
              <li>
                <Link to="/CreateTeam" className="nav-link">
                  Create Team
                </Link>
              </li>
              <li>
                <Link to="/ViewAllTeams" className="nav-link">
                  View Teams
                </Link>
              </li>
              <li>
                <Link to="/AddUserToTeam" className="nav-link">
                  Add User To Team
                </Link>
              </li>
              
            </ul>
          </li>
          <li class="has-sub-menu">
            <a href="">
              <div class="icon-w">
                <div className="os-icon os-icon-ui-02"></div>
              </div>
              <span>Company</span>
            </a>
            <ul class="sub-menu">
              <li>
                <Link to="/CreateCompany" className="nav-link">
                  Create Company
                </Link>
              </li>
              <li>
                <Link to="/ViewAllCompanies" className="nav-link">
                  View Companies
                </Link>
              </li>  
            </ul>
          </li>
          <li>
            <Link to="SwalTest" className="nav-link">
              Swal Test
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  agentSideBar = () =>{
    return(
      <div className="menu-and-user">
        <div class="logged-user-w">
          <div class="avatar-w">
            <img alt="" src="img/avatar1.jpg"/>
          </div>
          <div class="logged-user-info-w">
            <div class="logged-user-name">{this.state.userData.first_Name} {this.state.userData.last_Name}</div>
            <div class="logged-user-role">Agent</div>
          </div>
        </div>
        <ul className="main-menu">
          <li class="has-sub-menu">
            <a href="">
              <div class="icon-w">
                <div className="os-icon os-icon-ui-02"></div>
              </div>
              <span>Ticket</span>
            </a>
            <ul class="sub-menu">
              <li>
                <Link to="/CreateTicket" className="nav-link">
                  Create Ticket
                </Link>
              </li>
              <li>
                <Link to="/Tickets" className="nav-link">
                  View Tickets
                </Link>
              </li>
            </ul>
          </li>
          <li class="has-sub-menu">
            <a href="">
              <div class="icon-w">
                <div className="os-icon os-icon-ui-02"></div>
              </div>
              <span>Customer</span>
            </a>
            <ul class="sub-menu">
              <li>
                <Link to="/CreateCustomer" className="nav-link">
                  Create Customer
                </Link>
              </li>
              <li>
                <Link to="/Customers" className="nav-link">
                  View Customers
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    return(
      <div>
         {this.state.userRole === 1 ? this.adminSideBar() : this.agentSideBar()}
      </div>
     
    )
  }
}
export default SidebarComponent;
