document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't save again
    }

    // Function to save tasks array to Local Storage
    function saveTasks() {
        const tasks = [];
        // Collect all task texts from the DOM
        taskList.querySelectorAll('li').forEach(li => {
            // Remove button is lastChild, so get text only
            tasks.push(li.firstChild.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If called from button/input, get and trim the task text
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }
        
        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Create new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Using classList.add as required
        
        // Add click event to remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            saveTasks(); // Update Local Storage after removal
        };
        
        // Append remove button to list item
        listItem.appendChild(removeButton);
        
        // Add list item to task list
        taskList.appendChild(listItem);
        
        // Clear input field if added via input
        if (typeof taskText !== 'string') {
            taskInput.value = "";
        }

        // Save to Local Storage if needed
        if (save) {
            saveTasks();
        }
    }

    // Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});