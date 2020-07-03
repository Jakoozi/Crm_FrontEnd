import React, { Component } from "react";

export default class BaseAPI extends Component{

    baseEndPoint = () =>{
        //let endpointString = `http://216.117.149.42:5002/api`
        let endpointString = `https://localhost:5001/api`;
        return endpointString;
    }

}

