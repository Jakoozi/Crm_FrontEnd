import Swal from 'sweetalert2';


export const responseSender =  (json) =>{
    //checking for json's value from my database
    console.log(json, "This is the json response");

    if (json.status_code === 400) {
        Swal.fire(
            {
              title:'sorry',
              text: `${json.message}`
        })
        return false;
      } 
   else if (json.status_code === 200) {
    Swal.fire(
        {
          title:'Successful',
          text: `${json.message}`
    })
    return true;
    
  } 

}

