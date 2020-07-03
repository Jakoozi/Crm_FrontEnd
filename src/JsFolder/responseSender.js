import Swal from 'sweetalert2';


export const responseSender =  (json) =>{
    //checking for json's value from my database
    //console.log(json, "This is the json response");

    if (json.status_code === 400) {
        Swal.fire(
            {
              title:'sorry',
              text: `${json.message}`,
              icon:"error"
            }
        )
        return false;
      } 
    else if (json.status_code === 200) {
      Swal.fire(
        {
          title:'Successful',
          text: `${json.message}`,
          icon:"success",
          timer:4000
        }
      )
      return true;
    }
    else if (json.status_code === 405) {
      Swal.fire(
          {
            title:'sorry',
            text: `${json.message}`,
            icon:"error",
            timer:5000
          }
      )
      return false;
    } 
}

