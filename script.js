document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskText => {
        createTaskElement(taskText, false); // false = don't save to storage again
    });

    // Function to create and display a task element
    function createTaskElement(taskText, saveToStorage = true) {
        // Create list item and set text
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        // Create remove button with required class
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // Add onclick event to remove button
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            // Remove from Local Storage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };
        
        // Append button to list item
        listItem.appendChild(removeButton);
        // Add to task list
        taskList.appendChild(listItem);

        // Save to Local Storage if needed
        if (saveToStorage) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (!taskText) {
            alert("Please enter a task!");
            return;
        }
        
        createTaskElement(taskText);
        taskInput.value = ""; // Clear input
    }

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
});