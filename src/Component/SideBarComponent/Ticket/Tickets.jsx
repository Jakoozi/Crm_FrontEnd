import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import CloseTicketAPICall from "../../../JsFolder/CloseTicketAPICall"


export default class Tickets extends Component{

    state = {
        data:[
    
      ],
        loaded:false, 
        ticketCloser : new CloseTicketAPICall()
    };
    componentDidMount(){
        let userData = JSON.parse(window.localStorage.getItem("userData")); 
        let {company_Id} = userData;

        let url = `https://localhost:5001/api/Ticket/GetTicketByCompany_Id?id=${company_Id}`
    
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
        _.reverse(datarecived);
        this.setState({data:datarecived, loaded:true})
    }
    handleViewClick = (ticketId) =>{
        window.localStorage.setItem("ticketId", JSON.stringify(ticketId));
        
                                      
    }
    ticketStatusSetter = (status) =>{
        switch(status){
            case 1:
                status = <div class="badge badge-success"><h6>New</h6></div>;
                break;
            case 2:
                status = <div class="badge badge-warning"><h6>Resolved</h6></div>;
                break;
            case 3:
                status = <div class="badge badge-danger"><h6>Closed</h6></div>;
                break;
        }
        return status;
    }
    timeFormater = (date) =>{
        let formatedDate = date;
        return <Moment format="ddd Do MMM, YYYY HH:mm">{formatedDate}</Moment>
    }
    closeTicket = (ticketId) =>{

    }
    // handleCloseTicket = (ticketId, ticket_Status) =>{
    //     if(ticket_Status == 2){
    //         this.state.ticketCloser.closeTicket(ticketId);
    //     }
    //     else if(ticket_Status == 3){
    //         Swal.fire({
    //             title:'Auto close alert!',
    //             text: 'Please the ticket is Already Closed',
    //             timer:5000
    //         })
    //     }
    //     else{
    //         Swal.fire({
    //             title:'Auto close alert!',
    //             text: 'Please the ticket is not yet resolved',
    //             timer:5000
    //         })
    //     }
    //   }
  
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
                                {data.ticket_Subject}
                            </td>
                            <td>
                                {data.ticket_Details}
                            </td>
                            <td>
                                {this.ticketStatusSetter(data.ticket_Status)}
                            </td>
                            <td>
                                {this.timeFormater(data.createdAt)}
                            </td>
                            <td>
                                {this.timeFormater(data.updatedAt)}
                            </td>
                            <td onClick={() => this.handleViewClick(data.id)}>
                                <Link to="/ResolveTicket" className="nav-link"> 
                                    <button class="btn btn-primary"> 
                                        <p>Resolve Ticket</p>
                                    </button>
                                </Link>
                            </td>
                            <td onClick={()=> this.state.ticketCloser.closeTicket(data.id, data.ticket_Status)}>
                                <button class="btn btn-danger"> 
                                    <p>Close Ticket</p>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                );
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
                                  <h4 class="element-header">ALL TICKETS</h4>
                                
                                      <table  class="table table-striped table-lightfont dataTable">
                                        <thead>
                                          <tr role="row">
                                            <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                TICKET SUBJECT
                                              </th>
                                              <th class="sorting_asc" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1"             aria-sort="ascending" aria-label="Name: activate to sort column descending"  style={{width: '280px'}}>
                                                TICKET DETAILS
                                              </th>
                                              <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending"  style={{width: '280px'}}>
                                                TICKET STATUS
                                              </th>
                                              <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending"  style={{width: '280px'}}>
                                                CREATED DATE
                                              </th>
                                              <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                UPDATED DATE
                                              </th>
                                              <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                  RESOLVE TICKET
                                              </th>
                                              <th class="sorting" tabindex="0" aria-controls="dataTable1" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width: '280px'}}>
                                                  CLOSE TICKET
                                              </th>
                                          </tr>
                                        </thead>
                                        <tfoot>
                                          <tr>
                                            <th rowspan="1" colspan="1">TICKET SUBJECT</th>
                                            <th rowspan="1" colspan="1">TICKET DETAILS</th>
                                            <th rowspan="1" colspan="1">TICKET STATUS</th>
                                            <th rowspan="1" colspan="1">CREATED DATE</th>
                                            <th rowspan="1" colspan="1">UPDATED DATE</th>
                                            <th rowspan="1" colspan="1">RESOLVE TICKET</th>
                                            <th rowspan="1" colspan="1">CLOSE TICKET</th>
                                          </tr>
                                        </tfoot>
                                        {all}
                                      </table>
                                </div>
                            </div>
                        </div>
                    </div>
            </Layout>
        );
    }
}