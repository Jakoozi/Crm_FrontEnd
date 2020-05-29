import React, { Component } from "react";
import Swal from "sweetalert2";


export default class UserExtensionMethod extends Component{

    state = {
        company:{}
    }

    userOptionReturner = (users, userLoaded) =>{

        let all;
        if(userLoaded == true){
            all = users.map((user) =>{
                return(
                    <option value={user.id}>{user.first_Name} {user.last_Name}</option>
                );
            });
        }
        else{
            all = "please reload the page"
        }
        return all;
    }
}