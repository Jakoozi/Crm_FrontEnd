import React, { Component } from "react";
import Layout from '../../Layout/Layout';
import Swal from 'sweetalert2';
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';
import { responseSender } from '../../../JsFolder/responseSender';
import CompanyExtensionMethods   from '../../../JsFolder/CompanyExtensionMethods';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;

export default class CreateCompany extends Component{

    state={
        data:{   
            company_Name:"",
            company_Description:"",
        },
        createdby_Userid:"",
        display:true,
    }


    UNSAFE_componentWillMount (){
        //this gets the stored user data from the browser
        let userData = JSON.parse(window.localStorage.getItem("userData"));
        this.addUserDataToState(userData);
    }
    addUserDataToState = (userData) =>{
        //this method adds the gotten user data to state
        let createdby_Userid = userData.id;
       this.setState({createdby_Userid});
    }
    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = { ...this.state.data };
        data[name] = value;
    
        this.setState({ data });
    }
    onSubmit  =  (e) =>{
        e.preventDefault();
        this.setState({ display: false});

        let {company_Name, company_Description} = this.state.data;
        let {createdby_Userid} = this.state;

        let data1 = {
            company_Name,
            company_Description,
            createdby_Userid
        }

        if(company_Name && company_Description )
        {
            let data = JSON.stringify(data1);
            let url = `http://216.117.149.42:5002/api/Company/CreateCompany`;

            fetch(url,{
                method: 'post',
                body: data,
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
                  responseSender(json);
                  this.setState({ display: true, data:{
                    company_Name:"",
                    company_Description:"",  
                }});
             })
             .catch(error => {
                console.log(error)
                Swal.fire(
                  {
                    icon: 'error',
                    title:'Sorry',
                    text: `Something Went Wrong!`
                })
                this.setState({ display: true});
            })
        }
        else
        {
            Swal.fire(
            {
                icon: 'warning',
                title:'Please!',
                text: 'Fill In The Form Correctly'
            }
            )
            this.setState({ display: true});
        }
        
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
    createCompanyPageUi = () =>{
        let {company_Name, company_Description } = this.state.data;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Create A Company
                        </h3>
                            <div className="row">
                                <div className="col-md-2">    
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label htmlFor="subject"><h5>Company Name:</h5></label>
                                        <input
                                            onChange={this.handleInputChange}
                                            type="text"
                                            name="company_Name"
                                            className="form-control "
                                            placeholder="Enter.."
                                            value={company_Name}
                                        />    
                                    </div>
                                </div>
                                <div className="col-md-2">
                                </div>     
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label htmlFor="subject"><h5>Company's Description:</h5></label>
                                        <textarea
                                            onChange={this.handleInputChange}
                                            rows="4"
                                            type="text"
                                            name="company_Description"
                                            className="form-control "
                                            placeholder="Enter.."
                                            value={company_Description}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                </div>
                            </div> 
                            <div className="row">
                                <div className="className col-md-2"></div>
                                <div className="col-md-8">
                                    <div class="form-buttons-w">
                                        <button class="btn btn-primary" type="submit">
                                            Create Company
                                        </button>
                                    </div>
                                </div>
                                <div className="className col-md-2"></div>
                            </div>
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        )
    }

    render(){
        console.log(this.state, 'state is consoled in add data to state');
        return(
            <Layout>
                {this.state.display ? this.createCompanyPageUi() : this.spinLoader()}
            </Layout>
        )
    }

}