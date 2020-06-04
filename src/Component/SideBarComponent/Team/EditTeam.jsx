import React, { Component } from "react";
import Layout from '../../Layout/Layout';
import Swal from 'sweetalert2';
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';
import  Moment from 'react-moment';
import { responseSender } from '../../../JsFolder/responseSender';
import CompanyExtensionMethods   from '../../../JsFolder/CompanyExtensionMethods';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;
export default class EditTeam extends Component{

    state={
        data:{   
            team_Name:"",
            team_Description:"",
            company_Id:"",
        },
        companies:[
        ],
        createdby_Userid:"",
        id:"",
        companyLoaded:false,
        display:true,
        companyExtensionMethods : new CompanyExtensionMethods()
    }

    UNSAFE_componentWillMount (){
        let userData = JSON.parse(window.localStorage.getItem("userData"));
        this.addUserDataToState(userData);

        let id = JSON.parse(window.localStorage.getItem("TeamId"));
        let url = `http://216.117.149.42:5002/api/Team/GetTeamById/${id}`
    
        fetch(url)
                .then((response) =>  response.json())
                .then((json) => {
                    this.addTeamToState(json.data);
                } ) 
                .catch(error => { 
                           console.log(error)
                           Swal.fire(
                             {
                               icon: 'error',
                               title:'please!!',
                               text: 'Check your internet connection'
                             }
                           )
                       } 
                );

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
                  type: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );
    }
    addCompaniesToState = (companies) =>{
        this.setState({companies});
    }
    addTeamToState = (team) =>{
        //this method adds the gotten teams data to state
       this.setState({
           data:{
                team_Name:team.team_Name,
                team_Description:team.team_Description,
                company_Id:team.company_Id
           },
           id:team.id
       });
    }
    addUserDataToState = (userData) =>{
        //this method adds the gotten user data to state
        let createdby_Userid = userData.id;
       this.setState({createdby_Userid});
    }
    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = { ...this.state.data };
        data[name] = value;
    
        this.setState({ data });
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
     onSubmit  =  (e) =>{
        e.preventDefault();
        this.setState({ display: false});

        let {team_Name, team_Description, company_Id} = this.state.data;
        let {createdby_Userid, id} = this.state;

        let data1 = {
            team_Name,
            team_Description,
            company_Id,
            createdby_Userid,
            id
        }

        if(team_Name && team_Description && company_Id)
        {
            let data = JSON.stringify(data1);
            let url = `http://216.117.149.42:5002/api/Team/UpdateTeam`;
            console.log(data, 'data is logged');

            fetch(url,{
                method: 'put',
                body: data,
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                  responseSender(json);
                  this.setState({ display: true, data:{
                    team_Name:"",
                    Team_Description:"",  
                    company_Id:"",
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
     EditTeamPageUi = () =>{
        let {team_Name, team_Description, company_Id } = this.state.data;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Eidit Team
                        </h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="subject"><h5>Team Name:</h5></label>
                                        <input
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="team_Name"
                                            className="form-control "
                                            placeholder="Enter.."
                                            value={team_Name}
                                        />    
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="company"><h5> Company:</h5></label>
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
                            </div>
                            <div className="row">
                                <div className="col md 12">
                                    <div className="form-group">
                                        <label htmlFor="subject"><h5>Team's Description:</h5></label>
                                        <textarea
                                            onChange={this.handleInputChange}
                                            rows="4"
                                            type="text"
                                            name="team_Description"
                                            className="form-control "
                                            placeholder="Enter.."
                                            value={team_Description}
                                        />
                                    </div>
                                </div>
                            </div>    
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="form-buttons-w">
                                        <button class="btn btn-primary" type="submit">
                                            Edit Team
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
    render(){
        return(
            <Layout>
                {this.state.display ? this.EditTeamPageUi() : this.spinLoader()}
            </Layout>
        )
    }

}