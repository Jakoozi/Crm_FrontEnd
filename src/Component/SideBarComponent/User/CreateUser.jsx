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

export default class CreateUser extends Component{
    state={
        data:{
            first_Name:"",
            last_Name:"",  
            phonenumber:"",
            xendCode:"",
            email:"" ,
            user_Role:"",
            user_Password:"",
            company_Id:"" 
        },
        companies:[

        ],
        createdby_Userid:"",
        display:true,
        companyLoaded:false,
        companyExtensionMethods : new CompanyExtensionMethods()
    }

    componentDidMount(){
        //this methods fetches the companies from the server
        let url = `https://localhost:5001/api/Company/GetAllCompaniesService`;

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
                  type: 'error',
                  title:'please!!',
                  text: 'Check your internet connection'
                }
              )
        } );
    }
    addCompaniesToState = (companies) =>{
        this.setState({companies})
    }
    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = { ...this.state.data };
        data[name] = value;
        console.log(data);
    
        this.setState({ data });
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
     onSubmit  =  (e) =>{
        e.preventDefault();
        this.setState({ display: false});

        let {first_Name, last_Name, phonenumber, xendCode, email, user_Role, user_Password, company_Id} = this.state.data;

        let data1 = {
            first_Name,
            last_Name,
            phonenumber,
            xendCode,
            email,
            company_Id,
            user_Role,
            user_Password,
        }

        if(first_Name && last_Name && phonenumber && xendCode && email && user_Role && user_Password && company_Id)
        {
            let data = JSON.stringify(data1);
            let url = `https://localhost:5001/api/User/CreateUser`;
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
                 console.log(json, "This is the json response");
                  responseSender(json);
                  this.setState({ display: true, data:{
                    first_Name:"",
                    last_Name:"",  
                    phonenumber:"",
                    xendCode:"",
                    email:"" ,
                    user_Role:"",
                    user_Password:""  
                }});
             })
             .catch(error => {
                console.log(error)
                Swal.fire(
                  {
                    type: 'error',
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
                type: 'warning',
                title:'Please!',
                text: 'Fill In The Form Correctly'
            }
            )
            this.setState({ display: true});
        }
        
     }
     createUserPageUi = () =>{
        let {first_Name, last_Name, phonenumber, xendCode, email, user_Role, user_Password, company_Id } = this.state.data;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Create A User
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
                        </div>
                        <div className="row">
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
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>User Password:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="user_Password"
                                        className="form-control "
                                        placeholder="Enter.."
                                        value={user_Password}
                                    />
                            
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="customer"><h5> Select User Role:</h5></label>
                                <select 
                                    name="user_Role"
                                    onChange={this.handleInputChange}
                                    className="form-control"
                                    value={user_Role}
                                >
                                <option hidden>Please Select</option>
                                <option value="1">Admin</option>
                                <option value="2">Agent </option>
                                </select>
                            </div>
                            <div className="col-md-6">
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
                            </div>
                        </div>
                        <div class="form-buttons-w">
                            <button class="btn btn-primary" type="submit">
                                Create User
                            </button>
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
                {this.state.display ? this.createUserPageUi() : this.spinLoader()}
            </Layout>
        )
    }

}