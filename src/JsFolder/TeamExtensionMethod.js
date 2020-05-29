import React, { Component } from "react";
import Swal from "sweetalert2";


export default class TeamExtensionMethod extends Component{

    state = {
        company:{}
    }

    teamOptionReturner = (teams, teamLoaded) =>{

        let all;
        if(teamLoaded == true){
            all = teams.map((team) =>{
                return(
                    <option value={team.id}>{team.team_Name}</option>
                );
            });
        }
        else{
            all = "please reload the page"
        }
        return all;
    }
}