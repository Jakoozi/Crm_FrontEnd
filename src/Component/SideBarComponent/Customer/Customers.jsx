import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import {CustomerNoOfTickets} from '../../../JsFolder/CustomerNoOfTickets';
import { MDBDataTable } from 'mdbreact';

export default class Customers extends Component{
    state = {
        data:[
    
        ],
        loaded:false, 
        noOfTicket:""

    };

    UNSAFE_componentWillMount(){
        let url = `https://localhost:5001/api/Customer/GetAllCustomersService`
    
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
    handleViewClick = (customerId) =>{
        window.localStorage.setItem("customerId", JSON.stringify(customerId));
                                      
    }
    handleViewCutomer = (customerId) =>{
        return(
            <div onClick={() => this.handleViewClick(customerId)}>
                <Link to="/EditCustomer" className="nav-link" > 
                    <button class="btn btn-primary">
                        Edit Customer
                    </button>
                </Link>
            </div>
        )
    }
    //this method is currently not in use because i cant return the legthn property of ech srrsy returned
    render(){

        let data = this.state.data;
        let loaded = this.state.loaded;
        let all = data.map(data =>{
            return(
                {
                    first_Name:  data.first_Name,
                    last_Name: data.last_Name,
                    email: data.email,
                    phonenumber: data.phonenumber,
                    xendCode: data.xendCode,
                    view_Customer:this.handleViewCutomer(data.id),
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
                label: 'View Customer',
                field: 'view_Customer',
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