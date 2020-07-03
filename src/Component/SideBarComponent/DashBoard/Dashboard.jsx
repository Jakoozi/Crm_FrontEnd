import React, { Component } from "react";
import Layout from '../../Layout/Layout';
import { Link } from "react-router-dom";
import CompanyExtensionMethods   from '../../../JsFolder/CompanyExtensionMethods';
import BaseAPI from '../../../JsFolder/BaseAPI';
import Swal from 'sweetalert2';

export default class Dashboard extends Component {

    state={
        userRole:"",
        company_Id:"",
        company_Name:"",
        companyExtensionMethods : new CompanyExtensionMethods(),
        companies:[
        ],
        companyLoaded:false,
        baseApi : new BaseAPI(),
        data:{
            numberOf_Admins: 0,
            numberOf_Agents:0,
            numberOf_ClosedTickets: 0,
            numberOf_NewTickets: 0,
            numberOf_ResolvedTickets: 0,
            numberOf_Tickets: 0,
            numberOf_Customers: 0,
            numberOf_Teams: 0,
            totalNumberOfCompanies: 0,
            totalNumberOfCustomers: 0,
            totalNumberOfTeams: 0,
            totalNumberOfTickets: 0,
            totalNumberOfUsers: 0
        }
        
    }

    UNSAFE_componentWillMount(){
        //this gets the stored user data from the browser
        let userData = JSON.parse(window.localStorage.getItem("userData"));
        this.addUserDataToState(userData);

        //this methods fetches the customers from the server
        let url = `${this.state.baseApi.baseEndPoint()}/Company/GetAllCompaniesService`;
        this.getAllCompaniesAPICall(url)

        
    }
    getAllCompaniesAPICall = (url) =>{
        fetch(url)
        .then(response => response.json())
        .then(json => {  
            this.addCompaniesToState(json.data)
            this.setState({companyLoaded:true})
        }) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  icon: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );
    }
    addCompaniesToState = (companies) =>{
        this.setState({companies})
    }
    addUserDataToState = (userData) =>{
       
        if(userData.user_Role === 1){
            this.setState({ userRole:userData.user_Role});
            this.getAdminStartuppDashboardValues(userData.company_Id)
        }
        else if (userData.user_Role === 2){
            this.getDashboardValues(userData.company_Id)
            this.setState({ userRole:userData.user_Role, company_Name:userData.company_Name});  
        }
    }
    handleInputChange = (e) =>{
        let company_Id = e.target.value
        
        //this state should call a method that talks to the backend to get the whole values.
        this.getDashboardValues(company_Id)
    }
    //this method helps set only required dashboard values on component mount
    getAdminStartuppDashboardValues = (company_Id)=>{
        let url = `${this.state.baseApi.baseEndPoint()}/Dashboard/GetDashboardValuesbyCompanyId?id=${company_Id}`;


        fetch(url)
        .then(response => response.json())
        .then(json => {  
           let data = json.data;
           this.setState({data:{
               totalNumberOfCompanies : data.totalNumberOfCompanies,  totalNumberOfCustomers : data.totalNumberOfCustomers,
               totalNumberOfTeams : data.totalNumberOfTeams,  totalNumberOfTickets : data.totalNumberOfTickets,
               totalNumberOfUsers : data.totalNumberOfUsers,  numberOf_Admins : data.numberOf_Admins
               
             }})
        //    console.log(data, "agent dashboard data is consoled")
        }) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  icon: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );
    }
    getDashboardValues = (company_Id) =>{
        //this methods fetches the customers from the server
        let url = `${this.state.baseApi.baseEndPoint()}/Dashboard/GetDashboardValuesbyCompanyId?id=${company_Id}`;


        fetch(url)
        .then(response => response.json())
        .then(json => {  
           let data = json.data;
           this.setState({company_Id, data})
        //    console.log(data, "agent dashboard data is consoled")
        }) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  icon: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );
        
    }
    adminDashboardUi = () =>{
        let {company_Id} = this.state;
        let {
            numberOf_NewTickets, numberOf_ResolvedTickets, numberOf_ClosedTickets, numberOf_Tickets, 
            numberOf_Admins, numberOf_Agents, numberOf_Customers, numberOf_Teams,
            totalNumberOfTickets,  totalNumberOfUsers, totalNumberOfCompanies, totalNumberOfCustomers, totalNumberOfTeams
        } = this.state.data;

        //console.log(numberOf_NewTickets, numberOf_ResolvedTickets, numberOf_ClosedTickets, totalNumberOfTickets,  'number of new ticket is consoled', this.state.data)
    
        return(
            <div className="content-i">
                <div className="content-box">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="element-wrapper" style={{paddingBottom: "10px"}}>
                                <div className="element-actions">
                                        <form class="form-inline justify-content-sm-end" >
                                            <select 
                                                class="form-control form-control-sm rounded" 
                                                style={{lineHeight:"2.5vh"}} 
                                                name="company_Id"
                                                onChange={this.handleInputChange}
                                                value={company_Id}
                                            >
                                                <option hidden >select a company...</option>
                                                {this.state.companyExtensionMethods.companyOptionReturner(this.state.companies, this.state.companyLoaded)}
                                            </select>
                                        </form>
                                </div>
                                <h6 className="element-header">
                                    <span style={{fontWeight: "500"}}>Per Company Analysis</span>
                                </h6> 
                                <div className="element-content">
                                    {/* first per company row */}
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo">
                                                <div className="label">New Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_NewTickets}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo">
                                                <div className="label">Resolved Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_ResolvedTickets}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo" >
                                                <div className="label">CLosed Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_ClosedTickets}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* second per company row */}
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo">
                                                <div className="label">No Of Teams</div>
                                                <div className="value" style={{fontSize: "18px"}}>{numberOf_Teams}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo">
                                                <div className="label">No Of Agents</div>
                                                <div className="value" style={{fontSize:"18px"}}>{numberOf_Agents}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo">
                                                <div className="label">Customers No</div>
                                                <div className="value" style={{fontSize: "18px"}}>{numberOf_Customers}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo" >
                                                <div className="label">No of Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_Tickets}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="element-wrapper">
                                <h6 className="element-header">
                                            <span style={{fontWeight: "500"}}>General CRM Analysis</span>
                                </h6>
                                <div className="element-content">
                                    {/* first general row */}
                                    <div className="row">
                                       <div className="col-md-4">
                                           <div className="element-box el-tablo">
                                                <div className="label">Total No Of Tickets</div>
                                                <div className="value" style={{fontSize: "18px"}}>{totalNumberOfTickets}</div>
                                           </div>
                                       </div>
                                        
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo">
                                                <div className="label">Total No Of Admins</div>
                                                <div className="value" style={{fontSize:"18px"}}>{numberOf_Admins}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo">
                                                <div className="label">Total No of Users</div>
                                                <div className="value" style={{fontSize:"18px"}}>{totalNumberOfUsers}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* second General Row */}
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo">
                                                <div className="label">Total No Of Companies</div>
                                                <div className="value" style={{fontSize: "18px"}}>{totalNumberOfCompanies}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo">
                                                <div className="label">Total No Of Customers</div>
                                                <div className="value" style={{fontSize: "18px"}}>{totalNumberOfCustomers}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="element-box el-tablo">
                                                <div className="label">Total No Of Teams</div>
                                                <div className="value" style={{fontSize: "18px"}}>{totalNumberOfTeams}</div>
                                            </div>
                                        </div>
                                    </div>
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-panel">
                    <div class="element-wrapper">
                        <h6 class="element-header" style={{fontWeight:"500"}}>Quick Links</h6>
                        <div class="element-box-tp">
                            <div class="el-buttons-list full-width">
                                <Link to="/CreateTicket" className="btn btn-white btn-sm">
                                    <i class="os-icon os-icon-link-3"></i><span>Create New Ticket</span>
                                </Link>
                                <Link to="CreateCustomer" class="btn btn-white btn-sm">
                                    <i class="os-icon os-icon-link-3"></i><span>Create New Customer</span>
                                </Link>
                                <Link to="/CreateUser" class="btn btn-white btn-sm" >
                                    <i class="os-icon os-icon-link-3"></i><span>Create New User</span>
                                </Link>
                                <Link to="/CreateTeam" class="btn btn-white btn-sm" >
                                    <i class="os-icon os-icon-link-3"></i><span>Create New Team</span>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>


            
        )
    }
    agentDashboardUi = () =>{

        let {company_Id, company_Name} = this.state;
        let {
            numberOf_NewTickets, numberOf_ResolvedTickets, numberOf_ClosedTickets, numberOf_Tickets
        } = this.state.data;
        
        return(
            <div className="content-i">
                <div className="content-box">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="element-wrapper" style={{paddingBottom: "10px"}}>
                                <h6 className="element-header">
                                    <span style={{fontWeight: "500"}}>{company_Name} Ticket Analysis</span>
                                </h6> 
                                <div className="element-content">
                                    {/* first per company row */}
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo">
                                                <div className="label">New Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_NewTickets}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo">
                                                <div className="label">Resolved Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_ResolvedTickets}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo" >
                                                <div className="label">CLosed Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_ClosedTickets}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="element-box el-tablo" >
                                                <div className="label">Total Tickets</div>
                                                <div className="value" style={{fontSize:"16px"}}>{numberOf_Tickets}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-panel">
                    <div class="element-wrapper">
                        <h6 class="element-header" style={{fontWeight:"500"}}>Quick Links</h6>
                        <div class="element-box-tp">
                            <div class="el-buttons-list full-width">
                                <Link to="/CreateTicket" className="btn btn-white btn-sm">
                                    <i class="os-icon os-icon-link-3"></i><span>Create New Ticket</span>
                                </Link>
                                <Link to="CreateCustomer" class="btn btn-white btn-sm">
                                    <i class="os-icon os-icon-link-3"></i><span>Create New Customer</span>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        //console.log(this.state, 'state is consoled')
        return(
            <Layout>
                {this.state.userRole == 1 ? this.adminDashboardUi() : this.agentDashboardUi()}
            </Layout>
        )
    }
    
}

                        