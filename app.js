const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('#topSectionForAddingElementToList button');
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createDeleteButton = () => {
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = createDeleteButton();

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const listItem = createNewTaskElement(taskText);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);

  taskInput.value = '';
};

const editTask = (event) => {
  const editButton = event.target;
  const listItem = editButton.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = (event) => {
  const deleteButton = event.target;
  const listItem = deleteButton.closest('li');
  if (listItem) {
    listItem.remove();
  }
};

const completeTask = (event) => {
  const checkBox = event.target;
  const listItem = checkBox.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, activateTask);
};

const activateTask = (event) => {
  const checkBox = event.target;
  const listItem = checkBox.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);
};

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = (e) => editTask(e);
  deleteButton.onclick = (e) => deleteTask(e);
  checkBox.onchange = (e) => checkBoxEventHandler(e);
};

addButton.addEventListener('click', addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], completeTask);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], activateTask);
}
