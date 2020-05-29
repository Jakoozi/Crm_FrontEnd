import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';



export default class ViewAllUsers extends Component{
    state = {
        data:[
    
        ],
        company:[],
        loaded:false,
    };

    UNSAFE_componentWillMount(){
        let url = `https://localhost:5001/api/User/GetAllUsersService`
    
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
    handleViewClick = (toBeEditedUser_Id) =>{
        console.log(toBeEditedUser_Id)
        window.localStorage.setItem("toBeEditedUser_Id", JSON.stringify(toBeEditedUser_Id));
                                      
    }
    getCompany = (id) =>{

        let url = `https://localhost:5001/api/Company/GetCompanyById/${id}`
    
        fetch(url)
                .then((response) =>  response.json())
                .then((json) => {
                    this.setState({company:json.data});
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
        console.log(this.state.company, 'company extension state is consoled')    
        return this.state.company.company_Name
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
                                <p>{data.first_Name} {data.last_Name}</p>
                            </td>
                            <td>
                                {this.userRoleConverter(data.user_Role)}
                            </td>
                            <td>
                                {data.email}
                            </td>
                            <td>
                                {data.phonenumber}
                            </td>
                            <td>
                                {data.xendCode}
                            </td>
                            <td>
                                {this.getCompany(data.company_Id)}
                            </td>
                            <td onClick={() => this.handleViewClick(data.id)}>
                                <Link to="/EditUser" className="nav-link" > 
                                    <button class="btn btn-primary">
                                        <p>Edit User</p>
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
                                    <h4 class="element-header">Lis Of All Users</h4>
                                
                                        <table  class="table table-striped table-lightfont dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        User's Name
                                                    </th>
                                                    <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1"             aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        User Role
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending"  style={{width: '280px'}}>
                                                        Email
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                        Phone Number
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                        XendCode
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                        Company
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                        Edit User
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th rowspan="1" colspan="1">User's Name</th>
                                                    <th rowspan="1" colspan="1">User Role</th>
                                                    <th rowspan="1" colspan="1">Email</th>
                                                    <th rowspan="1" colspan="1">Phone Number</th>
                                                    <th rowspan="1" colspan="1">XendCode</th>
                                                    <th rowspan="1" colspan="1">Company</th>
                                                    <th rowspan="1" colspan="1">Edit User</th>
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