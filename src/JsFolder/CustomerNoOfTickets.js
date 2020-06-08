import Swal from 'sweetalert2';
import BaseAPI from '../JsFolder/BaseAPI';

export  const CustomerNoOfTickets =  (id) =>{
        let baseAPI = new BaseAPI();

        let url = `${baseAPI.baseEndPoint()}/Ticket/GetTicketByCustomer_Id?id=${id}`;
        let number ;

        fetch(url)
        .then(response => response.json())
        .then(json => {
            return this.number = json.data.length
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
        console.log(number, 'number is logged')
}
// export const CustomerTicketNoReturner = (no) =>{
//     console.log(no, "no is consoled")
//     CustomerNoOfTickets(no);
//     return no;
// }