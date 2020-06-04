import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { MDBDataTable } from 'mdbreact';




export default class ViewAllUsers extends Component{
    state = {
        data:[
    
        ],
        company:[],
        loaded:false,
    };

    UNSAFE_componentWillMount(){
        let url = `http://216.117.149.42:5002/api/User/GetAllUsersService`
    
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
    handleViewClick = (toBeEditedUser_Id) =>{
        window.localStorage.setItem("toBeEditedUser_Id", JSON.stringify(toBeEditedUser_Id));                             
    }
    userRoleConverter = (user_Role) =>{
        switch (user_Role)
         {
            case 1:
                user_Role = "Admin"
                break;
            case 2:
                user_Role = "Agent"
                break;
        }
        return user_Role;
    }
    handleViewUser = (userId) =>{
        return(
            <div onClick={() => this.handleViewClick(userId)}>
                <Link to="/EditUser" className="nav-link" > 
                    <button class="btn btn-primary">
                        Edit User
                    </button>
                </Link>
            </div>
        )
    }
    render(){

        let data = this.state.data;
        let loaded = this.state.loaded;
        let all = data.map(data =>{
            return(
                {
                    first_Name:  data.first_Name,
                    last_Name: data.last_Name,
                    user_Role: this.userRoleConverter(data.user_Role),
                    email: data.email,
                    phonenumber: data.phonenumber,
                    xendCode: data.xendCode,
                    view_User:this.handleViewUser(data.id),
                }
            );
        });

        const Tabledata = {
            columns: [
              {
                label:  `First Name`,
                field: 'first_Name',
                sort: 'asc'
              },
              {
                label: 'Last Name',
                field: 'last_Name',
                sort: 'asc',
               
              },
              {
                label: 'User Role',
                field: 'user_Role',
                sort: 'asc',
              
              },
              {
                label: 'Email ',
                field: 'email',
                sort: 'asc',
              },
              {
                label: 'Phone Number',
                field: 'phonenumber',
                sort: 'asc',
            
              },
              {
                label: 'Xend Code',
                field: 'xendCode',
                sort: 'asc',
             
              },
              {
                label: 'View User',
                field: 'view_User',
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