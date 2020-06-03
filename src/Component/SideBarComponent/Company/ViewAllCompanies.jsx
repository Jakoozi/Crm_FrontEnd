import React, { Component } from "react";
import Layout from "../../Layout/Layout";
import Swal from "sweetalert2";
import  Moment from 'react-moment';
import { Link } from "react-router-dom";
import _ from 'lodash';
import {CustomerNoOfTickets} from '../../../JsFolder/CustomerNoOfTickets';
import { MDBDataTable } from 'mdbreact';


export default class ViewAllCompanies extends Component{
    state = {
        data:[
    
        ],
        loaded:false
    };

    UNSAFE_componentWillMount(){
        // let url = `http://216.117.149.42:2000/api/Company/GetAllCompaniesService`;
        let url = `https://localhost:5001/api/Company/GetAllCompaniesService`;
    
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
    handleViewClick = (companyId) =>{
        window.localStorage.setItem("companyId", JSON.stringify(companyId));                                  
    }
    handleViewCompany = (companyId) =>{
        return(
            <div onClick={() => this.handleViewClick(companyId)}>
                <Link to="/EditCompany" className="nav-link" > 
                    <button class="btn btn-primary">
                        Edit Company
                    </button>
                </Link>
            </div>
        );
    }
    render(){

        let data = this.state.data;
        let loaded = this.state.loaded;
        let all = data.map(data =>{
            return(
                {
                    company_Name:  data.company_Name,
                    company_Description: data.company_Description,
                    view_Company: this.handleViewCompany(data.id),
                }
            );
        });
        const Tabledata = {
            columns: [
              {
                label:  `Company Name`,
                field: 'company_Name',
                sort: 'asc'
              },
              {
                label: 'Company Description',
                field: 'company_Description',
                sort: 'asc',
               
              },
              {
                label: 'View Company',
                field: 'view_Company',
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