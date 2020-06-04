import React, { Component } from "react";
import Layout from '../../Layout/Layout';
import Swal from 'sweetalert2';
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';
import { responseSender } from '../../../JsFolder/responseSender';
import CompanyExtensionMethods   from '../../../JsFolder/CompanyExtensionMethods';
import UserExtensionMethod from "../../../JsFolder/UserExtensionMethod";
import TeamExtensionMethod from "../../../JsFolder/TeamExtensionMethod"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;

export default class AddUserToTeam extends Component{

    state={
        data:{   
            company_Id:"",
            team_Id:"",
            user_Id:"",
        },
        companies:[
        ],
        users:[
        ],
        teams:[
        ],
        display:true,
        companyLoaded:false,
        userLoaded:false,
        teamLoaded:false,
        companyExtensionMethods : new CompanyExtensionMethods(),
        userExtensionMethod : new UserExtensionMethod(),
        teamExtensionMethod : new TeamExtensionMethod()
    }

    UNSAFE_componentWillMount (){
       
        //this methods fetches the companies from the server
        let companyUrl = `http://216.117.149.42:5002/api/Company/GetAllCompaniesService`;
        
        fetch(companyUrl)
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

        //this methods fetches the Users from the server
        let userUrl = `http://216.117.149.42:5002/api/User/GetAllUsersService`;
        
        fetch(userUrl)
        .then(response => response.json())
        .then(json => {  
            this.addUsersToState(json.data)
            this.setState({userLoaded:true})
        }) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  type: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );

        //this method adds teams to the state
        let teamUrl = `http://216.117.149.42:5002/api/Team/GetAllTeams`;
        
        fetch(teamUrl)
        .then(response => response.json())
        .then(json => {  
            this.addTeamsToState(json.data)
            this.setState({teamLoaded:true})
        }) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  type: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );
    }
    addCompaniesToState = (companies) =>{
        this.setState({companies})
    }
    addUsersToState = (users) =>{
        this.setState({users})
    }
    addTeamsToState = (teams) =>{
        this.setState({teams})
    }
    onSubmit  =  (e) =>{
        e.preventDefault();
        this.setState({ display: false});

        let {company_Id, team_Id, user_Id} = this.state.data;

        let data1 = {
            company_Id,
            team_Id,
            user_Id,
        }

        if(company_Id && team_Id && user_Id)
        {
            let data = JSON.stringify(data1);
            let url = `http://216.117.149.42:5002/api/UserTeam/AddUserToTeam`;
            //console.log(data, 'data is logged');

            fetch(url,{
                method: 'post',
                body: data,
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                  responseSender(json);
                  this.setState({ display: true, data:{
                    company_Id:"",
                    team_Id:"",  
                    user_Id:"",
                }});
             })
             .catch(error => {
                console.log(error)
                Swal.fire(
                  {
                    icon: 'error',
                    title:'Sorry',
                    text: `Something Went Wrong!`
                })
                this.setState({ display: true});
            })
        }
        else
        {
            Swal.fire(
            {
                icon: 'warning',
                title:'Please!',
                text: 'Fill In The Form Correctly'
            }
            )
            this.setState({ display: true});
        }
        
     }
    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = { ...this.state.data };
        data[name] = value;

        this.setState({ data });
    }
    addUserToTeamPageUi = () =>{
        let {company_Id, team_Id, user_Id } = this.state.data;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Add A User To A Team
                        </h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="user"><h5> Select the User:</h5></label>
                                        <select 
                                            name="user_Id"
                                            onChange={this.handleInputChange}
                                            className="form-control "
                                            value={user_Id}
                                        >
                                        <option hidden>selecte user...</option>
                                        {this.state.userExtensionMethod.userOptionReturner(this.state.users, this.state.userLoaded)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="team"><h5> Select Team:</h5></label>
                                        <select 
                                            name="team_Id"
                                            onChange={this.handleInputChange}
                                            className="form-control "
                                            value={team_Id}
                                        >
                                        <option hidden>selecte team...</option>
                                        {this.state.teamExtensionMethod.teamOptionReturner(this.state.teams, this.state.teamLoaded)}
                                        </select>
                                    </div>
                                </div>     
                            </div>
                            <div className="row">
                                <div className="col md 6">
                                    <div className="form-group">
                                        <label htmlFor="company"><h5>Select Company:</h5></label>
                                        <select 
                                            name="company_Id"
                                            onChange={this.handleInputChange}
                                            class="form-control "
                                            value={company_Id}
                                        >
                                        <option hidden>selecte company...</option>
                                        {this.state.companyExtensionMethods.companyOptionReturner(this.state.companies, this.state.companyLoaded)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col md 6">
                                </div>
                            </div>    
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="form-buttons-w">
                                        <button class="btn btn-primary" type="submit">
                                            Add User To Team
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        )
    }

    spinLoader = () =>{
        return(
          <div className="sweet-loading" style={{  paddingTop : `30vh`, paddingLeft : `50vh` }}>
              <BeatLoader	
                  css={override}
                  sizeUnit={"px"}
                  size={100} 
                  color={"#2A68D4"}
                  loading={true}
              />
        </div>
        )
    }
    render(){
        return(
            <Layout>
                {this.state.display ? this.addUserToTeamPageUi() : this.spinLoader()}
            </Layout>
        )
    }

}