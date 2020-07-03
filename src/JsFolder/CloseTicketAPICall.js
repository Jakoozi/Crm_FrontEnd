import React, { Component } from "react";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { responseSender } from './responseSender';
import BaseAPI from '../JsFolder/BaseAPI';

export default class CloseTicketAPICall extends Component{

  state={
    baseAPI : new BaseAPI(),
    closeTicketReturnVariable: "",
  }

  closeTicket = async ( id, ticket_Status) =>{
      
    let swalResponse = await Swal.fire({
        title:` Are you sure?`,
        text: 'You Want To Close This Ticket!',
        icon:"question",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    })
    .then( async (result)  => {
        if(result.value){
          let ifResponse;

          if(ticket_Status == 2){
            let fetchWaiter = await this.ApiCloseTicketCall(id);
            ifResponse = fetchWaiter;
          }
          else if(ticket_Status == 3){
            Swal.fire('Alert', 'Please the ticket is Already Closed', 'info', 4000);
            ifResponse = false;
          }
          else{
            Swal.fire('Alert', 'Please the ticket is not yet resolved', 'info', 5000);
            ifResponse = false;
          }
          return ifResponse;
        }
        else if (result.dismiss) {
          Swal.fire('Alert', 'The Ticket Is Still Open', 'info', 5000);
          return false;
        }
    })
   
    return swalResponse;
  }      

  ApiCloseTicketCall  = async (id) =>{
            let url = `${this.state.baseAPI.baseEndPoint()}/Ticket/CloseTicket/${id}`;
         
            let fetchwaiter = await fetch(url,{
              method: 'post',
              headers:{
                'Content-Type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json, "This is the json response");
                responseSender(json);
                return true;
            })
            .catch(error => {
                console.log(error)
                Swal.fire('Sorry!', 'Something Went Wrong', 'error', 5000);
                 return false;
            })
            //console.log(fetchwaiter, "fetch water is consoled")
            return fetchwaiter;
  }
}