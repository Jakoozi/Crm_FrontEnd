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
export default class EditCustomer extends Component{

    state={ 
        data:{
            first_Name:"",
            last_Name:"", 
            email:"",    
            phonenumber:"",
            xendCode:"",
        },
        id:"", 
        company_Id:"",
        updatedby_Userid:"",
       
        display:true
    }

    UNSAFE_componentWillMount(){
        let id = JSON.parse(window.localStorage.getItem("customerId"));
        let url = `http://216.117.149.42:5002/api/Customer/GetCustomerById/${id}`
    
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
    addDataToState = (customer) =>{
        let userData = JSON.parse(window.localStorage.getItem("userData"));
        let updatedby_Userid = userData.id;

        this.setState({
            data:{
                first_Name:customer.first_Name, 
                last_Name:customer.last_Name, 
                email:customer.email, 
                phonenumber:customer.phonenumber,
                xendCode:customer.xendCode,
            },   
            id:customer.id,
            company_Id: customer.company_Id,
            updatedby_Userid
        })
        //console.log(this.state)
    }
    handleInputChange = e => {
        let value = e.target.value;
        let name = e.target.name;
        let data = { ...this.state.data };
        data[name] = value;
    
        this.setState({data});
    }
    onSubmit  =  (e) =>{
        e.preventDefault();
        this.setState({ display: false});
        
        let {first_Name, last_Name, phonenumber, xendCode, email} = this.state.data;
        let {company_Id, updatedby_Userid, id} = this.state;
        let data1 = {
            first_Name,
            last_Name,
            phonenumber,
            xendCode,
            email,
            company_Id,
            updatedby_Userid,
            id
        }
        
        if(first_Name && last_Name && phonenumber && xendCode && email)
        {
            let data = JSON.stringify(data1);
            let url = `http://216.117.149.42:5002/api/Customer/UpdateCustomer`;

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
            Swal.fire(
            {
                icon: 'warning',
                title:'Please!',
                text: 'Fill In The Form Correctly'
            }
            )
            
        }
        this.setState({ display: true});
    }
    viewCustomerPageUi =() =>{
        let {first_Name, last_Name, email, phonenumber, xendCode} = this.state.data;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Customer's Info
                        </h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>Customer's First Name:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="first_Name"
                                        className="form-control "
                                        value={first_Name}
                                    />
                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>Customer's Last Name:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="last_Name"
                                        className="form-control"
                                        value={last_Name}
                                    />
                            
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="details"><h5>Customer's Phone Number:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="phonenumber"
                                        className="form-control"
                                        value={phonenumber}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="details"><h5>Customer's XendCode:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="xendCode"
                                        className="form-control "
                                        value={xendCode}
                                
                                    />
                                </div>
                            </div>
                        </div>
                       <div className="form-group">
                            <label htmlFor="details"><h5>Customer's Email:</h5></label>
                            <input
                                onChange={this.handleInputChange}
                                type="text"
                                name="email"
                                className="form-control"
                                value={email}
                            />
                        </div>
                        <div class="form-buttons-w">
                            <button class="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </div>
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
        return(
            <Layout>
                {this.state.display ? this.viewCustomerPageUi() : this.spinLoader()}
            </Layout>            
        );
    }
}