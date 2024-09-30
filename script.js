// tanggal
document.getElementById("date-picker").valueAsDate = new Date();

// Function untuk setting nama, posisi dan dapartement
document
  .getElementById("update-profile-btn")
  .addEventListener("click", function () {
    let name = document.getElementById("name").value.trim();
    let position = document.getElementById("position").value.trim();
    let dapart = document.getElementById("dapart").value.trim();

    if (name !== "" && position !== "" && dapart !== "") {
      document.getElementById("profile").innerHTML = `
            <div>
            <p>Name         :  ${name}</p>
            <p>Position     :  ${position}</p>
            <p>Dapartement  :  ${dapart}</p>
            <div>
        `;
    }
  });

// Function upload tugas
document.getElementById("add-task-btn").addEventListener("click", function () {
  let taskInput = document.getElementById("task-input").value.trim();
  let priority = document.getElementById("priority-level").value;
  let selectedDate = document.getElementById("date-picker").valueAsDate;
  let formattedDate = selectedDate.toLocaleDateString("in-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  });

  if (taskInput !== "") {
    let taskList = document.getElementById("task-list");
    let newTask = document.createElement("tr");
    newTask.classList.add("priority-" + priority);
    newTask.innerHTML = `
        <td><input type="checkbox" class="checkbox"></td><td>
        <td><span class="task-text">${formattedDate}</span></td>
        <td>${taskInput}</td>
        <td>${priority}</td>
        <td><button class="remove-task-btn">Remove</button></td>
    `;
    taskList.appendChild(newTask);
    document.getElementById("task-input").value = "";

    // Checkbox
    newTask.querySelector(".checkbox").addEventListener("change", function () {
      if (this.checked) {
        moveTaskToDone(newTask);
      } else {
        moveTaskToTodo(newTask);
      }
    });

    // fungsi delete tugas
    newTask
      .querySelector(".remove-task-btn")
      .addEventListener("click", function () {
        taskList.removeChild(newTask);
      });

    // Function untuk membuat tugas done
    function moveTaskToDone(taskItem) {
      let doneList = document.getElementById("done-list");
      let doneTask = taskItem;

      doneTask.classList.add("completed-task");
      doneTask.querySelector(".checkbox").checked = true;

      doneList.appendChild(doneTask);
      doneTask
        .querySelector(".remove-task-btn")
        .addEventListener("click", function () {
          doneList.removeChild(doneTask);
        });
    }

    function moveTaskToTodo(taskItem) {
      let todoList = document.getElementById("task-list");
      let undoneTask = taskItem;

      undoneTask.classList.remove("completed-task");
      undoneTask.querySelector(".checkbox").checked = false;

      todoList.appendChild(undoneTask);
      doneTask
        .querySelector(".remove-task-btn")
        .addEventListener("click", function () {
          doneList.removeChild(doneTask);
        });
    }
  }
});

// Function untuk menghapus semua tugas
document.getElementById("clear-all-btn").addEventListener("click", function () {
  document.getElementById("task-list").innerHTML = "";
  document.getElementById("done-list").innerHTML = "";
});
