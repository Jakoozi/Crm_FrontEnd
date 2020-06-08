import React, { Component } from "react";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { responseSender } from './responseSender';
import BaseAPI from '../JsFolder/BaseAPI';

export default class CloseTicketAPICall extends Component{

  state={
    baseAPI : new BaseAPI()
  }

  closeTicket = ( id, ticket_Status) =>{
      
    Swal.fire({
        title:` Are you sure?`,
        text: 'You Want To Close This Ticket!',
        icon:"question",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    })
    .then((result) => {
        if(result.value){
          if(ticket_Status == 2){
            console.log(id,ticket_Status, 'id is logged in close ticket')
            let url = `${this.state.baseAPI.baseEndPoint()}/Ticket/CloseTicket/${id}`;
         
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
                Swal.fire({
                  title:'Sorry!',
                  text: 'Something Went Wrong!',
                  icon:'error',
                  timer:4000
                })
            })
          }
          else if(ticket_Status == 3){
              Swal.fire({
                    title:'Alert!',
                    text: 'Please the ticket is Already Closed',
                    icon:'info',
                    timer:4000
                })
            }
          else{
                Swal.fire({
                    title:'Alert!',
                    text: 'Please the ticket is not yet resolved',
                    icon:'info',
                    timer:5000
                })
          }
        }
        else if (result.dismiss) {
            Swal.fire(
                'Alert',
                'The Ticket Is Still Open',
                'info'
              )
        }
    })
      

      }       
}