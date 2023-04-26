const income = document.querySelector('#income');
const expense_name = document.querySelector('#expense-name');
const expense_amount = document.querySelector('#expense-amount');
const add_expense_button = document.querySelector('#add-expense-button');
const summary_amount_income = document.querySelector('.summary-amount-income');
const summary_amount_expenses = document.querySelector(
  '.summary-amount-expenses'
);
const summary_amount_balance = document.querySelector(
  '.summary-amount-balance'
);
const expense_table = document.querySelector('.expense-table');

let balance;
let expenses = 0;

// Adding Income
income.onblur = function () {
  summary_amount_income.innerHTML = `$${income.value}`;
  updateBalance();
};

//Adding Expenses
function addExpense() {
  expense_table.innerHTML += `
    <div>${expense_name.value}</div>
          <div> $${expense_amount.value}</div>
          <div class="delete">
            <button name="delete-expense" class="delete-expense">
              <img src="./images/trash.svg" alt="Trash" />
            </button>
          </div>
    
    
    `;

  const deleteExpense = expense_table.querySelectorAll('.delete-expense');

  deleteExpense.forEach((exp) => {
    exp.addEventListener('click', deleteItem);
  });

  expenses = +expense_amount.value + expenses;
  summary_amount_expenses.innerHTML = `$${expenses}`;
  updateBalance();
}

//Updating balance
function updateBalance() {
  balance = parseFloat(summary_amount_income.innerHTML.slice(1)) - expenses;
  summary_amount_balance.innerHTML = `$${balance}`;
  if (balance < 0) {
    summary_amount_balance.style.color = 'red';
  } else {
    summary_amount_balance.style.color = 'green';
  }
}

//Deleting Expense
function deleteItem(e) {
  let expenseClicked = e.currentTarget.parentElement.previousElementSibling;
  let expenseNametoDelete =
    e.currentTarget.parentElement.previousElementSibling.previousElementSibling;
  let expenseClickedButton = e.currentTarget.parentElement;

  expenses = expenses - parseFloat(expenseClicked.innerHTML.slice(2));
  summary_amount_expenses.innerHTML = `$${expenses}`;
  updateBalance();

  expense_table.removeChild(expenseClicked);
  expense_table.removeChild(expenseClickedButton);
  expense_table.removeChild(expenseNametoDelete);
}

//Event Listeners
add_expense_button.addEventListener('click', addExpense);
