import React, { Component } from "react";
import { css } from "@emotion/core";
import { PacmanLoader	 } from 'react-spinners';
import Swal from "sweetalert2";
import { responseSender } from '../../JsFolder/responseSender';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  
`;

export default class Login extends Component {

    state = {
        data: {
          email: "",
          User_Password: ""
        },
        login: false,
        loading: true,
        display: true
      };

    handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let data = this.state.data;
        data[name] = value;
    
        this.setState({ data });
        console.log(this.state);
    };
    loginFormUi = () =>{
        const { email, User_Password } = this.state.data;
    
          return(
            <div className="container-fluid">
                <div class="row">
                    <div class="col-md-12"></div>
                </div>
                <div className="row" style={{paddingTop: '100px', paddingTop:'150px'}}>
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4">
                        <div className="element-wrapper">
                            <h4 className="element-header">
                                Login In To Members Area:
                            </h4>
                            <div className="element-box">
                                <form role="form" onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <label for="email"><h5>Email address:</h5></label>
                                            <input type="email"
                                            class="form-control form-control-lg"
                                            name='email'
                                            value={email}
                                            onChange={this.handleInputChange}
                                            id="email" />
                                        </div>
                                        <div class="form-group">
                                            <label for="pwd"><h5>Password:</h5></label>
                                            <input type="password"
                                            onChange={this.handleInputChange}
                                            name='User_Password'
                                            value={User_Password}
                                            class="form-control form-control-lg"
                                            id="pwd" />
                                        </div>
                                        <button type="submit"
                                        className="btn btn-primary btn-block">
                                            Login
                                        </button>
                                        {/* <div class="tipWrap"><p class="tip">Don't have an account? <Link to="/Register" class="">Sign up here</Link></p></div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
          );
    }
    spinLoader = () =>{
        return(
          <div className="sweet-loading" style={{  paddingTop : `20vh`, paddingRight : `30vh` }}>
              <PacmanLoader	
                  css={override}
                  sizeUnit={"px"}
                  size={100} 
                  color={"#2A68D4"}
                  loading={this.state.loading}
              />
        </div>
        )
    }
    //the user id stored here will be used on the first page after display to show the users info
    storeUserInfo = jsonresponse => {
        if (typeof Storage !== "undefined") {
           
          // Code for localStorage
          if(jsonresponse.status_code == 200){
            console.log(jsonresponse)
            window.localStorage.setItem("userData", JSON.stringify(jsonresponse.data));
            //this triggers the route to the dashboard
              return this.setState({ login: true });
          }
          else{
            this.setState({ display: true});
          }
        }
    }
    onSubmit = e => {   
        e.preventDefault();
        this.setState({display: false });
      
        
        const { email, User_Password } = this.state.data;
        if (email && User_Password) {
          const data = JSON.stringify(this.state.data);
          let url = `https://localhost:5001/api/User/AgentLogin`;
    
          fetch(url, {
            method: "post",
            body: data,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(json => {
              //this method recieves the json and sends the ui response
              let responseresult = responseSender(json);
              //this.setState({ display: true, login:responseresult});
              this.storeUserInfo(json)
            })
            .catch(error => {
                console.log(error, "error is consoled");
                Swal.fire({
                    type: "error",
                    title: "Opps!!",
                    text: `Something Whent Wrong Please Check Your Internet Connection.`
                });
                this.setState({ display: true});
            });
        } 
        else 
        {
            Swal.fire({
                type: "warning",
                title: "Please!",
                text: "Please Fill The Form Completely"
            });
            this.setState({ display: true});
        }
        
      };
    render() {

      //this routes to the CreateTicket page
      if (this.state.login) {
        this.props.history.push("/CreateTicket");
      }

        return(
          
            <div className='with-content-panel'>
                <div className='all-wrapper menu-side with-side-panel'>
                    <div className='layout-w'>
                        <div className='content-w '>
                            <div
                                className='with-content-panel'
                                style={{ minHeight: '95vh' }}
                            >
                                {/* <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/Register" >Register</Link></li>
                                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/" >About</Link></li>
                                </ul> */}
                                {this.state.display ? this.loginFormUi() : this.spinLoader()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}