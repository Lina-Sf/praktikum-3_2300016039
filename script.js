// Get elements from the DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const closeModal = document.querySelector(".close");

let currentTask = null;

// Add Task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = ""; // Clear input field
    }
});

// Function to add a task to the list
function addTask(taskText) {
    const listItem = document.createElement("li");

    // Task content
    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    // Mark task as completed when clicked
    taskContent.addEventListener("click", () => {
        listItem.classList.toggle("completed");
    });

    // Edit button
    const editBtn = document.createElement("span");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => openEditModal(taskContent, listItem));

    // Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => listItem.remove());

    // Append elements
    listItem.appendChild(taskContent);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
}

// Open Edit Modal
function openEditModal(taskContent, listItem) {
    currentTask = { taskContent, listItem };
    editInput.value = taskContent.textContent;
    editModal.style.display = "block";
}

// Close Modal
closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.style.display = "none";
    }
});

// Save Edited Task
saveEditBtn.addEventListener("click", () => {
    const updatedText = editInput.value.trim();
    if (updatedText !== "") {
        currentTask.taskContent.textContent = updatedText;
        currentTask.listItem.classList.add("edited"); // Highlight edited task
        editModal.style.display = "none";
    }
});
