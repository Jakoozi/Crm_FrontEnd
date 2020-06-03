import React, { Component } from "react";
import Layout from '../Layout/Layout'
import Swal from 'sweetalert2';
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;

export default class SwalTest extends Component{

    handleClick = () => {
        Swal.fire({
            title:` Are you sure?`,
            text: 'You Want To Accept This Task!',
            showCancelButton: true,
            confirmButtonText: 'Yes, Accept!',
            cancelButtonText: 'No, keep it!'
        })
        .then((result) => {
            if(result.value){
                console.log('accepted')
            }
            else if (result.dismiss) {
                console.log("dissmissed swall")
                Swal.fire({
                    title:'Alert!',
                    text: 'Please the ticket is Already Closed',
                    icon:'info',
                    timer:4000
                })
            }
        })

    }
    render(){
        return(
            <Layout>
                <div class="content-w">
                   <div class="content-i">   
                        <div class="content-box">
                             <div class="element-wrapper">
                                <button 
                                    onClick={this.handleClick}
                                >
                                    click Me Please
                                </button>
                             </div>
                         </div>
                     </div>
                 </div>
                
            </Layout>
        );
    }
}