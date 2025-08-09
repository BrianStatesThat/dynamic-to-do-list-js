
document.addEventListener('DOMContentLoaded', function() {
    // 1. Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 2. Create the addTask function
    function addTask() {
        // Get and trim the task text
        const taskText = taskInput.value.trim();
        
        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Create new list item
        const listItem = document.createElement('li');
        
        // Set text content (will be modified in next steps)
        listItem.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        
        // Add click event to remove button
        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });
        
        // Append remove button to list item
        listItem.appendChild(removeButton);
        
        // Add list item to task list
        taskList.appendChild(listItem);
        
        // Clear input field
        taskInput.value = "";
    }

    // 3. Attach event listeners
    
    // Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});