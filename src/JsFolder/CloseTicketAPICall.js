import React, { Component } from "react";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { responseSender } from './responseSender';

export default class CloseTicketAPICall extends Component{

    closeTicket = ( id, ticket_Status) =>{
      
      if(ticket_Status == 2){
        console.log(id,ticket_Status, 'id is logged in close ticket')
        let url = `https://localhost:5001/api/Ticket/CloseTicket/${id}`;
     
        fetch(url,{
          method: 'put',
          headers:{
            'Content-Type': 'application/json'
          }
      })
        .then(response => response.json())
        .then(json => {
            console.log(json, "This is the json response");
            responseSender(json);
        })
        .catch(error => {
            console.log(error)
            Swal.fire(
              {
                type: 'error',
                title:'Sorry',
                text: `Something Went Wrong!`
            })
        })
        }
        else if(ticket_Status == 3){
            Swal.fire({
                title:'Auto close alert!',
                text: 'Please the ticket is Already Closed',
                timer:5000
            })
        }
        else{
            Swal.fire({
                title:'Auto close alert!',
                text: 'Please the ticket is not yet resolved',
                timer:5000
            })
        }
      }       
}