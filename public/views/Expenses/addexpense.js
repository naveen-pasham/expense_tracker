
// add user 
const page=1;
const itemsPerPage=localStorage.getItem('itemsPerPage');

const token=localStorage.getItem('token');
async function expense(event) {
  try{
  event.preventDefault();
  const expenseamount=  document.getElementById('expenseamount').value;
  const description= document.getElementById('description').value;
  const category=document.getElementById('category').value;
  const amounttype=document.getElementById('amounttype').value;

  const obj={
    expenseamount,
    description,
    category,
    amounttype
  }

   const expensedata=await axios.post('http://localhost:3000/userexpense/addexpense',obj,{ headers: { "Authorization": token } });
   showNewExpenseOnScreen(expensedata.data);
//    const showexpense= await axios.get('http://localhost:3000/premium/showleaderboard');
//     console.log(showexpense)
//     showexpense.data.forEach((expense) => {
//         let ullist =  document.getElementById('listexpenses');
//         let row = '<li>Name -'+expense.username+'    Total Expense-' + expense.total_cost + '</li>';
//         ullist.appendChild('beforeend', row);
//     });
  }
  catch(error){
   console.log(error);
  }
  resetForm();
}


document.getElementById('itemsforpage').addEventListener('click', () => {
    const itemsPerPage = document.getElementById('itemsforpage').value;
    localStorage.setItem('itemsPerPage',itemsPerPage);
    document.getElementById('expenseTable').getElementsByTagName('tbody')[0].innerHTML=' ';
   // document.getElementById('itemsforpage').value=itemsPerPage
    getExpenses(page,itemsPerPage)
});


window.addEventListener("DOMContentLoaded",  () =>{

    getExpenses(page,itemsPerPage);
//     const rzpbutton=document.getElementById('rzp-button1');
//     document.getElementById('itemsforpage').value=itemsPerPage
//  axios.get(`http://localhost:3000/userexpense/getexpenses?page=${page}&itemsPerPage=${itemsPerPage}`,{ headers: { "Authorization": token } }).then(response=>{
//   console.log(response)
//   if(response.data.user.ispremiumuser===true){
//     rzpbutton.parentNode.removeChild(rzpbutton);
//    const p=document.createElement('p');
//    const txt=document.createTextNode('You are a Premium User');
//    p.appendChild(txt);
//    document.body.appendChild(p);

// //    const downloadexpense=document.createElement('button');
// //    const downloadexpensetxt=document.createTextNode('Download Expenses');
// //    downloadexpense.appendChild(downloadexpensetxt);
// //    document.body.appendChild(downloadexpense);

//   }
 

// showpagination(response.data);
// }).catch(err=>console.log(err));

});


function showpagination({
    currentpage,
    hasNextPage,
    nextPage,
    hasPreviouspage,
    previousPage,
    lastPage
}){
    let pagination=document.getElementById('expenseTable').getElementsByTagName('tfoot')[0];
    pagination.innerHTML='';

    if(hasPreviouspage){
        const btn2=document.createElement('button');
        btn2.innerHTML=previousPage;
        btn2.addEventListener('click',()=>{
            document.getElementById('expenseTable').getElementsByTagName('tbody')[0].innerHTML=' '
            getExpenses(previousPage,itemsPerPage);
        })
        pagination.appendChild(btn2);
    }
    const btn1=document.createElement('button');
  
    btn1.innerHTML=`<h3>${currentpage}</h3>`;
    btn1.addEventListener('click',()=>{
        document.getElementById('expenseTable').getElementsByTagName('tbody')[0].innerHTML=' '
        getExpenses(currentpage,itemsPerPage);
    })
    pagination.appendChild(btn1);

    if(hasNextPage){
        const btn3=document.createElement('button');
        btn3.innerHTML=nextPage;
        btn3.addEventListener('click',()=>{
            document.getElementById('expenseTable').getElementsByTagName('tbody')[0].innerHTML=' '
            console.log(document.getElementById('expenseTable').getElementsByTagName('tbody')[0])
            getExpenses(nextPage,itemsPerPage);
        })
        pagination.appendChild(btn3);
    }

}

function getExpenses(page,itemsPerPage){
    const rzpbutton=document.getElementById('rzp-button1');
    document.getElementById('itemsforpage').value=itemsPerPage
    axios.get(`http://localhost:3000/userexpense/getexpenses?page=${page}&itemsPerPage=${itemsPerPage}`,{ headers: { "Authorization": token } }).then(response=>{
        console.log(response)
        if(response.data.user.ispremiumuser===true){
            rzpbutton.parentNode.removeChild(rzpbutton);
            document.getElementById('premiumuser').innerHTML='You are a Premium User'
        //    const p=document.createElement('p');
        //    const txt=document.createTextNode('You are a Premium User');
        //    p.appendChild(txt);
        //    document.body.appendChild(p);
        
        //    const downloadexpense=document.createElement('button');
        //    const downloadexpensetxt=document.createTextNode('Download Expenses');
        //    downloadexpense.appendChild(downloadexpensetxt);
        //    document.body.appendChild(downloadexpense);
        
          }
        for(var i=0;i<response.data.expense.length;i++){
            showNewExpenseOnScreen(response.data.expense[i])
          }
        
        showpagination(response.data);
}).catch(err=>console.log(err));


}

//delete user

function removeExpense(row) {
row.parentNode.removeChild(row);
const id= row.cells[0].innerHTML;
axios.get(`http://localhost:3000/userexpense/deleteexpense/${id}`,{ headers: { "Authorization": token } }) 
}

//reset form

function resetForm(){
document.getElementById('expenseamount').value='';
document.getElementById('description').value='';
document.getElementById('category').value='';
// document.getElementById('userId').value = '';
// document.getElementById('rowIndex').value = '';
// document.getElementById('addButton').innerHTML = 'Add E';
}

function showNewExpenseOnScreen(expense){
 let tableBody =  document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
  let row = '<tr><td hidden>'+expense.id+'</td><td>' + expense.amount + '</td><td>' + expense.description + '</td><td>' + expense.category + '</td><td>' + expense.amounttype + '</td><td><button type="button" class="btn btn-sm btn-danger" onclick="removeExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
  tableBody.insertAdjacentHTML('beforeend', row);
}



function download() {
  axios.get('http://localhost:3000/user/download', { headers: { "Authorization": token } })
      .then((response) => {
        console.log(response);
          if (response.status === 200) {
              var a = document.createElement("a");
              a.href = response.data.fileUrl;
              a.download = 'myexpense.csv';
              a.click();
          } else {
              throw new Error(response.data.message);
          }
      })
      .catch((err) => {
          console.log(err);
      });
}

document.getElementById('rzp-button1').addEventListener('click', async function (e) {
    const rzpbutton=document.getElementById('rzp-button1');
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } });
 //   console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": function (response) {
           // console.log(response);
            axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } })
                .then(() => {
                    alert('You are a Premium User Now');
                    rzpbutton.parentNode.removeChild(rzpbutton);
                    document.getElementById('premiumuser').innerHTML='You are a Premium User'
                })
                .catch(() => {
                    alert('Something went wrong. Try Again!!!');
                });
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
     // console.log(response);
       // alert("Something Went Wrong");
       axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
        order_id: response.error.metadata.order_id,
        payment_id: response.error.metadata.payment_id,
        reason:response.error.reason
    }, { headers: { "Authorization": token } })
        .then(() => {
            alert('Your Payment Failed');
        })
        .catch(() => {
            alert('Something went wrong. Try Again!!!');
        });
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    });
});