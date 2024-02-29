

document.getElementById('showleaderboard').onclick=async function(e){
    e.preventDefault();
    document.getElementById('listexpenses').innerText='Leader Board';
    const showexpense= await axios.get('http://16.16.122.223:3000/premium/showleaderboard');
    console.log(showexpense)
    showexpense.data.forEach((expense) => {
        let ullist =  document.getElementById('listexpenses');
        let row = '<li>Name -'+expense.username+'    Total Expense-' + expense.Expenses + '</li>';
        ullist.insertAdjacentHTML('beforeend', row);
    });
        
    }
