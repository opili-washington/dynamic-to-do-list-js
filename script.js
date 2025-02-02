// Run the code after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to add tasks
    function addTask(taskText, save = true) {
        if (taskText === undefined) {
            taskText = taskInput.value.trim();
        }

        // Check if the input is empty
        if (taskText === '') {
            alert('Please enter a task.');
        } else {
            // Create a new list item element
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Create a remove button for the task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            // Assign an event to the remove button to remove the task
            removeButton.onclick = () => {
                taskList.removeChild(listItem);
                removeTask(taskText);
            };

            // Append the remove button to the list item
            listItem.appendChild(removeButton);
            // Append the list item to the task list
            taskList.appendChild(listItem);

            // Clear the input field
            taskInput.value = '';

            // Save the task to Local Storage if necessary
            if (save) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.push(taskText);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        }
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to remove task from Local Storage
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add an event listener to the Add Task button
    addButton.addEventListener('click', function(){
        addTask();
    });

    // Add an event listener to allow adding tasks by pressing Enter
    taskInput.addEventListener('keypress', function(event){
        if (event.key === 'Enter') {
            addTask();
        }
    });
});