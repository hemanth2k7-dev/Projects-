//Student Productivity tool,format of data=>{title : Study_title,done : boolean(True/False)}
function addTask(array) {
  let title = prompt("Enter Task");
  let done_bool = prompt("Whether done the task(true/false)?").toLowerCase();
  if (done_bool == "true") {
    done_bool = true;
  } else {
    done_bool = false;
  }
  array.push({ Task_title: title.toLowerCase(), Done: done_bool });
}

function deleteTask(array) {
  let title = prompt("Enter Task to be Deleted");
  for (let i = 0; i < array.length; i++) {
    const task = array[i];
    if (task.Task_title == title.toLocaleLowerCase()) {
      array.splice(i, 1);
      console.log("Done");
    }
  }
}

function showAll(array) {
  console.log("TASK".padEnd(10), "DONE");
  array.map((task) => console.log(task.Task_title.padEnd(10), task.Done));
}

function showDone_vs_Pending(array) {
  let done = array.filter((task) => task.Done == true),
    pending = array.filter((task) => task.Done == false);
  console.log("TASKS DONE \t\t\t PENDING");
  const maxLen = Math.max(done.length, pending.length);
  for (let i = 0; i < maxLen; i++) {
    let doneTitle, pendingTitle;
    if (done[i]) {
      doneTitle = done[i].Task_title;
    } else {
      doneTitle = "";
    }
    if (pending[i]) {
      pendingTitle = pending[i].Task_title;
    } else {
      pendingTitle = "";
    }
    console.log(doneTitle, "\t\t\t", pendingTitle);
  }
}

function markDone(array, task_title) {
  for (let i = 0; i < array.length; i++) {
    const task = array[i];
    if (task.Task_title == task_title.toLocaleLowerCase()) {
      task.Done = true;
    }
  }
  console.log("Mark as Done");
}

//Main part of Program
let exit = "no";
let tasks = [];
alert("Student's Task Tracking Tool");
do {
  alert(
    "Operations you can perform:-\n1.Add task\n2.Delete task\n3.Show tasks\n4.Show tasks Done vs Pending\n5.Mark done\n6.Exit",
  );
  let ch = Number(prompt("Enter your choice of Opertion"));
  switch (ch) {
    case 1:
      addTask(tasks);
      break;
    case 2:
      if (tasks.length === 0) {
        console.log("No tasks inside the Tasks list");
      } else {
        deleteTask(tasks);
      }
      break;
    case 3:
      if (tasks.length === 0) {
        console.log("No tasks inside the Tasks list");
      } else {
        showAll(tasks);
      }
      break;
    case 4:
      if (tasks.length === 0) {
        console.log("No tasks inside the Tasks list");
      } else {
        showDone_vs_Pending(tasks);
      }
      break;
    case 5:
      let title = prompt("Enter Task to be mark as done");
      if (tasks.length === 0) {
        console.log("No tasks inside the Tasks list");
      } else {
        markDone(tasks, title);
      }
      break;
    case 6:
      exit = "yes";
      break;
  }
} while (exit == "no");
