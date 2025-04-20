// Get all the columns and task lists
const columns = document.querySelectorAll('.board-column');

// Loop through each column and add drag events
columns.forEach(column => {
  const taskList = column.querySelector('.task-list');

  taskList.addEventListener('dragover', (e) => {
    e.preventDefault(); // This allows us to drop the item
    column.classList.add('drag-over');
  });

  taskList.addEventListener('dragleave', () => {
    column.classList.remove('drag-over');
  });

  taskList.addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default behavior
    column.classList.remove('drag-over');
    
    const draggedTask = document.querySelector('.dragging');
    taskList.appendChild(draggedTask); // Move the task to the new column
    draggedTask.classList.remove('dragging');
  });
});

// Add the dragging functionality
const taskCards = document.querySelectorAll('.task-card');

taskCards.forEach(task => {
  task.setAttribute('draggable', true);

  task.addEventListener('dragstart', (e) => {
    task.classList.add('dragging');
  });

  task.addEventListener('dragend', () => {
    task.classList.remove('dragging');
  });
});

// Add functionality to create new tasks via popup window
const addButtons = document.querySelectorAll('.add-task');
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    openTaskPopup(button);
  });
});

function openTaskPopup(button) {
  // Create the popup window HTML structure
  const popup = document.createElement('div');
  popup.classList.add('task-popup');
  
  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');
  
  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.placeholder = 'Enter task details';
  taskInput.classList.add('task-input');
  
  const addTaskButton = document.createElement('button');
  addTaskButton.textContent = 'Add Task';
  addTaskButton.classList.add('add-task-btn');
  
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.classList.add('cancel-btn');
  
  addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');
      taskCard.setAttribute('draggable', true);

      const taskParagraph = document.createElement('p');
      taskParagraph.textContent = taskText;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');
      deleteButton.textContent = '🗑️';

      deleteButton.addEventListener('click', () => {
        taskCard.remove();
      });

      taskCard.appendChild(taskParagraph);
      taskCard.appendChild(deleteButton);

      taskCard.addEventListener('dragstart', () => {
        taskCard.classList.add('dragging');
      });

      taskCard.addEventListener('dragend', () => {
        taskCard.classList.remove('dragging');
      });

      // Append the task to the correct column
      const columnId = button.closest('.board-column').querySelector('h2').textContent.toLowerCase().replace(' ', '-');
      const column = document.getElementById(columnId);
      column.appendChild(taskCard);
    }
    
    // Close the popup after adding the task
    document.body.removeChild(popup);
  });

  cancelButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });

  popupContent.appendChild(taskInput);
  popupContent.appendChild(addTaskButton);
  popupContent.appendChild(cancelButton);
  
  popup.appendChild(popupContent);
  document.body.appendChild(popup);
}

// Styles for the popup
const style = document.createElement('style');
style.innerHTML = `
  .task-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1000;
    width: 300px;
  }

  .popup-content {
    display: flex;
    flex-direction: column;
  }

  .task-input {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .add-task-btn, .cancel-btn {
    padding: 10px;
    margin: 5px 0;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .add-task-btn {
    background-color: #F45235;
    color: white;
  }

  .cancel-btn {
    background-color: #ccc;
  }

  .add-task-btn:hover {
    background-color: #DA492F;
  }

  .cancel-btn:hover {
    background-color: #999;
  }
`;
document.head.appendChild(style);
