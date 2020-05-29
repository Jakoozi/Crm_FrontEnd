import Swal from 'sweetalert2';

export  const CustomerNoOfTickets =  (id) =>{

        let url = `https://localhost:5001/api/Ticket/GetTicketByCustomer_Id?id=${id}`;
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
                  type: 'error',
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