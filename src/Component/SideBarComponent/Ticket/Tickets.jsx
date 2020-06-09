import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import CloseTicketAPICall from "../../../JsFolder/CloseTicketAPICall";
import { MDBDataTable } from 'mdbreact';
import BaseAPI from '../../../JsFolder/BaseAPI';


export default class Tickets extends Component{

    state = {
        data:[
    
      ],
        loaded:false, 
        ticketCloser : new CloseTicketAPICall(),
        baseApi : new BaseAPI()
    };
    UNSAFE_componentWillMount(){
        let userData = JSON.parse(window.localStorage.getItem("userData")); 
        let {company_Id, user_Role} = userData;
        //console.log(company_Id, user_Role,'user role and company id are consoled')

        if(user_Role === 1){
            let url = `${this.state.baseApi.baseEndPoint()}/Ticket/GetAllTickets`;

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
            });
        }
        else if(user_Role === 2){
            let url = `${this.state.baseApi.baseEndPoint()}/Ticket/GetTicketByCompany_Id?id=${company_Id}`;

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
            });
        }

        
    
        
                
                
                
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
                status = <div class="badge badge-success"><p>New</p></div>;
                break;
            case 2:
                status = <div class="badge badge-warning"><p>Resolved</p></div>;
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
    closeTicket = (ticketId, ticket_Status) =>{
        return(
            <div  onClick={()=> this.state.ticketCloser.closeTicket(ticketId, ticket_Status)}>
                <button class="btn btn-danger"> 
                    Close Ticket
                </button>
            </div>
        );
    }
    resolveTicket = (ticketId) =>{
        return(
            <div onClick={() => this.handleViewClick(ticketId)}>
                <Link to="/ResolveTicket" className="nav-link"> 
                    <button class="btn btn-primary"> 
                        Resolve Ticket
                    </button>
                </Link>
            </div>
        );
    }

    render(){
        let data = this.state.data;
        let all = data.map(data =>{
                return(
                    {
                        ticket_Subject:data.ticket_Subject,
                        ticket_Details:data.ticket_Details,
                        company_Name : data.company_Name,
                        ticket_Status:this.ticketStatusSetter(data.ticket_Status),
                        createdAt:this.timeFormater(data.createdAt),
                        updatedAt:this.timeFormater(data.updatedAt),
                        resolve_Ticket: this.resolveTicket(data.id),
                        close_Ticket:this.closeTicket(data.id, data.ticket_Status),


                    }
                   
                );
        });
        const Tabledata = {
            columns: [
              {
                label: 'Ticket Subject',
                field: 'ticket_Subject',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Ticket Details',
                field: 'ticket_Details',
                sort: 'asc',
              
              },
              {
                label: 'Ticket Status',
                field: 'ticket_Status',
                sort: 'asc',
              },
              {
                label: 'Company Name',
                field: 'company_Name',
                sort: 'asc',
             
              },
              {
                label: 'Created Date',
                field: 'createdAt',
                sort: 'asc',
            
              },
              {
                label: 'Updated Date',
                field: 'updatedAt',
                sort: 'asc',
             
              },
              {
                label: 'Resolve Ticket',
                field: 'resolve_Ticket',
                sort: 'asc',
               
              },
              {
                label: 'Close Ticket',
                field: 'close_Ticket',
                sort: 'asc',
                width: 100
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
                                     entriesOptions={[5, 10, 15, 20]}
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