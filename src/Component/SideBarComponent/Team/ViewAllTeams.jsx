import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import {CustomerNoOfTickets} from '../../../JsFolder/CustomerNoOfTickets';
import { MDBDataTable } from 'mdbreact';


export default class ViewAllTeams extends Component{
    state = {
        data:[
    
        ],
        loaded:false
    };

    UNSAFE_componentWillMount(){
        let url = `https://localhost:5001/api/Team/GetAllTeams`
    
        fetch(url)
                .then((response) =>  response.json())
                .then((json) => {
                    this.addDataToState(json.data);
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
    }
    addDataToState = (datarecived) => {
        _.reverse(datarecived);
        this.setState({data:datarecived, loaded:true})
    }
    handleViewClick = (TeamId) =>{
        window.localStorage.setItem("TeamId", JSON.stringify(TeamId));                                 
    }
    handleViewTTeam = (teamId) =>{
        return(
            <div onClick={() => this.handleViewClick(teamId)}>
                <Link to="/EditTeam" className="nav-link" > 
                    <button class="btn btn-primary">
                        Edit Team
                    </button>
                </Link>
            </div>
        );
        
    }
    render(){

        let data = this.state.data;
        let loaded = this.state.loaded;
        let all = data.map(data =>{
            return(
                {
                    team_Name:  data.team_Name,
                    team_Description: data.team_Description,
                    view_Team:this.handleViewTTeam(data.id),
                }
            );
        });

        const Tabledata = {
            columns: [
              {
                label:  `Team Name`,
                field: 'team_Name',
                sort: 'asc'
              },
              {
                label: 'Team Description',
                field: 'team_Description',
                sort: 'asc',
               
              },
              {
                label: 'View Team',
                field: 'view_Team',
                sort: 'asc',
              }
            ],
            rows:all
        }
       
        return (
            <Layout>
                <div class="content-w">
                   <div class="content-i">   
                        <div class="content-box">
                             <div class="element-wrapper">
                                 <MDBDataTable
                                     striped
                                     bordered
                                     hover
                                     entriesOptions={[2, 10, 15, 20]}
                                     data={Tabledata}
                                 />
                             </div>
                         </div>
                     </div>
                 </div>
            </Layout>
        );
    }
} 