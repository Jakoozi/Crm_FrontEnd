import React, { Component } from "react";
import Layout from '../../Layout/Layout';
import Swal from 'sweetalert2';
import { css } from "@emotion/core";
import { BeatLoader	 } from 'react-spinners';
import { responseSender } from '../../../JsFolder/responseSender';
import CompanyExtensionMethods   from '../../../JsFolder/CompanyExtensionMethods';
import BaseAPI from '../../../JsFolder/BaseAPI'


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;

export default class CreateCustomer extends Component{

    state={
        data:{
            first_Name:"",
            last_Name:"",  
            phonenumber:"",
            xendCode:"",
            email:"",
            company_Id:"",    
        },
        companies:[
        ],
        
        createdby_Userid:"",
        display:true,
        userRole:"",
        companyLoaded:false,
        companyExtensionMethods : new CompanyExtensionMethods(),
        baseApi : new BaseAPI()
    }
    UNSAFE_componentWillMount (){
        //this gets the stored user data from the browser
        let userData = JSON.parse(window.localStorage.getItem("userData"));
        this.addUserDataToState(userData);

        //this fethces all the companies from the data base
        let url = `${this.state.baseApi.baseEndPoint()}/Company/GetAllCompaniesService`;

        fetch(url)
        .then(response => response.json())
        .then(json => {  
            this.addCompaniesToState(json.data)
            this.setState({companyLoaded:true})
        }) 
        .catch(error => { 
            console.log(error)
            Swal.fire(
                {
                  icon: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );
    }
    addCompaniesToState = (companies) =>{
        this.setState({companies})
    }
    addUserDataToState = (userData) =>{
        //this method adds the gotten user data to state
        let {company_Id} = userData;
        let createdby_Userid = userData.id;

        if(userData.user_Role === 1){
            this.setState({createdby_Userid, userRole:userData.user_Role});
        }
        else if (userData.user_Role === 2){
            this.setState({createdby_Userid, data:{company_Id}, userRole:userData.user_Role});
        }
      
    }
    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = { ...this.state.data };
        data[name] = value;
        // console.log(data);
    
        this.setState({ data });
    }
    companySelctorReturner = () =>{
        let {company_Id} = this.state.data
        //console.log(this.state.userRole, 'create Ticket state');
        if(this.state.userRole === 1){
            return(
                <div className="form-group">
                    <label htmlFor="company"><h5> Company:</h5></label>
                    <select 
                        name="company_Id"
                        onChange={this.handleInputChange}
                        class="form-control "
                        value={company_Id}
                    >
                    <option hidden>selecte company...</option>
                    {this.state.companyExtensionMethods.companyOptionReturner(this.state.companies, this.state.companyLoaded)}
                    </select>
                </div>
            )
        }
        else if (this.state.userRole === 2){
            return(
                null
            )
        }
    }
    onSubmit  =  (e) =>{
        e.preventDefault();
        this.setState({ display: false});

        let {first_Name, last_Name, phonenumber, xendCode, email, company_Id} = this.state.data;
        let { createdby_Userid} = this.state;
        let data1 = {
            first_Name,
            last_Name,
            phonenumber,
            xendCode,
            email,
            company_Id,
            createdby_Userid
        }
 
        if(first_Name && last_Name && phonenumber && xendCode && email)
        {
            let data = JSON.stringify(data1);
            let url = `${this.state.baseApi.baseEndPoint()}/Customer/CreateCustomer`;
            console.log(data, 'data is logged');

            fetch(url,{
                method: 'post',
                body: data,
                headers:{
                  'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => {
               // console.log(json, "This is the json response");
                 responseSender(json);
                 this.setState({ display: true, data:{
                    first_Name:"",
                    last_Name:"",  
                    phonenumber:"",
                    xendCode:"",
                    email:""   }});
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
    createCustomerPageUi =() =>{
         let {first_Name, last_Name, phonenumber, xendCode, email} = this.state.data;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Create A Customer
                        </h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>First Name:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="first_Name"
                                        className="form-control "
                                        placeholder="Enter.."
                                        value={first_Name}
                                    />
                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>Last Name:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="last_Name"
                                        className="form-control "
                                        placeholder="Enter.."
                                        value={last_Name}
                                    />
                            
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>Phone Number:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="phonenumber"
                                        className="form-control "
                                        placeholder="Enter.."
                                        value={phonenumber}
                                    />
                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>Xend Code:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="xendCode"
                                        className="form-control "
                                        placeholder="Enter.."
                                        value={xendCode}
                                    />
                            
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="details"><h5>Email Address:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="email"
                                        name="email"
                                        className="form-control "
                                        placeholder="Enter.."
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                {this.companySelctorReturner()}
                            </div>
                        </div>
                        
                        <div class="form-buttons-w">
                            <button class="btn btn-primary" type="submit">
                                Create Customer
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
        console.log(this.state, 'baseendpoint is consoled in add data to state');
        return(
            <Layout>
                {this.state.display ? this.createCustomerPageUi() : this.spinLoader()}
            </Layout>
        )
    }
}