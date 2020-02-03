//classes
class Budget {
    constructor(budget){
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }
    substractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
   


}

class HTML {

    trackBudget(amount) {
        const budgetLeftDollars = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;
        // Check when 25% is left
        if( (budget.budget / 4 ) > budgetLeftDollars ){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');

       } else if( (budget.budget / 2 ) > budgetLeftDollars  ) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');

       }

     }

    insertBudget(money) {
        budgetTotal.innerHTML = `${money}`
        budgetLeft.innerHTML = `${money}`

    }

    printMessage(message, className) {
        const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("text-center", "alert", className);
        messageWrapper.appendChild(document.createTextNode(message));

        document.querySelector(".primary").insertBefore(messageWrapper, addExpenseForm)
        setTimeout(function(){
            document.querySelector(".primary .alert").remove();
            addExpenseForm.reset();
        }, 2000);
    }
    addExpenseToList(name, amount){
        const expenseList = document.querySelector("#expenses ul");
        // create li
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        // create the template
        li.innerHTML =`
        ${name}
        <span class="badge badge-primary badge-pill">₦${amount}</span>
        `;

        // innsert into the html

        expenseList.appendChild(li);

    }
}
//variables
const addExpenseForm = document.querySelector("#add-expense");
const html = new HTML();
const budgetTotal = document.querySelector("span#total");
const budgetLeft = document.querySelector("span#left");
let budget,userBudget;


//event listeners

eventListeners();
function eventListeners() {

    document.addEventListener("DOMContentLoaded", function() {

        userBudget = prompt("what's your Budget for this week Brother ?");
        // validate if empty, if empty string, if its not a number and lastly 0.
        if(userBudget === null || userBudget === "" || isNaN(userBudget) || userBudget === "0") {
            window.location.reload();
        } else {
            budget = new Budget(userBudget);
            html.insertBudget(budget.budget);
           
        }
    });
    

    addExpenseForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const expenseName = document.querySelector("#expense").value; 
        const amountName = document.querySelector("#amount").value; 
        
        if(expenseName === "" || expenseName === null || amountName === "" || amountName === null || isNaN(amountName) || amountName === "0"){
            html.printMessage("There was an error, all the fields are mandatory. Amount Requires a Number that is not 0", "alert-danger");
        } else {
            html.addExpenseToList(expenseName, amountName);
            html.trackBudget(amountName);
            html.printMessage('Added...', 'alert-success');
           
           
            
        }
        
    })


}; 
