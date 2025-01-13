const inputBox = document.querySelector(".input-box");
const mainBox = document.querySelector("main");

const emptyTextP = document.createElement("p");
emptyTextP.innerText = "The list is empty";
emptyTextP.className = "empty-text";
mainBox.appendChild(emptyTextP);

function checkList() {
  emptyTextP.style.display =
    mainBox.querySelectorAll(".task-container").length > 0 ? "none" : "block";
}

function createButton(imgLink, altText, className) {
  const button = document.createElement("div");
  button.className = className;
  button.innerHTML = `<img src="${imgLink}" alt="${altText}" width="25px" height="25px">`;
  button.style.cursor = "pointer";
  button.style.marginRight = "20px";
  return button;
}

function addTask(inputValue) {
  const task = document.createElement("div");
  task.className = "task-container";
  task.style.cssText =
    "display: flex; justify-content: center; align-items: center";

  const tasktext = document.createElement("p");
  tasktext.className = "task-text";
  tasktext.innerText = inputValue;
  task.appendChild(tasktext);

  const editButton = createButton("./edit.svg", "Edit Button", "edit-button");
  const deleteButton = createButton(
    "./bin.svg",
    "Delete Button",
    "delete-button"
  );
  const saveButton = createButton("./save.svg", "Save", "save-text");
  saveButton.style.cssText = "display:none;";

  task.appendChild(editButton);
  task.appendChild(saveButton);
  task.appendChild(deleteButton);
  mainBox.appendChild(task);
}

function editButtonListener(e) {
  const container = e.target.closest(".task-container");
  const taskText = container.querySelector(".task-text");
  const editIcon = container.querySelector(".edit-button");
  const saveIcon = container.querySelector(".save-text");
  //   console.log(container);

  const editText = document.createElement("input");
  editText.className = "input-text";
  editText.value = taskText.innerText;
  editText.type = "text";
  container.replaceChild(editText, taskText);

  editIcon.style.display = "none";
  saveIcon.style.display = "block";
}

function deleteButtonListener(e) {
  const task = e.target.closest(".task-container");
  task.remove();
  checkList();
}

function saveButtonListener(e) {
  const container = e.target.closest(".task-container");
  const editIcon = container.querySelector(".edit-button");
  const inputTag = container.querySelector(".input-text");
  const saveIcon = container.querySelector(".save-text");

  const tasktext = document.createElement("p");
  tasktext.className = "task-text";
  tasktext.innerText = inputTag.value;

  container.replaceChild(tasktext, inputTag);
  editIcon.style.display = "block";
  saveIcon.style.display = "none";
}

mainBox.addEventListener("click", (e) => {
  if (e.target.closest(".edit-button")) {
    editButtonListener(e);
  } else if (e.target.closest(".delete-button")) {
    deleteButtonListener(e);
  } else if (e.target.closest(".save-text")) {
    saveButtonListener(e);
  }
});
mainBox.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    const container = e.target.closest(".task-container");
    const inputTag = container?.querySelector(".input-text");
    if (inputTag && e.target === inputTag) {
      saveButtonListener(e);
    }
  }
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && inputBox.value.trim() !== "") {
    // console.log("ENter presses");

    addTask(inputBox.value.trim());
    inputBox.value = "";
    checkList();
  }
});

checkList();
