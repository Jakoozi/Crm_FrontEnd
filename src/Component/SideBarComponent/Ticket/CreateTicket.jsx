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

export default class CreateTicketComponent extends Component{
    state={
        data:{
            ticket_Subject:"",
            ticket_details:"",  
            customer_Id:"",
            company_Id:"",    
        },
        customers:[
        ],
        companies:[
        ],
        id:"",
        display:true,
        companyExtensionMethods : new CompanyExtensionMethods()
    }
    
    UNSAFE_componentWillMount(){

        //this gets the stored user data from the browser
        let userData = JSON.parse(window.localStorage.getItem("userData"));
        this.addUserDataToState(userData);

        //this methods fetches the customers from the server
        let url = `https://localhost:5001/api/Customer/GetAllCustomersService`;

        fetch(url)
        .then(response => response.json())
        .then(json =>{
             this.addCustomersToState(json.data)
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
    addUserDataToState = (userData) =>{
        //this method adds the gotten user data to state
        let {id} = userData;
        this.setState({id});
    }
    addCustomersToState = (customers) =>{
        //this method adds the customers to state
        this.setState({customers});
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
      };
    customerOptionReturner = () =>{
        let {customers} = this.state;
        let all = customers.map((customer) =>{
            return(
                <option value={customer.id}>{customer.first_Name} {customer.last_Name}</option>
            );
          });
          return all;
    }
    createTicketPageUi =() =>{
        let {ticket_Subject, ticket_details, customer_Id, company_Id} = this.state.data;
        return(
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form onSubmit={this.onSubmit}>
                        <h3
                            className="form-header"
                            style={{ paddingTop: "10vh", textAlign: "center", paddingBottom: "10vh" }}
                        >
                            Create A Ticket
                        </h3>
                        <div className="row">
                            <div class="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="subject"><h5>Ticket Subject:</h5></label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="ticket_Subject"
                                        className="form-control"
                                        placeholder="Enter.."
                                        value={ticket_Subject}
                                    />
                                       
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="customer"><h5> Customer:</h5></label>
                                    <select 
                                        name="customer_Id"
                                        onChange={this.handleInputChange}
                                        className="form-control "
                                        value={customer_Id}
                                    >
                                    <option hidden>selecte customer...</option>
                                    {this.customerOptionReturner()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="details"><h5>Ticket Details:</h5></label>
                                    <textarea
                                        onChange={this.handleInputChange}
                                        rows="4"
                                        type="text"
                                        name="ticket_details"
                                        className="form-control"
                                        placeholder="Enter.."
                                        value={ticket_details}
                                    />
                                </div>
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
                                Create Ticket
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        )
    }
    onSubmit = (e) =>{
        e.preventDefault();

        this.setState({ display: false});
        let  {ticket_Subject, ticket_details, customer_Id, company_Id} = this.state.data;
        let { id} = this.state;

        let data1 = {
            ticket_Subject,
            ticket_details,
            customer_Id,
            company_Id,
            createdby_Userid:id
        }
        if(ticket_Subject && ticket_details && customer_Id)
        {
            
            let data = JSON.stringify(data1);
            let url = `https://localhost:5001/api/Ticket/CreateTicket`;
            console.log(data, 'data is logged')
     
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
                this.setState({ display: true});
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
        this.setState({ data:{ ticket_Subject:"", ticket_details:""} });
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
                {this.state.display ? this.createTicketPageUi() : this.spinLoader()}
            </Layout>
        );
    }
}