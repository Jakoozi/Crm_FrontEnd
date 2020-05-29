import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import {CustomerNoOfTickets} from '../../../JsFolder/CustomerNoOfTickets';
// import {CustomerTicketNoReturner} from '../../JsFolder/CustomerNoOfTickets';


export default class ViewAllCompanies extends Component{
    state = {
        data:[
    
        ],
        loaded:false
    };

    UNSAFE_componentWillMount(){
        let url = `https://localhost:5001/api/Company/GetAllCompaniesService`
    
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
    handleViewClick = (companyId) =>{
        console.log(companyId)
        window.localStorage.setItem("companyId", JSON.stringify(companyId));
                                      
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
                                <p>{data.company_Name}</p>
                            </td>
                            <td>
                                {data.company_Description}
                            </td>
                            <td onClick={() => this.handleViewClick(data.id)}>
                                <Link to="/EditCompany" className="nav-link" > 
                                    <button class="btn btn-primary">
                                        <p>Edit Company</p>
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
                                    <h4 class="element-header">List Of All Companies</h4>
                                
                                        <table  class="table table-striped table-lightfont dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        Company Name
                                                    </th>
                                                    <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1"             aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        Company Description
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                        Edit Company
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th rowspan="1" colspan="1">Company Name</th>
                                                    <th rowspan="1" colspan="1">Company Description</th>
                                                    <th rowspan="1" colspan="1">Edit Company</th>
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