import React, { Component } from "react";
import Layout from '../../Layout/Layout';
import Swal from 'sweetalert2';
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';
import  Moment from 'react-moment';
import { responseSender } from '../../../JsFolder/responseSender';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;

export default class ViewTicket extends Component{

    state={ 
        ticket_Subject:"",
        ticket_Details:"", 
        ticket_Status:"", 
        customer_Id:"",    
        company_Id:"",
        resolvedby_Entityid:"",
        id:"",
        createdAt:"",
        staff_Response:"",
        customers:[
        ],
        display:true
    }

    UNSAFE_componentWillMount(){
        let id = JSON.parse(window.localStorage.getItem("ticketId"));
        let url = `https://localhost:5001/api/Ticket/GetTicketById/${id}`
    
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
    addDataToState = (ticket) =>{
        let resolved_User = JSON.parse(window.localStorage.getItem("userData"));
        let resolvedby_Entityid = resolved_User.id;
        // console.log(ticket)
      
        //let ticket_Status = this.ticketStatusSetter(ticket.ticket_Status)
        this.setState({
            ticket_Subject:ticket.ticket_Subject, 
            ticket_Details:ticket.ticket_Details, 
            ticket_Status:ticket.ticket_Status, 
            id:ticket.id,
            company_Id:ticket.company_Id,
            resolvedby_Entityid:resolvedby_Entityid,
            createdAt: ticket.createdAt,
        })
        // console.log(this.state)
    }
    ticketStatusSetter = (status) =>{
        switch(status){
            case 1:
                status = <div class="badge badge-success"><h6> New</h6></div>
                break;
            case 2:
                status = <div class="badge badge-warning"><h6> Resolved</h6></div>
                break;
            case 3:
                status = <div class="badge badge-danger"><h6> Closed</h6></div>
                break;
        }
        return status;
    }
    timeFormater = (date) =>{
        let formatedDate = date;
        return <Moment format="ddd Do MMM, YYYY HH:mm">{formatedDate}</Moment>
    }
    handleInputChange = e => {
        let value = e.target.value;
    
        this.setState({ staff_Response:value });
        
    }
    onSubmit = (e) =>{ 
        e.preventDefault();

        this.setState({ display: false});

        let {company_Id, resolvedby_Entityid, id, staff_Response, ticket_Subject, ticket_Details } = this.state
        let data1 = {
            id,
            company_Id,
            resolvedby_Entityid,
            staff_Response,
            ticket_Subject,
            ticket_Details
        }
        //console.log(data1, "data1 is console logged")
        if(id && company_Id && resolvedby_Entityid && staff_Response)
        {
            let data = JSON.stringify(data1);
            let url = `https://localhost:5001/api/Ticket/ResolveTicket`;

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
            })
            .catch(error => {
                console.log(error)
                Swal.fire(
                  {
                    icon: 'error',
                    title:'Sorry',
                    text: `Something Went Wrong!`
                })
            })
        }
        else
        {
            Swal.fire({
                icon: 'warning',
                title:'Please!',
                text: 'Fill In The Form Correctly'
            });               
        }
        this.setState({ display: true});
    }
    viewTicketPageUi =() =>{
        let {ticket_Subject, ticket_Details, ticket_Status, createdAt, staff_Response,customer_Id} = this.state;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "5vh", textAlign: "center", paddingBottom: "5vh" }}
                        >
                            Ticket Info
                        </h3>
                        <div className="form-group">
                            <label htmlFor="subject"><h5>Ticket Subject:</h5></label>
                            <input
                                className="form-control"
                                value={ticket_Subject}
                                disabled
                            />
                            
                        </div>
                       <div className="form-group">
                            <label htmlFor="details"><h5>Ticket Details:</h5></label>
                            <textarea
                                className="form-control "
                                value={ticket_Details}
                                disabled
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="customer"><h5> Status : </h5></label>
                                    <h6> {this.ticketStatusSetter(ticket_Status)}</h6>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="customer"><h5> Created Date : </h5></label> <br />
                                    <div class="badge badge-info"><h6>{this.timeFormater(createdAt)}</h6></div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="details"><h5>Staff Response:</h5></label>
                            <textarea
                                onChange={this.handleInputChange}
                                placeholder="please type in the ticket reply"
                                type="text"
                                name="staff_Response"
                                className="form-control"
                                value={staff_Response}
                                
                            />
                        </div>
                        <div class="form-buttons-w">
                            <button class="btn btn-primary" type="submit">
                                <i class="os-icon os-icon-mail-18"></i>
                                Send Response
                            </button>
                        </div>
                       {/* <p>
                            <button
                                type="submit"
                                className="btn btn-light  btn-success"
                            >
                                <h5>Submit Response</h5>
                            </button>
                        </p> */}
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        )
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
    render(){
        // console.log(this.state)
        return(
            <Layout>
                {this.state.display ? this.viewTicketPageUi() : this.spinLoader()}
            </Layout>            
        );
    }
}