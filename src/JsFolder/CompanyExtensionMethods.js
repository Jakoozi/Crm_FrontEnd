import React, { Component } from "react";
import Swal from "sweetalert2";


export default class CompanyExtensionMethods extends Component{

    state = {
        company:{}
    }

    companyOptionReturner = (companies, companyLoaded) =>{

        let all;
        if(companyLoaded == true){
            all = companies.map((company) =>{
                return(
                    <option value={company.id}>{company.company_Name}</option>
                );
            });
        }
        else{
            all = <option hidden>please reload the page....</option>
        }
        return all;
    }
    getCompany = (id) =>{


        let url = `https://localhost:5001/api/Company/GetCompanyById/${id}`
    
        fetch(url)
                .then((response) =>  response.json())
                .then((json) => {
                    this.state({company:json.data});
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
        return this.state.company.company_Name
    }
}
