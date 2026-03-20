// Expense Tracker (Node CLI version)
// Updated control flow and calculations by I/O with a readline-based CLI.

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ALERT = (message) => {
  console.log(message);
};

const ask = (questionText) =>
  new Promise((resolve) => rl.question(questionText, resolve));

async function PROMPT(questionText, defaultValue) {
  const suffix = defaultValue !== undefined ? ` (${defaultValue})` : "";
  const answer = await ask(`${questionText}${suffix}: `);
  if (answer === "" && defaultValue !== undefined) return defaultValue;
  return answer;
}

const addExpense = async (array) => {
  let amount = Number(await PROMPT("Enter amount spent"));
  let cat = await PROMPT("Enter category");
  let note = await PROMPT("Enter note if you want", "None");
  array.push({ amount: amount, category: cat.toLowerCase(), note: note });
  ALERT("Done");
};

function showExpenses(array) {
  if (array.length === 0) {
    console.log("No expenses yet");
    return;
  }

  const amountWidth = Math.max(
    "AMOUNT".length,
    ...array.map((e) => String(e.amount).length),
  );
  const categoryWidth = Math.max(
    "CATEGORY".length,
    15,
    ...array.map((e) => String(e.category ?? "").length),
  );
  const noteWidth = 30;

  const truncate = (value) => {
    const str = String(value ?? "");
    return str.length > noteWidth ? `${str.slice(0, noteWidth - 3)}...` : str;
  };

  console.log(
    `${"AMOUNT".padEnd(amountWidth)}  ${"CATEGORY".padEnd(
      categoryWidth,
    )}  NOTE`,
  );
  console.log(
    `${"-".repeat(amountWidth)}  ${"-".repeat(categoryWidth)}  ${"-".repeat(
      4,
    )}`,
  );

  array.forEach((expense) => {
    const amount = String(expense.amount);
    const category = String(expense.category ?? "");
    console.log(
      `${amount.padEnd(amountWidth)}  ${category.padEnd(categoryWidth)}  ${truncate(
        expense.note,
      )}`,
    );
  });
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

  const amountWidth = Math.max(
    "AMOUNT".length,
    ...filtered.map((e) => String(e.amount).length),
  );
  const categoryWidth = Math.max(
    "CATEGORY".length,
    15,
    ...filtered.map((e) => String(e.category ?? "").length),
  );
  const noteWidth = 30;

  const truncate = (value) => {
    const str = String(value ?? "");
    return str.length > noteWidth ? `${str.slice(0, noteWidth - 3)}...` : str;
  };

  console.log(
    `${"AMOUNT".padEnd(amountWidth)}  ${"CATEGORY".padEnd(
      categoryWidth,
    )}  NOTE`,
  );
  console.log(
    `${"-".repeat(amountWidth)}  ${"-".repeat(categoryWidth)}  ${"-".repeat(
      4,
    )}`,
  );

  filtered.forEach((exp) => {
    const amount = String(exp.amount);
    const category = String(exp.category ?? "");
    console.log(
      `${amount.padEnd(amountWidth)}  ${category.padEnd(categoryWidth)}  ${truncate(
        exp.note,
      )}`,
    );
  });

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

// Main part of Program (same control flow, only awaiting CLI input)
async function main() {
  let exit = "no";
  let expenses = [];
  ALERT("Expense Tracker");
  do {
    ALERT(
      "Operations you can perform:-\n1.Add expense\n2.Show expenses\n3.Filter by Category and show total in that category\n4.Show total expense\n5.Show Highest Expense\n6.Show category wise summary\n7.Exit",
    );
    let ch = Number(await PROMPT("Enter your choice of Opertion"));
    switch (ch) {
      case 1:
        await addExpense(expenses);
        break;
      case 2:
        showExpenses(expenses);
        break;
      case 3:
        let category = await PROMPT("Enter Category");
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

  rl.close();
}

main();
