import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import {CustomerNoOfTickets} from '../../../JsFolder/CustomerNoOfTickets';
// import {CustomerTicketNoReturner} from '../../JsFolder/CustomerNoOfTickets';


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
        console.log(customerId)
        window.localStorage.setItem("customerId", JSON.stringify(customerId));
                                      
    }
    //this method is currently not in use because i cant return the legthn property of ech srrsy returned
   noOfTicketsReciever = (id) =>{
        let url = `https://localhost:5001/api/Ticket/GetTicketByCustomer_Id?id=${id}`;

        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json.data.length)
            return json.data.length
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
                            {/* <td>
                                {this.noOfTicketsReciever(data.id)}
                            </td> */}
                            <td>
                                {data.email}
                            </td>
                            <td>
                                {data.phonenumber}
                            </td>
                            <td>
                                {data.xendCode}
                            </td>
                            <td onClick={() => this.handleViewClick(data.id)}>
                                <Link to="/EditCustomer" className="nav-link" > 
                                    <button class="btn btn-primary">
                                        <p>Edit Customer</p>
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
                                    <h4 class="element-header">Lis Of All Customers</h4>
                                
                                        <table  class="table table-striped table-lightfont dataTable">
                                            <thead>
                                                <tr role="row">
                                                    <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        Customer's Name
                                                    </th>
                                                    {/* <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1"             aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                        No of Tickets
                                                    </th> */}
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending"  style={{width: '280px'}}>
                                                        Email
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                        Phone Number
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                        XendCode
                                                    </th>
                                                    <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                        Edit CUstomer
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th rowspan="1" colspan="1">Customer's Name</th>
                                                    {/* <th rowspan="1" colspan="1">No of Tickets</th> */}
                                                    <th rowspan="1" colspan="1">Email</th>
                                                    <th rowspan="1" colspan="1">Phone Number</th>
                                                    <th rowspan="1" colspan="1">XendCode</th>
                                                    <th rowspan="1" colspan="1">Edit Customer</th>
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