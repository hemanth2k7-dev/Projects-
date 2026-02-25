//Expense Tracker
const addExpense = (array) => {
  let amount = Number(prompt("Enter amount spent"));
  let cat = prompt("Enter category");
  let note = prompt("Enter note if you want", "None");
  array.push({ amount: amount, category: cat.toLowerCase(), note: note });
  alert("Done");
};

function showExpenses(array) {
  console.log("AMOUNT".padEnd(10), "CATEGORY".padEnd(15), "NOTE");
  array.forEach((expense) =>
    console.log(
      String(expense.amount).padEnd(10),
      expense.category.padEnd(15), //padEnd(length to be taken by string,add string till that length),eg:str.padEnd(5,"-")
      expense.note,
    ),
  );
}

function getHighestExpense(array) {
  let maxExpense = 0,
    max;
  if (array.length === 0) {
    console.log("No expenses yet");
    return;
  }
  maxExpense = array.reduce(
    (maxExpense, item) =>
      item.amount > maxExpense ? (maxExpense = item.amount) : maxExpense,
    0,
  );
  max = array.filter((item) => item.amount == maxExpense);
  console.log(
    `Highest Expense is for ${max[0].note} ${max[0].category} = ${max[0].amount}/-`,
  );
}

function getTotalExpense(array) {
  let totalExpense = array.reduce((total, item) => (total += item.amount), 0);
  console.log(`Total Expense = ${totalExpense}/-`);
}

function filterbyCategory(array, cat) {
  const filtered = array.filter((exp) => exp.category === cat.toLowerCase());

  if (filtered.length === 0) {
    console.log("No expenses in this category");
    return;
  }

  console.log("AMOUNT".padEnd(10), "CATEGORY".padEnd(15), "NOTE");

  filtered.forEach((exp) =>
    console.log(
      String(exp.amount).padEnd(10),
      exp.category.padEnd(15),
      exp.note,
    ),
  );

  const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);

  console.log(`Expense for ${cat} in Total = ${total}/-`);
}

function categorySummary(array) {
  let categoryFiltered = [];
  array.forEach((expense) => {
    const existing = categoryFiltered.find(
      (exp) => exp.category === expense.category,
    );
    if (existing) {
      existing.amount += expense.amount;
    } else {
      categoryFiltered.push({
        amount: expense.amount,
        category: expense.category,
      });
    }
  });
  console.log("CATEGORY WISE SUMMARY");
  categoryFiltered.forEach((exp) => {
    console.log(`${exp.category} -> ${exp.amount}`);
  });
}

//Main part of Program
let exit = "no";
let expenses = [];
alert("Expense Tracker");
do {
  alert(
    "Operations you can perform:-\n1.Add expense\n2.Show expenses\n3.Filter by Category and show total in that category\n4.Show total expense\n5.Show Highest Expense\n6.Show category wise summary\n7.Exit",
  );
  let ch = Number(prompt("Enter your choice of Opertion"));
  switch (ch) {
    case 1:
      addExpense(expenses);
      break;
    case 2:
      showExpenses(expenses);
      break;
    case 3:
      let category = prompt("Enter Category");
      filterbyCategory(expenses, category);
      break;
    case 4:
      getTotalExpense(expenses);
      break;
    case 5:
      getHighestExpense(expenses);
      break;
    case 6:
      categorySummary(expenses);
      break;
    case 7:
      exit = "yes";
      break;
  }
} while (exit == "no");
