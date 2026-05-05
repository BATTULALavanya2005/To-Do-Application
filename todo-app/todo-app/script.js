let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  $("#taskList").empty();
  tasks.forEach((task, index) => {
    if (filter === "all" || task.status === filter) {
      const completedClass = task.status === "completed" ? "completed" : "";
      const taskItem = `
        <li class="list-group-item ${completedClass}">
          ${task.name}
          <div>
            <button class="btn btn-sm btn-success complete-btn" data-index="${index}">✔</button>
            <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">✖</button>
          </div>
        </li>`;
      $("#taskList").append(taskItem);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

$("#addTaskBtn").click(() => {
  const taskName = $("#taskInput").val().trim();
  if (taskName) {
    tasks.push({ name: taskName, status: "pending" });
    $("#taskInput").val("");
    renderTasks();
  }
});

$("#taskList").on("click", ".complete-btn", function () {
  const index = $(this).data("index");
  tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
  renderTasks("completed"); // ⬅ auto switches to completed view
});


$("#taskList").on("click", ".delete-btn", function () {
  const index = $(this).data("index");
  tasks.splice(index, 1);
  renderTasks();
});

$(".filter-btn").click(function () {
  $(".filter-btn").removeClass("active");
  $(this).addClass("active");
  renderTasks($(this).data("filter"));
});

$(document).ready(() => {
  renderTasks();
});
