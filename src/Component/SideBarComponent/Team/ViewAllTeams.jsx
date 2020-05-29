import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import {CustomerNoOfTickets} from '../../../JsFolder/CustomerNoOfTickets';
// import {CustomerTicketNoReturner} from '../../JsFolder/CustomerNoOfTickets';


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
                               type: 'error',
                               title:'please!!',
                               text: 'Check your internet connection'
                             }
                           )
                       } 
                );
    }
    addDataToState = (datarecived) => {
        console.log(datarecived)
        _.reverse(datarecived);
        this.setState({data:datarecived, loaded:true})
    }
    handleViewClick = (TeamId) =>{
        window.localStorage.setItem("TeamId", JSON.stringify(TeamId));
                                      
    }
    userRoleConverter = (user_Role) =>{
        switch (user_Role)
         {
            case 1:
                user_Role = "Admin"
                break;
            case 2:
                user_Role = "Admin"
                break;
        }
        return user_Role;
    }
    render(){

        let data = this.state.data;
        let loaded = this.state.loaded;
        let all;


        if(loaded === true){
            all = data.map((data, index) =>{
                return(
                    <tbody key={data.id}>
                        <tr role="row" className="odd">
                            <td class="sorting_1">
                                <p>{data.team_Name}</p>
                            </td>
                            <td>
                                {data.team_Description}
                            </td>
                            <td onClick={() => this.handleViewClick(data.id)}>
                                <Link to="/EditTeam" className="nav-link" > 
                                    <button class="btn btn-primary">
                                        <p>Edit Team</p>
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                )
            });
        }
        else
        {
            all = "Loading..."
        }

        return(
            <Layout>
                <div class="content-w">
                        <div class="content-i">   
                            <div class="content-box">
                                <div class="element-wrapper">
                                    <h4 class="element-header">List Of All Teams</h4>
                                
                                        <table  class="table table-striped table-lightfont dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        Team Name
                                                    </th>
                                                    <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1"             aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        Team Description
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                        Edit Team
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th rowspan="1" colspan="1">Team Name</th>
                                                    <th rowspan="1" colspan="1">Team Description</th>
                                                    <th rowspan="1" colspan="1">Edit Team</th>
                                                </tr>
                                            </tfoot>
                                            {all}
                                        </table>
                                </div>
                            </div>
                        </div>
                </div>
            </Layout>
        )
    }
} 